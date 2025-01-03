import { z, ZodType } from 'zod'
import type { ForgotPasswordRequest } from '@/types/auth/forgot-password.type'

export const ForgotPasswordSchema: ZodType<ForgotPasswordRequest> = z.object({
  email: z.string({
    required_error: 'Email harus diisi'
  }).min(1, {
    message: 'Email harus diisi'
  }).email({
    message: 'Format email tidak valid'
  })
})

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>
