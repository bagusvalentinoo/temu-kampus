'use client'

import type { User } from '@prisma/client'

import { ModeToggle } from '@/components/mode-toggle'
import { UserNav } from '@/components/admin-panel/partial/navbar/user-nav'
import { SheetMenu } from '@/components/admin-panel/partial/navbar/sheet-menu'

type NavbarProps = {
  title: string
  user: User
}

export const Navbar = ({ title, user }: NavbarProps) => {
  return (
    <header
      className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu role={user.role} />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <UserNav user={user} />
        </div>
      </div>
    </header>
  )
}
