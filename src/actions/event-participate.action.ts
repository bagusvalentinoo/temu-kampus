'use server'

import { Event, EventParticipant, User } from '@prisma/client'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { validate } from '@/lib/validation'
import { createResponse } from '@/lib/helpers/response.helper'
import { eventParticipateStatuses } from '@/lib/helpers/event-participate.helper'
import { userRoles } from '@/lib/helpers/user-role.helper'

import {
  ConfirmEventParticipateSchema,
  ConfirmEventParticipateValues,
  GetEventParticipateDetailSchema,
  GetEventParticipateDetailValues,
  GetEventParticipatesSchema,
  GetEventParticipateValues,
  UserParticipateInEventSchema,
  UserParticipateInEventValues
} from '@/schemas/event/event-participate.schema'

import { sendEmailEventConfirmation } from '@/actions/email.action'

export const participateInEvent = async (data: UserParticipateInEventValues) => {
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
    const { success, errors } = validate(UserParticipateInEventSchema, data)

    if (!success)
      return createResponse({ errors })

    if (userLoggedIn?.role === userRoles.admin.value) {
      return createResponse({
        message: 'Admin tidak dapat berpartisipasi dalam acara'
      })
    }

    // Check if the event exists and is upcoming
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
      include: {
        location: true
      }
    })

    if (!event) {
      return createResponse({
        message: 'Acara tidak ditemukan'
      })
    }

    // Check event creator is not participating
    if (event.createdBy === userLoggedIn?.id) {
      return createResponse({
        message: 'Pembuat acara tidak dapat berpartisipasi dalam acara sendiri'
      })
    }

    // Check if the event is still upcoming
    const now = new Date()
    if (now >= event.dateEnd) {
      return createResponse({
        message: 'Acara sudah berakhir. Partisipasi ditutup.'
      })
    }
    if (now >= event.dateStart) {
      return createResponse({
        message: 'Acara sudah dimulai. Partisipasi ditutup.'
      })
    }

    // Check if the user is already participating in the event
    const existingParticipation = await prisma.eventParticipant.findUnique({
      where: {
        userId_eventId: {
          userId: userLoggedIn?.id || '',
          eventId: data.eventId
        }
      }
    })

    if (existingParticipation) {
      return createResponse({
        message: existingParticipation.status === eventParticipateStatuses.participated.value
          ? 'Anda sudah berpartisipasi dalam acara ini.'
          : 'Pendaftaran acara sedang dalam proses konfirmasi oleh pengguna melalui email'
      })
    }

    // Register the user as a participant in the event
    const eventParticipate = await prisma.$transaction(async (tx) => {
      return tx.eventParticipant.create({
        data: {
          userId: userLoggedIn?.id || '',
          eventId: data.eventId,
          status: eventParticipateStatuses.pending.value
        }
      })
    })

    // Send email confirmation to the user
    await sendEmailEventConfirmation({
      user: userLoggedIn as User,
      event: event as Event,
      eventParticipant: eventParticipate as EventParticipant
    })

    return createResponse({
      success: true,
      message: 'Berhasil mendaftar dalam acara'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getEventParticipants = async (data: GetEventParticipateValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetEventParticipatesSchema, data)

    if (!success)
      return createResponse({ errors })

    // Get the event participants
    const participants = await prisma.eventParticipant.findMany({
      where: {
        eventId: data.eventId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return createResponse({
      success: true,
      data: participants
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getEventParticipateDetail = async (data: GetEventParticipateDetailValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetEventParticipateDetailSchema, data)

    if (!success)
      return createResponse({ errors })

    // Get the event participant detail
    const eventParticipant = await prisma.eventParticipant.findUnique({
      where: { id: data.eventParticipantId }
    })

    return createResponse({
      success: true,
      data: eventParticipant
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const confirmEventParticipant = async (data: ConfirmEventParticipateValues) => {
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
    const { success, errors } = validate(ConfirmEventParticipateSchema, data)

    if (!success)
      return createResponse({ errors })

    // Get the event participant detail
    const eventParticipant = await prisma.eventParticipant.findUnique({
      where: {
        id: data.eventParticipantId,
        userId: userLoggedIn?.id
      }
    })

    if (!eventParticipant) {
      return createResponse({
        message: 'Partisipasi acara tidak ditemukan'
      })
    }

    const getEventPayload = {
      where: { id: eventParticipant.eventId },
      include: {
        location: true
      }
    }
    let event = null
    if (eventParticipant.status === eventParticipateStatuses.participated.value) {
      // Get the event detail
      event = await prisma.event.findUnique(getEventPayload)

      return createResponse({
        success: true,
        message: 'Partisipasi acara sudah dikonfirmasi sebelumnya',
        data: event
      })
    }

    // Update the event participant status
    await prisma.$transaction(async (tx) => {
      await tx.eventParticipant.update({
        where: { id: data.eventParticipantId },
        data: {
          status: eventParticipateStatuses.participated.value
        }
      })
    })

    // Get the event detail
    event = await prisma.event.findUnique(getEventPayload)

    return createResponse({
      success: true,
      message: 'Berhasil mengkonfirmasi partisipasi acara',
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
