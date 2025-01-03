import { notFound } from 'next/navigation'
import { Event } from '@prisma/client'

import { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import DetailEventInfo from '@/app/(protected)/events/[eventId]/detail/detail-event-info'
import DetailEventTab from '@/app/(protected)/events/[eventId]/detail/detail-event-tab'

import { getEventDetail } from '@/actions/event.action'
import { checkUserHasSubmittedReview } from '@/actions/review.action'

// This would typically come from your database
async function getEvent(id: string) {
  const getEventDetailRes = await getEventDetail({ eventId: id })
  return getEventDetailRes.data as Event
}

async function isUserUHasSubmittedReview(eventId: string) {
  return await checkUserHasSubmittedReview(eventId)
}

const EventDetailPage = async ({ params }: { params: { eventId: string } }) => {
  const breadcrumbItems = [
    { label: 'Acara', href: '/events' },
    { label: 'Detail Acara', isCurrent: true }
  ] as BreadcrumbItemType[]

  const event = await getEvent(params.eventId)
  const userHasSubmittedReview = await isUserUHasSubmittedReview(params.eventId) as boolean

  if (!event) {
    notFound()
  }

  return (
    <>
      <ContentLayout title="Acara">
        <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
        <div className={'container mx-auto px-4 py-8'}>
          <h1 className="text-3xl font-bold mb-6">Detail Acara</h1>
          <DetailEventInfo event={event} />
          <DetailEventTab event={event} isHasSubmittedReview={userHasSubmittedReview} />
        </div>
      </ContentLayout>
    </>
  )
}

export default EventDetailPage
