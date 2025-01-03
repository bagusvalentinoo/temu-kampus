import { Event } from '@prisma/client'

import ListEvents from '@/app/be-test/list-events/list-events'

import { getEvents } from '@/actions/event.action'
import { eventSections } from '@/lib/helpers/event.helper'

const listEventsPage = async () => {
  const getUpcomingEventsData = async () => {
    const { data } = await getEvents({
      section: eventSections.upcoming.value
    })
    return data as Event[]
  }

  const getPastEventsData = async () => {
    const { data } = await getEvents({
      section: eventSections.past.value
    })
    return data as Event[]
  }

  const getOwnedEventsData = async () => {
    const { data } = await getEvents({
      section: eventSections.owned.value
    })
    return data as Event[]
  }

  const getParticipateInEventData = async () => {
    const { data } = await getEvents({
      section: eventSections.participated.value
    })
    return data as Event[]
  }

  const upcomingEvents = await getUpcomingEventsData()
  const pastEvents = await getPastEventsData()
  const ownedEvents = await getOwnedEventsData()
  const participateInEvent = await getParticipateInEventData()

  return (
    <div>
      <h1>Daftar Acara</h1>

      <hr className={'my-3'} />
      <ListEvents title={'List Upcoming Events'} events={upcomingEvents} />
      <hr className={'my-3'} />
      <ListEvents title={'List Past Events'} events={pastEvents} />
      <hr className={'my-3'} />
      <ListEvents title={'List Owned Events'} events={ownedEvents} />
      <hr className={'my-3'} />
      <ListEvents title={'List Participate In Events'} events={participateInEvent} />
    </div>
  )
}

export default listEventsPage
