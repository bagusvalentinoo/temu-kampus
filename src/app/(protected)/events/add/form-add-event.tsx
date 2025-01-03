'use client'

import { Location, Resource } from '@prisma/client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { formatDateWithTimezone } from '@/lib/helpers/date.helper'
import { createEvent } from '@/actions/event.action'
import toast from 'react-hot-toast'
import { PlusCircle, X } from 'lucide-react'
import { eventCategories } from '@/lib/helpers/event.helper'

const FormAddEvent = ({ locations, resources }: { locations: Location[], resources: Resource[] }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    category: '',
    locationId: '',

    resources: [{ resourceId: '', quantity: 1 }]
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleResourceChange = (index: number, field: string, value: string | number) => {
    const updatedResources = formData.resources.map((resource, i) => {
      if (i === index) {
        return { ...resource, [field]: value }
      }
      return resource
    })
    setFormData(prevState => ({
      ...prevState,
      resources: updatedResources
    }))
  }

  const addResource = () => {
    setFormData(prevState => ({
      ...prevState,
      resources: [...prevState.resources, { resourceId: '', quantity: 1 }]
    }))
  }

  const removeResource = (index: number) => {
    setFormData(prevState => ({
      ...prevState,
      resources: prevState.resources.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const response = await createEvent({
      title: formData.title,
      description: formData.description,
      dateStart: formatDateWithTimezone(new Date(formData.dateStart)),
      dateEnd: formatDateWithTimezone(new Date(formData.dateEnd)),
      category: formData.category,
      locationId: formData.locationId,

      resources: formData.resources
    })

    if (response.success) {
      toast.success(response.message)
      router.push('/events')
    } else {
      toast.error(response.message)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className={'p-6'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateStart">Tanggal Mulai</Label>
            <Input
              id="dateStart"
              name="dateStart"
              type="datetime-local"
              value={formData.dateStart}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateEnd">Tanggal Berakhir</Label>
            <Input
              id="dateEnd"
              name="dateEnd"
              type="datetime-local"
              value={formData.dateEnd}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select name="category" onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(eventCategories).map(category => (
                  <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationId">Lokasi</Label>
            <Select name="locationId" onValueChange={(value) => handleSelectChange('locationId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                {
                  locations.map(location => (
                    <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Peralatan Yang Dibutuhkan</Label>
            {formData.resources.map((resource: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <Select
                  value={resource.resourceId}
                  onValueChange={(value: string) => handleResourceChange(index, 'resourceId', value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Pilih peralatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      resources.map(resource => (
                        <SelectItem key={resource.id} value={resource.id}>{resource.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={resource.quantity}
                  onChange={(e) => handleResourceChange(index, 'quantity', parseInt(e.target.value))}
                  min="1"
                  className="w-20"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeResource(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addResource}>
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Peralatan
            </Button>
          </div>

          <Button type="submit">Buat Acara</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormAddEvent
