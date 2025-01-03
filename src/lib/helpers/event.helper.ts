import { EventParticipant } from '@prisma/client'

export const eventSections = {
  upcoming: {
    label: 'Yang Akan Datang',
    value: 'upcoming'
  },
  past: {
    label: 'Selesai',
    value: 'past'
  },
  owned: {
    label: 'Milik Saya',
    value: 'owned'
  },
  participated: {
    label: 'Yang Diikuti',
    value: 'participated'
  }
}

export const eventCategories = {
  meeting: {
    label: 'Rapat',
    value: 'Rapat'
  },
  workshop: {
    label: 'Workshop',
    value: 'Workshop'
  },
  training: {
    label: 'Pelatihan',
    value: 'Pelatihan'
  },
  seminar: {
    label: 'Seminar',
    value: 'Seminar'
  },
  conference: {
    label: 'Konferensi',
    value: 'Konferensi'
  },
  exhibition: {
    label: 'Pameran',
    value: 'Pameran'
  },
  social: {
    label: 'Sosial',
    value: 'Sosial'
  },
  other: {
    label: 'Lainnya',
    value: 'Lainnya'
  }
}

export const getEventConfirmationLink = (eventParticipant: EventParticipant) => {
  return `${process.env.APP_HOST}/confirm-event-participant?token=${eventParticipant.id}`
}
