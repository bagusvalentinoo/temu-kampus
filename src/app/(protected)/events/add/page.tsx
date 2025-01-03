import { Location, Resource } from '@prisma/client'

import { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'

import FormAddEvent from '@/app/(protected)/events/add/form-add-event'

import { getLocations } from '@/actions/location.action'
import { getResources } from '@/actions/resource.action'

const AddEventPage = async () => {
  const breadcrumbItems = [
    { label: 'Acara', href: '/events' },
    { label: 'Tambah Acara', isCurrent: true }
  ] as BreadcrumbItemType[]

  const getAvailableLocations = async () => {
    const getLocationsRes = await getLocations()
    return getLocationsRes.data as Location[]
  }

  const locations = await getAvailableLocations()

  const getAvailableResources = async () => {
    const getLocationsRes = await getResources()
    return getLocationsRes.data as Resource[]
  }

  const resources = await getAvailableResources()

  return (
    <>
      <ContentLayout title="Acara">
        <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
        <div className={'container mx-auto px-4 py-8'}>
          <h1 className="text-3xl font-bold mb-6">Tambah Acara</h1>

          <FormAddEvent locations={locations} resources={resources} />
        </div>
      </ContentLayout>
    </>
  )
}

export default AddEventPage
