'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react'
import { formatDateWithTimezone, getUserTimezone, readableDateFormat } from '@/lib/helpers/date.helper'
import { Button } from '@/components/ui/button'
import { participateInEvent } from '@/actions/event-participate.action'
import toast from 'react-hot-toast'

const DetailEventInfo = ({ event }: { event: any }) => {
  const btnParticipateEventClicked = async () => {
    const participateInEventRes = await participateInEvent({
      eventId: event.id
    })

    if (!participateInEventRes.success) {
      toast.error(participateInEventRes.message)
    } else {
      toast.success(participateInEventRes.message)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-3xl">{event.title}</CardTitle>
        <CardDescription>{event.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{event.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            <span>
              {
                formatDateWithTimezone(event.dateStart, readableDateFormat, getUserTimezone()) + ' - ' +
                formatDateWithTimezone(event.dateEnd, readableDateFormat, getUserTimezone())
              }
            </span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-5 w-5" />
            <span>{event && event.location ? event.location.address : undefined}</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="mr-2 h-5 w-5" />
            <span>Organized by {event?.creator?.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={btnParticipateEventClicked} className="w-full">Ikuti Acara</Button>
      </CardFooter>
    </Card>
  )
}

export default DetailEventInfo
