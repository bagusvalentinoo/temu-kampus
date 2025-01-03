'use client'

import { Button } from '@/components/ui/button'
import { participateInEvent } from '@/actions/event-participate.action'
import { getEvents } from '@/actions/event.action'
import { eventSections } from '@/lib/helpers/event.helper'

const ButtonParticipateEvent = () => {
  const participateToEvent = async () => {
    const resGetEvents = await getEvents({
      section: eventSections.upcoming.value
    })

    console.log(resGetEvents)

    await participateInEvent({
      eventId: Array.isArray(resGetEvents.data) && resGetEvents.data.length > 0
        ? resGetEvents.data[0].id
        : ''
    })
  }

  return (
    <Button onClick={participateToEvent}>
      Participate Event
    </Button>
  )
}

export default ButtonParticipateEvent
