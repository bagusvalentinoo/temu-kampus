import { z, ZodType } from 'zod'
import {
  BulkDeleteLocationRequest,
  CreateLocationRequest,
  GetLocationDetailRequest,
  GetLocationsRequest,
  UpdateLocationRequest
} from '@/types/event/location.type'

export const CreateLocationSchema: ZodType<CreateLocationRequest> = z.object({
  name: z
    .string({
      required_error: 'Nama lokasi harus diisi'
    }).min(1, {
      message: 'Nama lokasi harus diisi'
    }),
  address: z
    .string({
      required_error: 'Alamat lokasi harus diisi'
    }).min(1, {
      message: 'Alamat lokasi harus diisi'
    })
})

export const GetLocationsSchema: ZodType<GetLocationsRequest> = z.object({
  //
})

export const GetLocationDetailSchema: ZodType<GetLocationDetailRequest> = z.object({
  locationId: z
    .string({
      required_error: 'ID lokasi harus diisi'
    })
})

export const UpdateLocationSchema: ZodType<UpdateLocationRequest> = z.object({
  locationId: z
    .string({
      required_error: 'ID lokasi harus diisi'
    }),
  name: z
    .string()
    .optional(),
  address: z
    .string()
    .optional()
})

export const BulkDeleteLocationsSchema: ZodType<BulkDeleteLocationRequest> = z.object({
  locationIds: z
    .array(z.string())
    .min(1, 'ID lokasi harus diisi')
})

export type CreateLocationValues = z.infer<typeof CreateLocationSchema>
export type GetLocationsValues = z.infer<typeof GetLocationsSchema>
export type GetLocationDetailValues = z.infer<typeof GetLocationDetailSchema>
export type UpdateLocationValues = z.infer<typeof UpdateLocationSchema>
export type BulkDeleteLocationsValues = z.infer<typeof BulkDeleteLocationsSchema>
