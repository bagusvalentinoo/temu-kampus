import Link from 'next/link'

import type { BreadcrumbItemType } from '@/types/layout/admin-panel/content-layout/breadcrumb'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

type ContentLayoutBreadcrumbProps = {
  breadcrumbItems: BreadcrumbItemType[]
}

export const ContentLayoutBreadcrumb = ({
  breadcrumbItems
}: ContentLayoutBreadcrumbProps) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <>
              <BreadcrumbItem key={item.label}>
                {item.isCurrent ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || '#'}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}