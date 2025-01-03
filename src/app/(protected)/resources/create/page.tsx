import type { Metadata } from 'next'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { FormResource } from '@/app/(protected)/resources/form-resource'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Tambah Peralatan'
}

const ResourcesCreatePage = () => {
  const breadcrumbItems = [
    { label: 'Peralatan', href: '/resources' },
    { label: 'Tambah Peralatan', isCurrent: true }
  ] as BreadcrumbItemType[]

  return <>
    <ContentLayout title="Tambah Peralatan">
      <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
      <SectionLayout>
        <Card>
          <CardContent className="mt-5">
            <FormResource />
          </CardContent>
        </Card>
      </SectionLayout>
    </ContentLayout>
  </>
}

export default ResourcesCreatePage