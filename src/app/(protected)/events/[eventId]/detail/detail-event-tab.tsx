'use client'

import Image from 'next/image'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileTextIcon } from 'lucide-react'
import { StarFilledIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

import { ReviewSchema, ReviewValues } from '@/schemas/event/review.schema'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { getUserRoleLabelFromValue } from '@/lib/helpers/user-role.helper'
import { createEventReview } from '@/actions/review.action'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const DetailEventTab = ({ event, isHasSubmittedReview }: { event: any, isHasSubmittedReview: boolean }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<ReviewValues>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      comment: ''
    }
  })

  const getInitials = (name: string): string => {
    const words = name.trim().split(' ')

    if (words.length === 1)
      return words[0].charAt(0).toUpperCase()

    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
  }

  const onSubmitReview = (data: ReviewValues) => {
    startTransition(async () => {
      const { success, message } = await createEventReview({ eventId: event.id, ...data })

      if (success) {
        router.refresh()
        form.reset({
          rating: 0,
          comment: ''
        })
        toast.success(message)
      } else {
        toast.error(message)
      }
    })
  }

  return (
    <>
      <Tabs defaultValue="participants" className="w-full">
        <TabsList>
          <TabsTrigger value="participants">Peserta</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          <TabsTrigger value="resources">Sumber Daya</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Peserta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                {event.participants && event.participants.length > 0 ? (
                  event.participants.map((participant: any) => (
                    <div key={participant.id} className="flex items-center space-x-2 mb-4">
                      <Avatar>
                        <AvatarFallback>{getInitials(participant?.user?.name)}</AvatarFallback>
                      </Avatar>
                      <span>{participant?.user?.name} - {getUserRoleLabelFromValue(participant?.user?.role)}</span>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex flex-col items-center justify-center mb-5">
                    <Image
                      src="/images/not-found.png"
                      alt="No reviews illustration"
                      width={300}
                      height={100}
                      sizes="(max-width: 500px) 100vw, 500px"
                      priority
                    />
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Belum ada peserta</h1>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            {!isHasSubmittedReview && (
              <div className="mt-6 p-6">
                <h3 className="text-lg font-semibold mb-4">Tambah Ulasan</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Rating</FormLabel>
                          <Select disabled={isPending} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Berikan rating dari 1 sampai 5." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {['1', '2', '3', '4', '5'].map((rating: string) => (
                                <SelectItem key={rating} value={rating}>
                                  {rating}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Komentar</FormLabel>
                          <FormControl>
                            <Textarea disabled={isPending}
                              placeholder="Berikan komentar tentang acara ini." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button disabled={isPending} type="submit">Kirim Ulasan</Button>
                  </form>
                </Form>
              </div>
            )}
            {!isHasSubmittedReview && <Separator />}
            <CardContent>
              <div className="my-6">
                <h3 className="text-lg font-semibold mb-4">
                  Daftar Ulasan - Rata-rata
                  ({event.reviews && event.reviews.length > 0 ? (
                    event.reviews.reduce((acc: any, review: any) => acc + review.rating, 0) / event.reviews.length
                  ) : 0})
                </h3>
              </div>
              {event.reviews && event.reviews.length > 0 ? (
                event.reviews.map((review: any) => (
                  <div key={review.id} className="mb-4 last:mb-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center gap-x-2">
                        <Avatar>
                          <AvatarFallback>{getInitials(review.user.name as string)}</AvatarFallback>
                        </Avatar>
                        <span
                          className="font-bold mr-2">{review.user.name} - {getUserRoleLabelFromValue(review.user.role)}</span>
                      </div>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <StarFilledIcon key={index} className="h-4 w-4 text-yellow-500" />
                      ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center mb-5">
                  <Image
                    src="/images/not-found.png"
                    alt="No reviews illustration"
                    width={300}
                    height={100}
                    sizes="(max-width: 500px) 100vw, 500px"
                    priority
                  />
                  <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Belum ada ulasan</h1>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Sumber Daya Yang Dibutuhkan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {event.resources && event.resources.length > 0 ? (
                  <ul>
                    {event.resources.map((er: any) => (
                      <li key={er?.resource?.id} className="mb-2">
                        <div className="flex items-center">
                          <FileTextIcon className="mr-2 h-4 w-4" />
                          {er?.resource?.name} ({er?.quantity} qty)
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center mb-5">
                    <Image
                      src="/images/not-found.png"
                      alt="No reviews illustration"
                      width={300}
                      height={100}
                      sizes="(max-width: 500px) 100vw, 500px"
                      priority
                    />
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Belum ada sumber daya yang
                      dibutuhkan</h1>
                  </div>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default DetailEventTab
