'use server'

import { Event } from '@prisma/client'
import { validate } from '@/lib/validation'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import {
  BulkDeleteEventSchema,
  BulkDeleteEventValues,
  CreateEventSchema,
  CreateEventValues,
  GetEventDetailSchema,
  GetEventDetailValues,
  GetEventsValues,
  UpdateEventSchema,
  UpdateEventValues
} from '@/schemas/event/event.schema'

import { createResponse } from '@/lib/helpers/response.helper'
import { convertDateStringToUTC, defaultDateFormat } from '@/lib/helpers/date.helper'
import { eventSections } from '@/lib/helpers/event.helper'
import { filterNonNullValues } from '@/lib/helpers/object.helper'
import { userRoles } from '@/lib/helpers/user-role.helper'

export const createEvent = async (data: CreateEventValues) => {
  try {
    const session = await auth()
    if (!session || (session && !session.user)) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    const userLoggedIn = session.user

    // Validate the form data
    const { success, errors } = validate(CreateEventSchema, data)

    if (!success)
      return createResponse({ errors })

    // Check if the location is available for the given date range
    const dateStartIso = convertDateStringToUTC(data.dateStart, defaultDateFormat)
    const dateEndIso = convertDateStringToUTC(data.dateEnd, defaultDateFormat)

    const overlappingEvents = await prisma.event.findMany({
      where: {
        locationId: data.locationId,
        OR: [
          {
            dateStart: { lte: dateStartIso },
            dateEnd: { gte: dateEndIso }
          }
        ]
      }
    })

    if (overlappingEvents.length > 0) {
      return createResponse({
        message: 'Lokasi sudah dipesan untuk rentang tanggal yang diberikan.'
      })
    }

    // Start a transaction to ensure atomic operations
    await prisma.$transaction(async (tx) => {
      // Create event
      const newEvent = await tx.event.create({
        data: {
          title: data.title,
          description: data.description,
          dateStart: convertDateStringToUTC(data.dateStart, defaultDateFormat),
          dateEnd: convertDateStringToUTC(data.dateEnd, defaultDateFormat),
          category: data.category,

          locationId: data.locationId,
          createdBy: userLoggedIn?.id || ''
        }
      })

      // Create EventResource entries
      const eventResources = data.resources.map((resource) => ({
        eventId: newEvent.id,
        resourceId: resource.resourceId,
        quantity: resource.quantity
      }))

      // Ensure the resources exist
      const existingResources = await tx.resource.findMany({
        where: {
          id: { in: data.resources.map((r) => r.resourceId) }
        }
      })

      for (const resource of eventResources) {
        // Check if enough resource quantity is available
        const existingResource = existingResources.find((r) => r.id === resource.resourceId)
        if (!existingResource) {
          throw new Error(`Peralatan dengan ID ${resource.resourceId} tidak ditemukan`)
        }

        if (existingResource.quantity < resource.quantity) {
          throw new Error(`Peralatan dengan ID ${resource.resourceId} tidak cukup`)
        }

        // Reduce the resource quantity
        await tx.resource.update({
          where: { id: resource.resourceId },
          data: {
            quantity: existingResource.quantity - resource.quantity
          }
        })

        // Create EventResource entry
        await tx.eventResource.create({
          data: {
            eventId: newEvent.id,
            resourceId: resource.resourceId,
            quantity: resource.quantity
          }
        })
      }
    })

    return createResponse({
      success: true,
      message: 'Acara berhasil dibuat'
    })
  } catch (error) {
    console.log(error)
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getEvents = async (data: GetEventsValues) => {
  const session = await auth()

  const sectionPayload = {
    where: {}
  }

  // Section filter
  switch (data.section) {
  case eventSections.upcoming.value:
    Object.assign(sectionPayload.where, {
      dateStart: {
        gt: new Date()
      }
    })
    break
  case eventSections.past.value:
    Object.assign(sectionPayload.where, {
      dateEnd: {
        lt: new Date()
      }
    })
    break
  case eventSections.owned.value:
    if (!session) {
      return createResponse({
        message: 'Anda tidak memiliki akses',
        data: []
      })
    }

    Object.assign(sectionPayload.where, {
      createdBy: session?.user?.id || null
    })
    break

  case eventSections.participated.value:
    if (!session) {
      return createResponse({
        message: 'Anda tidak memiliki akses',
        data: []
      })
    }

    Object.assign(sectionPayload.where, {
      participants: {
        some: {
          userId: session?.user?.id || null
        }
      }
    })
    break
  }

  // Category filter
  if (data.category) {
    Object.assign(sectionPayload.where, {
      category: data.category
    })
  }

  try {
    const events: Event[] = await prisma.event.findMany({
      include: {
        location: true,
        creator: true
      },
      ...sectionPayload
    })

    return createResponse({
      success: true,
      message: 'Berhasil mendapatkan data acara',
      data: events
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  }
}

export const getEventDetail = async (data: GetEventDetailValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetEventDetailSchema, data)

    if (!success)
      return createResponse({ errors })

    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
      include: {
        location: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        resources: {
          include: {
            resource: true
          }
        },
        participants: {
          include: {
            user: true
          }
        },
        reviews: {
          include: {
            user: true
          }
        }
      }
    })

    if (!event) {
      return createResponse({
        message: 'Acara tidak ditemukan'
      })
    }

    return createResponse({
      success: true,
      message: 'Berhasil mendapatkan detail acara',
      data: event
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const updateEvent = async (data: UpdateEventValues) => {
  try {
    // Check if the user is not logged in
    const session = await auth()
    if (!session || (session && !session.user)) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    const userLoggedIn = session.user

    // Validate the form data
    const { success, errors } = validate(UpdateEventSchema, data)

    if (!success)
      return createResponse({ errors })

    // Check if the event exists
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: data.eventId
      }
    })

    if (!existingEvent) {
      return createResponse({
        message: 'Acara tidak ditemukan'
      })
    }

    // Check if the user is the creator of the event
    if (userLoggedIn?.role !== userRoles.admin.value && existingEvent.createdBy !== userLoggedIn?.id) {
      return createResponse({
        message: 'Anda tidak memiliki akses untuk mengubah acara ini'
      })
    }

    if (data.locationId && data.locationId !== existingEvent.locationId && data.dateStart && data.dateEnd) {
      const overlappingEvents = await prisma.event.findMany({
        where: {
          locationId: data.locationId,
          OR: [
            {
              dateStart: { lte: data.dateEnd },
              dateEnd: { gte: data.dateStart }
            }
          ]
        }
      })

      if (overlappingEvents.length > 0) {
        return createResponse({
          message: 'Lokasi sudah dipesan untuk rentang tanggal yang diberikan.'
        })
      }
    }

    await prisma.$transaction(async (tx) => {
      // Update the event details
      await tx.event.update({
        where: { id: data.eventId },
        data: filterNonNullValues({
          title: data.title,
          description: data.description,
          dateStart: data.dateStart ? convertDateStringToUTC(data.dateStart, defaultDateFormat) : null,
          dateEnd: data.dateEnd ? convertDateStringToUTC(data.dateEnd, defaultDateFormat) : null,
          category: data.category,
          locationId: data.locationId ?? null
        })
      })

      if (!data.resources || (Array.isArray(data.resources) && data.resources.length <= 0)) {
        return
      }

      // \Update resources for the event
      for (const resource of data.resources) {
        // Find existing EventResource entry
        const existingEventResource = await tx.eventResource.findUnique({
          where: {
            eventId_resourceId: {
              eventId: data.eventId,
              resourceId: resource.resourceId
            }
          }
        })

        // Find the resource in the database to check its current quantity
        const existingResource = await tx.resource.findUnique({
          where: { id: resource.resourceId }
        })

        if (!existingResource) {
          throw new Error(`Resource with ID ${resource.resourceId} does not exist.`)
        }

        if (existingEventResource) {
          // If EventResource exists, adjust resource quantity
          const quantityDifference = resource.quantity - existingEventResource.quantity

          if (quantityDifference > 0) {
            // Increase quantity allocated to the event, so decrease from resource
            if (existingResource.quantity < quantityDifference) {
              throw new Error(`Not enough quantity for resource with ID ${resource.resourceId}. Available: ${existingResource.quantity}, Requested additional: ${quantityDifference}`)
            }

            await tx.resource.update({
              where: { id: resource.resourceId },
              data: {
                quantity: existingResource.quantity - quantityDifference
              }
            })
          } else if (quantityDifference < 0) {
            // Decrease quantity allocated to the event, so increase the resource quantity
            await tx.resource.update({
              where: { id: resource.resourceId },
              data: {
                quantity: existingResource.quantity + Math.abs(quantityDifference)
              }
            })
          }

          // Update the EventResource entry with new quantity
          await tx.eventResource.update({
            where: {
              eventId_resourceId: {
                eventId: data.eventId,
                resourceId: resource.resourceId
              }
            },
            data: {
              quantity: resource.quantity
            }
          })
        } else {
          // If EventResource doesn't exist, create a new entry and reduce the resource quantity
          if (existingResource.quantity < resource.quantity) {
            throw new Error(`Not enough quantity for resource with ID ${resource.resourceId}. Available: ${existingResource.quantity}, Requested: ${resource.quantity}`)
          }

          await tx.resource.update({
            where: { id: resource.resourceId },
            data: {
              quantity: existingResource.quantity - resource.quantity
            }
          })

          await tx.eventResource.create({
            data: {
              eventId: data.eventId,
              resourceId: resource.resourceId,
              quantity: resource.quantity
            }
          })
        }
      }
    })

    return createResponse({
      success: true,
      message: 'Acara berhasil diperbarui'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const bulkDeleteEvents = async (data: BulkDeleteEventValues) => {
  try {
    // Check if the user is not logged in
    const session = await auth()
    if (!session || (session && !session.user)) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    const userLoggedIn = session.user

    // Validate the form data
    const { success, errors } = validate(BulkDeleteEventSchema, data)

    if (!success)
      return createResponse({ errors })

    const deleteWherePayload = {
      id: { in: data.eventIds }
    }

    if (userLoggedIn?.role !== userRoles.admin.value) {
      Object.assign(deleteWherePayload, {
        createdBy: userLoggedIn?.id
      })
    }

    // Find the events to delete
    const eventsToDelete = await prisma.event.findMany({
      where: deleteWherePayload
    })

    // Check if all events exist
    if (eventsToDelete.length !== data.eventIds.length) {
      return createResponse({
        message: 'Beberapa semua acara ditemukan atau Anda tidak memiliki akses untuk menghapusnya'
      })
    }

    await prisma.$transaction(async (tx) => {
      const deleteEventIds = eventsToDelete.map((event) => event.id)

      // Delete related EventResource entries for these events
      await tx.eventResource.deleteMany({
        where: {
          eventId: { in: deleteEventIds }
        }
      })

      // Delete related participants
      await tx.eventParticipant.deleteMany({
        where: {
          eventId: { in: deleteEventIds }
        }
      })

      // Delete related reviews
      await tx.review.deleteMany({
        where: {
          eventId: { in: deleteEventIds }
        }
      })

      // Delete the events themselves
      await tx.event.deleteMany({
        where: deleteWherePayload
      })
    })

    return createResponse({
      success: true,
      message: 'Acara berhasil dihapus'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}
