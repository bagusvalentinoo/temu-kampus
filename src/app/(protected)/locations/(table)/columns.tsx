'use client'

import { ColumnDef } from '@tanstack/react-table'

import type { Location } from '@/types/event/location.type'
import { CellAction } from '@/app/(protected)/locations/(table)/cell-action'

export const columns: ColumnDef<Location>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Pilih Semua"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Pilih Baris"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    header: 'No.',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'name',
    header: 'Nama Lokasi'
  },
  {
    accessorKey: 'address',
    header: 'Alamat'
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => <CellAction id={row.original.id} />
  }
]
