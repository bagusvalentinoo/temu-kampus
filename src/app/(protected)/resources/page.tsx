import type { Metadata } from 'next'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'
import type { Resource } from '@/types/event/resource.type'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { SectionLayoutHeader } from '@/components/layout/admin-panel/section-layout/section-layout-header'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { DataTable } from '@/components/ui/data-table/data-table'
import { Card, CardContent } from '@/components/ui/card'

import { columns } from '@/app/(protected)/resources/(table)/columns'

import { getResources } from '@/actions/resource.action'

export const metadata: Metadata = {
  title: 'Peralatan'
}

const getData = async (): Promise<Resource[]> => {
  const response = await getResources()
  return response.data! as Resource[]
}

const ResourcesPage = async () => {
  const resources = await getData()

  const breadcrumbItems = [
    { label: 'Peralatan', isCurrent: true }
  ] as BreadcrumbItemType[]

  return <>
    <ContentLayout title="Peralatan">
      <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
      <SectionLayout>
        <SectionLayoutHeader
          title={`Peralatan (${resources.length})`}
          subtitle="Managemen Peralatan Acara"
          buttonAddLabel="Tambah Peralatan"
          buttonAddHref="/resources/create"
          buttonDeleteLabel="Hapus Peralatan"
        />
        <Card>
          <CardContent className="mt-5">
            <DataTable columns={columns} data={resources} />
          </CardContent>
        </Card>
      </SectionLayout>
    </ContentLayout>
  </>
}

export default ResourcesPage