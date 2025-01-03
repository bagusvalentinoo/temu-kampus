'use server'

import { EventResource, Resource } from '@prisma/client'
import { createResponse } from '@/lib/helpers/response.helper'
import {
  BulkDeleteResourcesSchema,
  BulkDeleteResourcesValues,
  CreateResourceSchema,
  CreateResourceValues,
  GetEventResourcesSchema,
  GetEventResourcesValues,
  GetResourceDetailSchema,
  GetResourceDetailValues,
  UpdateResourceSchema,
  UpdateResourceValues
} from '@/schemas/event/resource.schema'
import { validate } from '@/lib/validation'
import { prisma } from '@/lib/prisma'

export const createResource = async (data: CreateResourceValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(CreateResourceSchema, data)

    if (!success)
      return createResponse({ errors })

    await prisma.$transaction(async (tx) => {
      await tx.resource.create({
        data: {
          name: data.name,
          quantity: data.quantity,
          consumable: data.consumable
        }
      })
    })

    return createResponse({
      success: true,
      message: 'Berhasil menambahkan data peralatan'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getResources = async () => {
  try {
    const resources: Resource[] = await prisma.resource.findMany()

    return createResponse({
      success: true,
      message: 'Berhasil mendapatkan data peralatan',
      data: resources
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  }
}

export const getEventResources = async (data: GetEventResourcesValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetEventResourcesSchema, data)

    if (!success)
      return createResponse({ errors })

    // Get the event resources
    const resources: EventResource[] = await prisma.eventResource.findMany({
      where: {
        eventId: data.eventId
      },
      include: {
        resource: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return createResponse({
      success: true,
      message: 'Berhasil mendapatkan data peralatan acara',
      data: resources
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getResourceDetail = async (data: GetResourceDetailValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetResourceDetailSchema, data)

    if (!success)
      return createResponse({ errors })

    // Get the resource
    const resource: Resource | null = await prisma.resource.findUnique({
      where: {
        id: data.resourceId
      }
    })

    if (!resource) {
      return createResponse({
        message: 'Data peralatan tidak ditemukan'
      })
    }

    return createResponse({
      success: true,
      message: 'Berhasil mendapatkan detail data peralatan',
      data: resource
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const updateResource = async (data: UpdateResourceValues) => {
  try {
    // Check if the event exists
    const existingResource = await prisma.resource.findUnique({
      where: { id: data.resourceId }
    })

    if (!existingResource) {
      return createResponse({
        message: 'Data peralatan tidak ditemukan'
      })
    }

    // Validate the form data
    const { success, errors } = validate(UpdateResourceSchema, data)

    if (!success)
      return createResponse({ errors })

    // Update the resource
    await prisma.$transaction(async (tx) => {
      await tx.resource.update({
        where: {
          id: data.resourceId
        },
        data: {
          name: data.name,
          quantity: data.quantity,
          consumable: data.consumable
        }
      })
    })

    return createResponse({
      success: true,
      message: 'Berhasil memperbarui data peralatan'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const bulkDeleteResources = async (data: BulkDeleteResourcesValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(BulkDeleteResourcesSchema, data)

    if (!success)
      return createResponse({ errors })

    // Delete the resources
    await prisma.$transaction(async (tx) => {
      await tx.eventResource.deleteMany({
        where: {
          resourceId: {
            in: data.resourceIds
          }
        }
      })

      await tx.resource.deleteMany({
        where: {
          id: {
            in: data.resourceIds
          }
        }
      })
    })

    return createResponse({
      success: true,
      message: 'Berhasil menghapus data peralatan'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}
