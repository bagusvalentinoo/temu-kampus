import { z, ZodType } from 'zod'
import {
  BulkDeleteEventRequest,
  CreateEventRequest,
  GetEventDetailRequest,
  GetEventsRequest,
  UpdateEventRequest
} from '@/types/event/event.type'
import { regexDateFormat } from '@/lib/helpers/date.helper'

export const CreateEventSchema: ZodType<CreateEventRequest> = z.object({
  title: z
    .string({
      required_error: 'Judul harus diisi'
    }),
  description: z
    .string({
      required_error: 'Deskripsi harus diisi'
    }),
  dateStart: z.string().refine(date => {
    // Validate against "YYYY-MM-DD HH:MM:SS" format
    return regexDateFormat.test(date)
  }, {
    message: 'Tanggal mulai acara tidak valid'
  }),
  dateEnd: z.string().refine(date => {
    // Validate against "YYYY-MM-DD HH:MM:SS" format
    return regexDateFormat.test(date)
  }, {
    message: 'Tanggal selesai acara tidak valid'
  }),
  category: z
    .string({
      required_error: 'Kategori harus diisi'
    }),

  locationId: z
    .string({
      required_error: 'Lokasi harus diisi'
    }),
  resources: z
    .array(
      z.object({
        resourceId: z.string().min(1, 'Id peralatan harus diisi'),
        quantity: z.number().min(1, 'Jumlah peralatan harus diisi')
      })
    )
    .min(1, 'Peralatan harus diisi')
})
  .refine((data) => {
    return new Date(data.dateEnd) > new Date(data.dateStart)
  }, {
    message: 'Tanggal selesai acara harus lebih besar dari tanggal mulai acara',
    path: ['dateEnd']
  })

export const GetEventsSchema: ZodType<GetEventsRequest> = z.object({
  section: z
    .string()
    .optional(),
  category: z
    .string()
    .optional()
})

export const GetEventDetailSchema: ZodType<GetEventDetailRequest> = z.object({
  eventId: z
    .string({
      required_error: 'ID acara harus diisi'
    })
})

export const UpdateEventSchema: ZodType<UpdateEventRequest> = z.object({
  eventId: z
    .string({
      required_error: 'ID acara harus diisi'
    }),
  title: z
    .string()
    .optional(),
  description: z
    .string()
    .optional(),
  dateStart: z
    .string()
    .refine(date => {
      // Validate against "YYYY-MM-DD HH:MM:SS" format
      return regexDateFormat.test(date)
    }, {
      message: 'Tanggal mulai acara tidak valid'
    })
    .optional(),
  dateEnd: z
    .string()
    .refine(date => {
      // Validate against "YYYY-MM-DD HH:MM:SS" format
      return regexDateFormat.test(date)
    }, {
      message: 'Tanggal selesai acara tidak valid'
    })
    .optional(),
  category: z
    .string()
    .optional(),
  locationId: z
    .string()
    .optional(),

  resources: z
    .array(
      z.object({
        resourceId: z.string().min(1, 'Id peralatan harus diisi'),
        quantity: z.number().min(1, 'Jumlah peralatan harus diisi')
      })
    )
    .optional()
})
  .refine((data) => {
    // If dateStart is provided, dateEnd must be provided, and vice versa
    return !((data.dateStart && !data.dateEnd) || (!data.dateStart && data.dateEnd))
  }, {
    message: 'Tanggal mulai dan tanggal selesai harus keduanya diisi',
    path: ['dateEnd']
  }).refine((data) => {
    if (data.dateStart && data.dateEnd) {
      return new Date(data.dateEnd) > new Date(data.dateStart)
    }
    return true
  }, {
    message: 'Tanggal selesai acara harus lebih besar dari tanggal mulai acara',
    path: ['dateEnd']
  })

export const BulkDeleteEventSchema: ZodType<BulkDeleteEventRequest> = z.object({
  eventIds: z
    .array(z.string())
    .min(1, 'ID acara harus diisi')
})

export type CreateEventValues = z.infer<typeof CreateEventSchema>
export type GetEventsValues = z.infer<typeof GetEventsSchema>
export type GetEventDetailValues = z.infer<typeof GetEventDetailSchema>
export type UpdateEventValues = z.infer<typeof UpdateEventSchema>
export type BulkDeleteEventValues = z.infer<typeof BulkDeleteEventSchema>
