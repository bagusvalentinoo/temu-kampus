'use client'

import styles from '@/app/(auth)/styles.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordSchema, ForgotPasswordValues } from '@/schemas/auth/forgot-password.schema'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

export const FormForgotPassword = () => {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      // TODO: Implement forgot password email
      console.log('Sending forgot password email: ', data)
    } catch (error) {
      console.error('ErrorLayout sending forgot password email: ', error)
    }
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
                      type="email"
                      placeholder="john_doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className={styles.formButton}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
