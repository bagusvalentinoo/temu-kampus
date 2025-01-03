import { z, ZodType } from 'zod'
import type { RegisterRequest } from '@/types/auth/register.type'
import { userRoles } from '@/lib/helpers/user-role.helper'

export const RegisterSchema: ZodType<RegisterRequest> = z.object({
  name: z
    .string({
      required_error: 'Nama harus diisi'
    })
    .min(1, {
      message: 'Nama harus diisi'
    }),
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
  role: z.enum([userRoles.lecturers.value, userRoles.students.value], {
    required_error: 'Peran harus dipilih',
    message: `Peran harus ${userRoles.lecturers.label} atau ${userRoles.students.label}`
  }),
  password: z
    .string({
      required_error: 'Kata sandi harus diisi'
    })
    .min(8, {
      message: 'Kata sandi minimal harus 8 karakter'
    }),
  passwordConfirmation: z
    .string({
      required_error: 'Konfirmasi kata sandi harus diisi'
    })
    .min(8, {
      message: 'Konfirmasi kata sandi minimal harus 8 karakter'
    })
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Kata sandi dan konfirmasi kata sandi tidak cocok',
  path: ['passwordConfirmation']
})

export type RegisterValues = z.infer<typeof RegisterSchema>
