import type { Metadata } from 'next'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import ListEventBySection from '@/app/(protected)/events/list-event-by-section'
import ButtonGoToAddEventPage from '@/app/(protected)/events/button-go-to-add-event-page'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'

export const metadata: Metadata = {
  title: 'Acara'
}

const EventsPage = () => {
  const breadcrumbItems = [
    { label: 'Acara', isCurrent: true }
  ] as BreadcrumbItemType[]

  return (
    <>
      <ContentLayout title="Acara">
        <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
        <SectionLayout>
          <div className={'flex justify-between'}>
            <h1 className="text-3xl font-bold mb-6">Daftar Acara</h1>
            <ButtonGoToAddEventPage />
          </div>
          <ListEventBySection />
        </SectionLayout>
      </ContentLayout>
    </>
  )
}

export default EventsPage
