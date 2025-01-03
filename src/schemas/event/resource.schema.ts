import { z, ZodType } from 'zod'
import {
  CreateResourceRequest,
  GetEventResourcesRequest,
  GetResourceDetailRequest,
  UpdateResourceRequest
} from '@/types/event/resource.type'

export const CreateResourceSchema: ZodType<CreateResourceRequest> = z.object({
  name: z
    .string({
      required_error: 'Nama peralatan harus diisi'
    }).min(1, {
      message: 'Nama peralatan harus diisi'
    }),
  quantity: z.coerce
    .number({
      required_error: 'Jumlah peralatan harus diisi'
    })
    .min(1, 'Jumlah peralatan minimal 1'),
  consumable: z
    .boolean({
      required_error: 'Ketersediaan peralatan harus diisi'
    })
})

export const GetEventResourcesSchema: ZodType<GetEventResourcesRequest> = z.object({
  eventId: z
    .string({
      required_error: 'ID acara harus diisi'
    }).min(1, {
      message: 'ID acara harus diisi'
    })
})

export const GetResourceDetailSchema: ZodType<GetResourceDetailRequest> = z.object({
  resourceId: z
    .string({
      required_error: 'ID peralatan harus diisi'
    }).min(1, {
      message: 'ID peralatan harus diisi'
    })
})

export const UpdateResourceSchema: ZodType<UpdateResourceRequest> = z.object({
  resourceId: z
    .string({
      required_error: 'ID peralatan harus diisi'
    }).min(1, {
      message: 'ID peralatan harus diisi'
    }),
  name: z
    .string({
      required_error: 'Nama peralatan harus diisi'
    }).min(1, {
      message: 'Nama peralatan harus diisi'
    }),
  quantity: z.coerce
    .number({
      required_error: 'Jumlah peralatan harus diisi'
    })
    .min(1, 'Jumlah peralatan minimal 1'),
  consumable: z
    .boolean({
      required_error: 'Ketersediaan peralatan harus diisi'
    })
})

export const BulkDeleteResourcesSchema = z.object({
  resourceIds: z
    .array(
      z
        .string({
          required_error: 'ID peralatan harus diisi'
        })
        .min(1, {
          message: 'ID peralatan harus diisi'
        })
    )
    .min(1, {
      message: 'ID peralatan harus diisi'
    })
})

export type CreateResourceValues = z.infer<typeof CreateResourceSchema>
export type GetEventResourcesValues = z.infer<typeof GetEventResourcesSchema>
export type GetResourceDetailValues = z.infer<typeof GetResourceDetailSchema>
export type UpdateResourceValues = z.infer<typeof UpdateResourceSchema>
export type BulkDeleteResourcesValues = z.infer<typeof BulkDeleteResourcesSchema>
