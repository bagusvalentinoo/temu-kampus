import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Menu } from '@/components/admin-panel/partial/menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type SheetMenuProps = {
  role: string
}

export const SheetMenu = ({ role }: SheetMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="rounded-full bg-slate-800 p-3 text-sm  font-bold text-white">
                TM
              </div>
              <SheetTitle className="font-bold text-lg">Temu Kampus</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen role={role} />
      </SheetContent>
    </Sheet>
  )
}
