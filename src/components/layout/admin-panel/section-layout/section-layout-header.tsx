import Link from 'next/link'
import { Plus, Trash } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Heading } from '@/components/admin-panel/partial/heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type SectionLayoutHeaderProps = {
  title: string
  subtitle: string
  buttonAddLabel?: string
  buttonAddHref?: string
  showButtonDelete?: boolean
  buttonDeleteLabel?: string
}

export const SectionLayoutHeader = ({
  title,
  subtitle,
  buttonAddLabel,
  buttonAddHref,
  showButtonDelete = false,
  buttonDeleteLabel
}: SectionLayoutHeaderProps) => {
  return (
    <>
      <div
        className="flex flex-col justify-center gap-y-5 md:flex-row md:items-start md:justify-between md:gap-y-0">
        <Heading title={title} subtitle={subtitle} />
        <div className="flex flex-wrap items-center gap-4">
          {showButtonDelete && buttonDeleteLabel && (
            <Button
              variant="destructive"
              className="sm:w-full"
            >
              <Trash className="mr-2 h-4 w-4" /> {buttonDeleteLabel}
            </Button>
          )}
          {buttonAddLabel && buttonAddHref && (
            <Link
              href={buttonAddHref}
              className={cn('w-full', buttonVariants({ variant: 'default' }))}
            >
              <Plus className="mr-2 h-4 w-4" /> {buttonAddLabel}
            </Link>
          )}
        </div>
      </div>
      <Separator />
    </>
  )
}