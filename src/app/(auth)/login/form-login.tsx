'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'

import styles from '@/app/(auth)/styles.module.css'
import { LoginSchema, LoginValues } from '@/schemas/auth/login.schema'

import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputPassword } from '@/components/ui/input-password'
import { Button } from '@/components/ui/button'

import { login } from '@/actions/auth.action'

import { DEFAULT_LOGIN_REDIRECT } from '@/lib/helpers/auth.helper'
import toast from 'react-hot-toast'

export const FormLogin = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: LoginValues) => {
    startTransition(async () => {
      const { success, message } = await login(data)

      if (success) {
        toast.success(message)
        router.push(DEFAULT_LOGIN_REDIRECT)
        return
      }

      toast.error(message)
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <InputPassword
                      disabled={isPending}
                      placeholder="********" {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={styles.formForgotPassword}>
            <Link
              className={styles.formForgotPasswordText}
              href="/forgot-password"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className={styles.formButton}
          >
            {isPending && (
              <ReloadIcon className={styles.formButtonLoading} />
            )}
            Masuk
          </Button>
        </form>
      </Form>
    </>
  )
}
