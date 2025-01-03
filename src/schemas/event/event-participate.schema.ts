import { z, ZodType } from 'zod'
import {
  ConfirmEventParticipateRequest,
  GetEventParticipateDetailRequest,
  GetEventParticipatesRequest,
  UserParticipateInEventRequest
} from '@/types/event/event-participate.type'

export const UserParticipateInEventSchema: ZodType<UserParticipateInEventRequest> = z.object({
  eventId: z.string().min(1, 'ID acara harus diisi')
})

export const GetEventParticipatesSchema: ZodType<GetEventParticipatesRequest> = z.object({
  eventId: z
    .string({
      required_error: 'ID acara harus diisi'
    })
})

export const GetEventParticipateDetailSchema: ZodType<GetEventParticipateDetailRequest> = z.object({
  eventParticipantId: z
    .string({
      required_error: 'ID partisipasi acara harus diisi'
    })
})

export const ConfirmEventParticipateSchema: ZodType<ConfirmEventParticipateRequest> = z.object({
  eventParticipantId: z
    .string({
      required_error: 'ID partisipasi acara harus diisi'
    })
})

export type UserParticipateInEventValues = z.infer<typeof UserParticipateInEventSchema>
export type GetEventParticipateValues = z.infer<typeof GetEventParticipatesSchema>
export type GetEventParticipateDetailValues = z.infer<typeof GetEventParticipateDetailSchema>
export type ConfirmEventParticipateValues = z.infer<typeof ConfirmEventParticipateSchema>
