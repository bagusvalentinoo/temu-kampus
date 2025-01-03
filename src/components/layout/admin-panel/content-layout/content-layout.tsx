import type { ReactNode } from 'react'
import type { Session } from 'next-auth'
import type { User } from '@prisma/client'

import { auth } from '@/lib/auth'
import { Navbar } from '@/components/admin-panel/partial/navbar/navbar'

type ContentLayoutProps = {
  title: string;
  children: ReactNode
}

export const ContentLayout = async ({ title, children }: ContentLayoutProps) => {
  const session = await auth() as Session

  return (
    <>
      <Navbar title={title} user={session.user as User} />
      <div className="pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </>
  )
}
