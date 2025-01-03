'use client'

import { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

import type { Location } from '@/types/event/location.type'

import { CreateLocationSchema, CreateLocationValues } from '@/schemas/event/location.schema'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { createLocation, updateLocation } from '@/actions/location.action'

type FormLocationProps = {
  location?: Location
}

export const FormLocation = ({ location }: FormLocationProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateLocationValues>({
    resolver: zodResolver(CreateLocationSchema),
    defaultValues: {
      name: '',
      address: ''
    }
  })

  useEffect(() => {
    if (location) {
      form.reset({
        name: location.name,
        address: location.address
      })
    }
  }, [location, form])

  const onSubmit = (data: CreateLocationValues) => {
    startTransition(async () => {
      const response = location
        ? await updateLocation({ locationId: location.id, ...data })
        : await createLocation(data)
      const {
        success,
        message
      } = response

      if (success) {
        toast.success(message)
        router.push('/locations')
        router.refresh()
      } else {
        toast.error(message)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                      placeholder="Masukan nama peralatan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Alamat</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="Masukan alamat lokasi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit">
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {location ? 'Update' : 'Simpan'}
          </Button>
        </form>
      </Form>
    </>
  )
}
