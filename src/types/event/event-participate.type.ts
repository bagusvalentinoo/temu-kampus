export type UserParticipateInEventRequest = {
  eventId: string
}

export type GetEventParticipatesRequest = {
  eventId: string
}

export type GetEventParticipateDetailRequest = {
  eventParticipantId: string
}

export type ConfirmEventParticipateRequest = {
  eventParticipantId: string
}
