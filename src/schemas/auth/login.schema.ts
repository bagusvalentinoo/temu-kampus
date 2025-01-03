import { z, ZodType } from 'zod'
import type { LoginRequest } from '@/types/auth/login.type'

export const LoginSchema: ZodType<LoginRequest> = z.object({
  email: z
    .string({
      required_error: 'Email harus diisi'
    })
    .min(1, {
      message: 'Email harus diisi'
    })
    .email({
      message: 'Format email tidak valid'
    }),
  password: z
    .string({
      required_error: 'Kata sandi harus diisi'
    })
    .min(1, {
      message: 'Kata sandi harus diisi'
    })
})

export type LoginValues = z.infer<typeof LoginSchema>
