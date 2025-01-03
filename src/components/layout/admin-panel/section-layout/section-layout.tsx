import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionLayoutProps = {
  className?: string
  children: ReactNode
}

export const SectionLayout = ({ className, children }: SectionLayoutProps) => {
  return (
    <section className={cn('my-5', className)}>
      {children}
    </section>
  )
}