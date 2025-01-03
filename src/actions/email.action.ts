'use server'

import { Event, EventParticipant, User } from '@prisma/client'
import { sendEmail } from '@/lib/nodemailer'
import { prisma } from '@/lib/prisma'

import { createResponse } from '@/lib/helpers/response.helper'
import { eventReminderEmailSubject, eventReminderEmailTemplate } from '@/emails/event-reminder.template'
import { eventConfirmationEmailSubject, eventConfirmationEmailTemplate } from '@/emails/event-confirmation.template'
import { getEventConfirmationLink } from '@/lib/helpers/event.helper'

export const sendEmailEventReminder = async (
  { to }: { to: string }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: to
      }
    })
    if (!user) {
      return createResponse({
        message: 'User not found'
      })
    }

    const event = await prisma.event.findFirst({
      include: {
        location: true
      }
    })
    if (!event) {
      return createResponse({
        message: 'Event not found'
      })
    }

    await sendEmail({
      to,
      subject: eventReminderEmailSubject,
      html: eventReminderEmailTemplate({ user, event })
    })

    return createResponse({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.log(error)
    return createResponse({
      message: error instanceof Error ? error.message : 'An error occurred while sending the email'
    })
  }
}

export const sendEmailEventConfirmation = async (
  { user, event, eventParticipant }: { user: User, event: Event, eventParticipant: EventParticipant }
) => {
  try {
    await sendEmail({
      to: user.email,
      subject: eventConfirmationEmailSubject,
      html: eventConfirmationEmailTemplate({ user, event, confirmationLink: getEventConfirmationLink(eventParticipant) })
    })

    return createResponse({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.log(error)
    return createResponse({
      message: error instanceof Error ? error.message : 'An error occurred while sending the email'
    })
  }
}
