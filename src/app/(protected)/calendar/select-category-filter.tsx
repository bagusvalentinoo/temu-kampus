'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { eventCategories } from '@/lib/helpers/event.helper'

const selectCategoryFilter = ({ onValueChange }: { onValueChange: any }) => {
  const handleSelectChange = (value: string) => {
    onValueChange(value)
  }

  return (
    <Select name="category" onValueChange={(value) => handleSelectChange(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Pilih kategori" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(eventCategories).map(category => (
          <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default selectCategoryFilter
