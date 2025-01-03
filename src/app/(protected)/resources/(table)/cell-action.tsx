'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AlertModal } from '@/components/ui/alert-modal'

import { bulkDeleteResources } from '@/actions/resource.action'

type CellActionProps = {
  id: string
}

export const CellAction = ({ id }: CellActionProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const onConfirm = async () => {
    setLoading(true)
    const resourceIds = [id]
    const { success, message } = await bulkDeleteResources({ resourceIds })

    if (success) {
      toast.success(message)
      setLoading(false)
      setOpen(false)
      router.push('/resources')
      router.refresh()
      return
    }

    toast.error(message)
    setLoading(false)
    setOpen(false)
  }

  return <>
    <AlertModal
      title="Hapus Peralatan"
      description="Apakah Anda yakin ingin menghapus peralatan ini?"
      cancelText="Batal"
      confirmText="Hapus"
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onConfirm}
      loading={loading}
    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Buka menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => router.push(`/resources/edit/${id}`)}
        >
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpen(true)}>
          <Trash className="mr-2 h-4 w-4" /> Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
}