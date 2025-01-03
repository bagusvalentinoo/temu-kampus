'use server'

import { auth } from '@/lib/auth'
import { validate } from '@/lib/validation'

import { createResponse } from '@/lib/helpers/response.helper'
import {
  CreateEventReviewSchema,
  CreateEventReviewValues,
  GetEventReviewsSchema,
  GetEventReviewsValues
} from '@/schemas/event/review.schema'
import { prisma } from '@/lib/prisma'

export const checkUserHasSubmittedReview = async (eventId: string) => {
  const session = await auth()
  if (!session || (session && !session.user)) {
    return createResponse({
      message: 'Anda tidak memiliki akses'
    })
  }

  const userLoggedIn = session.user

  const existingReview = await prisma.review.findFirst({
    where: {
      userId: userLoggedIn?.id || '',
      eventId
    },
    select: { id: true }
  })

  return !!existingReview
}

export const createEventReview = async (data: CreateEventReviewValues) => {
  try {
    const session = await auth()
    if (!session || (session && !session.user)) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    const userLoggedIn = session.user

    // Validate the form data
    const { success, errors } = validate(CreateEventReviewSchema, data)

    if (!success)
      return createResponse({ errors })

    // Check if the user participated in the event
    const participation = await prisma.eventParticipant.findUnique({
      where: {
        userId_eventId: {
          userId: userLoggedIn?.id || '',
          eventId: data.eventId
        }
      },
      select: { id: true }
    })

    if (!participation) {
      return createResponse({
        message: 'Pengguna tidak berpartisipasi dalam acara ini.'
      })
    }

    // Check if the event has already finished
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
      select: { dateEnd: true }
    })

    if (!event) {
      return createResponse({
        message: 'Acara tidak ditemukan'
      })
    }

    const now = new Date()
    if (now < event.dateEnd) {
      return createResponse({
        message: 'Ulasan hanya dapat diberikan setelah acara selesai.'
      })
    }

    // Check if the user has already submitted a review for this event
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: userLoggedIn?.id,
        eventId: data.eventId
      }
    })

    if (existingReview) {
      return createResponse({
        message: 'Anda sudah memberikan ulasan untuk acara ini.'
      })
    }

    // Create the review
    await prisma.$transaction(async (tx) => {
      await tx.review.create({
        data: {
          userId: userLoggedIn?.id || '',
          eventId: data.eventId,
          rating: data.rating,
          comment: data.comment
        }
      })
    })

    return createResponse({
      success: true,
      message: 'Ulasan berhasil dibuat'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getEventReviews = async (data: GetEventReviewsValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(GetEventReviewsSchema, data)

    if (!success)
      return createResponse({ errors })

    // Query reviews for the specified event
    const reviews = await prisma.review.findMany({
      where: {
        eventId: data.eventId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return createResponse({
      success: true,
      data: reviews
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}
