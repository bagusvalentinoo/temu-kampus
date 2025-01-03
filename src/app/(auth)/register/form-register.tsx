'use client'

import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'

import styles from '@/app/(auth)/styles.module.css'

import { RegisterSchema, RegisterValues } from '@/schemas/auth/register.schema'

import { LOGIN_PAGE } from '@/lib/helpers/auth.helper'
import { userRolesArray } from '@/lib/helpers/user-role.helper'

import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputPassword } from '@/components/ui/input-password'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { register } from '@/actions/auth.action'


export const FormRegister = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: '',
      passwordConfirmation: ''
    }
  })

  const onSubmit = (data: RegisterValues) => {
    startTransition(async () => {
      await register(data).then(response => {
        if (response.success) {
          form.reset()
          toast.success('Pendaftaran berhasil, silakan masuk!')
          router.push(LOGIN_PAGE)
        } else {
          toast.error('Pendaftaran gagal, silakan coba lagi.')
        }
      })
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.formFields}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nama</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="Nama Lengkap"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="email_anda@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Peran</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran Anda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userRolesArray.filter(item => item.label !== 'Admin').map(role => (
                        <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Kata Sandi</FormLabel>
                  <FormControl>
                    <InputPassword
                      disabled={isPending}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Konfirmasi Kata Sandi</FormLabel>
                  <FormControl>
                    <InputPassword
                      disabled={isPending}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className={styles.formButton}
          >
            {isPending && (
              <ReloadIcon className={styles.formButtonLoading} />
            )}
            Daftar
          </Button>
        </form>
      </Form>
    </>
  )
}
