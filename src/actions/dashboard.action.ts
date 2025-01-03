'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

import { createResponse } from '@/lib/helpers/response.helper'
import { userRoles } from '@/lib/helpers/user-role.helper'

export const getDashboardStatisticsForAdmin = async () => {
  try {
    const session = await auth()
    if (!session || (session && !session.user)) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    const userLoggedIn = session.user

    if (userLoggedIn?.role !== userRoles.admin.value) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    // Get total users
    const totalUsers = await prisma.user.count({
      where: {
        role: {
          not: userRoles.admin.value
        }
      }
    })

    // Get total student
    const totalStudent = await prisma.user.count({
      where: {
        role: userRoles.students.value
      }
    })

    // Get total lecturers
    const totalLecturers = await prisma.user.count({
      where: {
        role: userRoles.lecturers.value
      }
    })

    // Get total event
    const totalEvent = await prisma.event.count()

    // Get total event review
    const totalEventReview = await prisma.review.count()

    // Get total resource
    const totalResource = await prisma.resource.count()

    // Get total location
    const totalLocation = await prisma.location.count()

    return createResponse({
      message: 'Berhasil mendapatkan data statistik dashboard',
      data: {
        totalUsers,
        totalStudent,
        totalLecturers,
        totalEvent,
        totalEventReview,
        totalResource,
        totalLocation
      }
    })
  } catch (error) {
    console.error(error)
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getDashboardStatisticsForUser = async () => {
  try {
    const session = await auth()
    if (!session || (session && !session.user)) {
      return createResponse({
        message: 'Anda tidak memiliki akses'
      })
    }

    const userLoggedIn = session.user

    // Get total participate event
    const totalParticipateInEvent = await prisma.eventParticipant.count({
      where: {
        userId: userLoggedIn?.id
      }
    })

    // Get total event reviewed by user
    const totalEventReviewedByUser = await prisma.review.count({
      where: {
        userId: userLoggedIn?.id
      }
    })

    // Get total event created by user
    const totalEventCreatedByUser = await prisma.event.count({
      where: {
        createdBy: userLoggedIn?.id
      }
    })

    return createResponse({
      message: 'Berhasil mendapatkan data statistik dashboard',
      data: {
        totalParticipateInEvent,
        totalEventReviewedByUser,
        totalEventCreatedByUser
      }
    })
  } catch (error) {
    console.error(error)
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  } finally {
    await prisma.$disconnect()
  }
}
