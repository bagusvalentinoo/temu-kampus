import type { Metadata } from 'next'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'
import type { Location } from '@/types/event/location.type'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { FormLocation } from '@/app/(protected)/locations/form-location'
import { getLocationDetail } from '@/actions/location.action'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Lokasi'
}

const getLocationData = async (locationId: string): Promise<Location | null> => {
  const response = await getLocationDetail({ locationId })
  return response.data ? response.data as Location : null
}

type LocationsEditPageProps = {
  params: {
    id: string
  }
}

const LocationsEditPage = async ({ params }: LocationsEditPageProps) => {
  const breadcrumbItems = [
    { label: 'Lokasi', href: '/locations' },
    { label: 'Edit Lokasi', isCurrent: true }
  ] as BreadcrumbItemType[]

  const locationId = params.id
  const location = await getLocationData(locationId)

  if (!location) notFound()

  return <>
    <ContentLayout title="Edit Lokasi">
      <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
      <SectionLayout>
        <FormLocation location={location} />
      </SectionLayout>
    </ContentLayout>
  </>
}

export default LocationsEditPage