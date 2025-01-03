export type CreateEventRequest = {
  title: string
  description: string
  dateStart: string
  dateEnd: string
  category: string

  locationId: string

  resources: {
    resourceId: string
    quantity: number
  }[]
}

export type GetEventsRequest = {
  section?: string
  category?: string
}

export type GetEventDetailRequest = {
  eventId: string
}


export type UpdateEventRequest = {
  eventId: string // The ID of the event being updated
  title?: string
  description?: string
  dateStart?: string
  dateEnd?: string
  category?: string

  locationId?: string

  resources?: {
    resourceId: string
    quantity: number
  }[]
}

export type BulkDeleteEventRequest = {
  eventIds: string[]
}
