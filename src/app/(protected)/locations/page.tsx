import type { Metadata } from 'next'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'
import type { Location } from '@/types/event/location.type'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { SectionLayoutHeader } from '@/components/layout/admin-panel/section-layout/section-layout-header'
import { DataTable } from '@/components/ui/data-table/data-table'
import { Card, CardContent } from '@/components/ui/card'

import { columns } from '@/app/(protected)/locations/(table)/columns'

import { getLocations } from '@/actions/location.action'

export const metadata: Metadata = {
  title: 'Lokasi'
}

const getData = async (): Promise<Location[]> => {
  const response = await getLocations()
  return response.data! as Location[]
}

const LocationsPage = async () => {
  const locations = await getData()

  const breadcrumbItems = [
    { label: 'Lokasi', isCurrent: true }
  ] as BreadcrumbItemType[]

  return <>
    <ContentLayout title="Lokasi">
      <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
      <SectionLayout>
        <SectionLayoutHeader
          title={`Lokasi (${locations.length})`}
          subtitle="Managemen Lokasi Acara"
          buttonAddLabel="Tambah Lokoasi"
          buttonAddHref="/locations/create"
        />
        <Card>
          <CardContent className="mt-5">
            <DataTable columns={columns} data={locations} />
          </CardContent>
        </Card>
      </SectionLayout>
    </ContentLayout>
  </>
}

export default LocationsPage