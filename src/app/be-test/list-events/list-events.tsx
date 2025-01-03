'use client'

import { ArrowRight, CalendarDays, MapPin, Tag, User as UserLucide } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateWithTimezone, getUserTimezone, readableDateFormat } from '@/lib/helpers/date.helper'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ListEvents = ({ title, events }: { title: string, events: any[] }) => {
  return (
    <div>
      <h1 className={'mb-3'}>{title}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="bg-muted">
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 pt-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {formatDateWithTimezone(event.dateStart, readableDateFormat, getUserTimezone())}
                  {' - '}
                  {formatDateWithTimezone(event.dateEnd, readableDateFormat, getUserTimezone())}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{event.location.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{event.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserLucide className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Created by {event.creator?.name}</span>
              </div>
            </CardContent>

            <CardFooter>
              <Link href={`/events/${event.id}`} passHref className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ListEvents
