'use server'

import { Location } from '@prisma/client'

import { validate } from '@/lib/validation'
import { prisma } from '@/lib/prisma'

import { createResponse } from '@/lib/helpers/response.helper'
import {
  BulkDeleteLocationsSchema,
  BulkDeleteLocationsValues,
  CreateLocationSchema,
  CreateLocationValues,
  GetLocationDetailSchema,
  GetLocationDetailValues,
  UpdateLocationSchema,
  UpdateLocationValues
} from '@/schemas/event/location.schema'

export const createLocation = async (data: CreateLocationValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(CreateLocationSchema, data)

    if (!success)
      return createResponse({ errors })

    // Create the location
    await prisma.$transaction([
      prisma.location.create({
        data: {
          name: data.name,
          address: data.address
        }
      })
    ])

    return createResponse({
      success: true,
      message: 'Berhasil membuat data lokasi'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getLocations = async () => {
  try {
    const locations: Location[] = await prisma.location.findMany()

    return createResponse({
      success: true,
      message: 'Berhasil mendapatkan data lokasi',
      data: locations
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getLocationDetail = async (data: GetLocationDetailValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetLocationDetailSchema, data)

    if (!success)
      return createResponse({ errors })

    // Get the location detail
    const location: Location | null = await prisma.location.findUnique({
      where: {
        id: data.locationId
      }
    })

    if (!location)
      return createResponse({
        message: 'Data lokasi tidak ditemukan'
      })

    return createResponse({
      success: true,
      message: 'Berhasil mendapatkan detail data lokasi',
      data: location
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const updateLocation = async (data: UpdateLocationValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(UpdateLocationSchema, data)

    if (!success)
      return createResponse({ errors })

    // Get the location
    const location = await prisma.location.findUnique({
      where: {
        id: data.locationId
      }
    })
    if (!location) {
      return createResponse({
        message: 'Data lokasi tidak ditemukan'
      })
    }

    // Update the location
    await prisma.$transaction([
      prisma.location.update({
        where: {
          id: data.locationId
        },
        data: {
          name: data.name,
          address: data.address
        }
      })
    ])

    return createResponse({
      success: true,
      message: 'Berhasil memperbarui data lokasi'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const bulkDeleteLocations = async (data: BulkDeleteLocationsValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(BulkDeleteLocationsSchema, data)

    if (!success)
      return createResponse({ errors })

    // Delete the locations
    await prisma.$transaction([
      prisma.location.deleteMany({
        where: {
          id: {
            in: data.locationIds
          }
        }
      })
    ])

    return createResponse({
      success: true,
      message: 'Berhasil menghapus data lokasi'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}