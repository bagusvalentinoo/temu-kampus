import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

type PaginationProps = {
  pageIndex: number
  pageCount: number
  pageSize: number
  pageSizeOptions?: number[]
  canPreviousPage: boolean
  canNextPage: boolean
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export const Pagination = ({
  pageIndex,
  pageCount,
  pageSize,
  pageSizeOptions = [10, 20, 30, 40, 50],
  canPreviousPage,
  canNextPage,
  onPageChange,
  onPageSizeChange
}: PaginationProps) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row sm:gap-6">
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-start">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm font-medium sm:hidden">
          Page {pageIndex + 1} of {pageCount}
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-2 sm:justify-end">
        <div className="hidden items-center text-sm font-medium sm:flex">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden h-8 w-8 p-0 sm:flex"
            onClick={() => onPageChange(0)}
            disabled={!canPreviousPage}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={!canNextPage}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="hidden h-8 w-8 p-0 sm:flex"
            onClick={() => onPageChange(pageCount - 1)}
            disabled={!canNextPage}
          >
            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}