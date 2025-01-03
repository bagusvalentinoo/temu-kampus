'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { eventSections } from '@/lib/helpers/event.helper'
import { getEvents } from '@/actions/event.action'
import { Event } from '@prisma/client'
import CardEvent from '@/app/(protected)/events/card-event'

const fetchEvents = async (category: string): Promise<Event[]> => {
  const getEventsRes = await getEvents({
    section: category
  })

  return getEventsRes.data as Event[]
}

const ListEventBySection = () => {
  const [activeTab, setActiveTab] = useState<string>(eventSections.upcoming.value)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      const fetchedEvents = await fetchEvents(activeTab)
      setEvents(fetchedEvents)
      setIsLoading(false)
    }

    loadEvents()
  }, [activeTab])

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {Object.values(eventSections).map((section) => (
            <TabsTrigger key={section.value} value={section.value}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(eventSections).map((section) => (
          <TabsContent key={section.value} value={section.value}>
            {isLoading ? (
              <p className="text-center py-4">Memuat event...</p>
            ) : events.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <CardEvent key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-center py-4">Tidak ada event untuk ditampilkan.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

export default ListEventBySection
