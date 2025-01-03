'use client'

import { useRouter } from 'next/navigation'
import { CalendarIcon, MapPinIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { formatDateWithTimezone, getUserTimezone, readableDateFormat } from '@/lib/helpers/date.helper'

const CardEvent = ({ event }: { event: any }) => {
  const router = useRouter()

  const goToEventDetailPage = (eventId: string) => {
    router.push(`/events/${eventId}/detail`)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
        <div className="flex flex-col space-y-1">
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {
                formatDateWithTimezone(event.dateStart, readableDateFormat, getUserTimezone()) + ' - ' +
                formatDateWithTimezone(event.dateEnd, readableDateFormat, getUserTimezone())
              }
            </span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>{event.location.address}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => goToEventDetailPage(event.id)} className="w-full">Lihat Detail</Button>
      </CardFooter>
    </Card>
  )
}

export default CardEvent
