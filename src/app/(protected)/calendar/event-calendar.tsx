'use client'

import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Card, CardContent } from '@/components/ui/card'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { eventCategories } from '@/lib/helpers/event.helper'
import { getEvents } from '@/actions/event.action'
import { EventCalendar } from '@/types/event/event-calendar.type'

const localizer = momentLocalizer(moment)

const EventCalendarComponent = () => {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [events, setEvents] = useState<EventCalendar[]>([])

  const fetchEventData = async () => {
    const response = await getEvents({
      category: categoryFilter
    })

    if (!response.success) {
      setEvents([])
      return
    }

    if (response.data) {
      setEvents(response.data.map(event => ({
        title: event.title,
        start: new Date(event.dateStart),
        end: new Date(event.dateEnd)
      })))
    }
  }

  useEffect(() => {
    /* eslint-disable */
    fetchEventData()
  }, [categoryFilter])

  const handleSelectCategoryValueChange = (value: string) => {
    setCategoryFilter(value)
  }

  return (
    <Card>
      <CardContent className={'p-6'}>
        <div className={'mb-5'}>
          <Select name="category" onValueChange={(value) => handleSelectCategoryValueChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori"/>
            </SelectTrigger>
            <SelectContent>
              {Object.values(eventCategories).map(category => (
                <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month']}
          style={{height: 500}}
        />
      </CardContent>
    </Card>
  )
}

export default EventCalendarComponent
