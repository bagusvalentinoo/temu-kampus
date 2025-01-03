export type CreateEventReviewRequest = {
  eventId: string
  rating: number
  comment: string
}

export type GetEventReviewsRequest = {
  eventId: string
}
