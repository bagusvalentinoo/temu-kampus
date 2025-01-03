import type { Metadata } from 'next'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'
import type { Resource } from '@/types/event/resource.type'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { FormResource } from '@/app/(protected)/resources/form-resource'
import { getResourceDetail } from '@/actions/resource.action'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Peralatan'
}

const getResourceData = async (resourceId: string): Promise<Resource | null> => {
  const response = await getResourceDetail({ resourceId })
  return response.data ? response.data as Resource : null
}

type ResourcesEditPageProps = {
  params: {
    id: string
  }
}

const ResourcesEditPage = async ({ params }: ResourcesEditPageProps) => {
  const breadcrumbItems = [
    { label: 'Peralatan', href: '/resources' },
    { label: 'Edit Peralatan', isCurrent: true }
  ] as BreadcrumbItemType[]

  const resourceId = params.id
  const resource = await getResourceData(resourceId)

  if (!resource) notFound()

  return <>
    <ContentLayout title="Edit Peralatan">
      <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
      <SectionLayout>
        <FormResource resource={resource} />
      </SectionLayout>
    </ContentLayout>
  </>
}

export default ResourcesEditPage