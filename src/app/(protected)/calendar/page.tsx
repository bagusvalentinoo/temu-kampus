import type { Metadata } from 'next'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'

import EventCalendarComponent from '@/app/(protected)/calendar/event-calendar'

export const metadata: Metadata = {
  title: 'Kalendar'
}

const CalendarPage = async () => {
  return (
    <>
      <ContentLayout title="Kalendar">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Kalendar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <SectionLayout>
          <div className={'flex justify-between'}>
            <h1 className="text-3xl font-bold mb-6">Kalendar Acara Yang Akan Datang</h1>
          </div>

          <EventCalendarComponent />
        </SectionLayout>
      </ContentLayout>
    </>
  )
}

export default CalendarPage
