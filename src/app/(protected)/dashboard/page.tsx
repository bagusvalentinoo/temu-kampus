import type { Metadata } from 'next'
import type { Session } from 'next-auth'

import { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'

import { ContentLayout } from '@/components/layout/admin-panel/content-layout/content-layout'
import { ContentLayoutBreadcrumb } from '@/components/layout/admin-panel/content-layout/content-layout-breadcrumb'
import { SectionLayout } from '@/components/layout/admin-panel/section-layout/section-layout'
import { SectionDashboardStatisticsAdmin } from '@/app/(protected)/dashboard/section-dashboard-statistics-admin'
import { SectionDashboardStatisticsUser } from '@/app/(protected)/dashboard/section-dashboard-statistics-user'

import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Dashboard'
}

const DashboardPage = async () => {
  const breadcrumbItems = [
    { label: 'Dashboard', isCurrent: true }
  ] as BreadcrumbItemType[]

  const session = await auth() as Session
  const userName = session.user!.name
  const userRole = session.user!.role

  return (
    <>
      <ContentLayout title="Dashboard">
        <ContentLayoutBreadcrumb breadcrumbItems={breadcrumbItems} />
        <SectionLayout>
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Selamat Datang
            <span className="text-yellow-500"> {userName}</span>
            👋
          </h2>
        </SectionLayout>
        {userRole === 'admin' && <SectionDashboardStatisticsAdmin />}
        {(userRole === 'lecturer' || userRole === 'student') && <SectionDashboardStatisticsUser />}
      </ContentLayout>
    </>
  )
}

export default DashboardPage