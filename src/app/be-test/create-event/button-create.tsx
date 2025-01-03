'use client'

import { Button } from '@/components/ui/button'
import { createEvent } from '@/actions/event.action'
import { getLocations } from '@/actions/location.action'
import { getResources } from '@/actions/resource.action'

export const ButtonCreateEvent = () => {
  const createEventData = async () => {
    const locationResponse = await getLocations()
    const resourceResponse = await getResources()

    const response = await createEvent({
      title: 'Event 1',
      description: 'Event 1 description',
      dateStart: '2024-10-12 12:00:00',
      dateEnd: '2024-10-12 18:00:00',
      category: 'Category 1',
      locationId: Array.isArray(locationResponse.data) && locationResponse.data.length > 0 ? locationResponse.data[0].id : '',

      resources: Array.isArray(resourceResponse.data) ? [
        {
          resourceId: resourceResponse.data[0].id,
          quantity: 1
        }
      ] : []
    })

    console.log(response)
  }

  return (
    <form action={createEventData}>
      <Button type="submit">Create Event</Button>
    </form>
  )
}
