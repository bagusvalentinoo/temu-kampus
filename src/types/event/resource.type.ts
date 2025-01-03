export type Resource = {
  id: string
  name: string
  quantity: number
  consumable: boolean
}

export type CreateResourceRequest = {
  name: string
  quantity: number
  consumable: boolean
}

export type GetEventResourcesRequest = {
  eventId: string
}

export type GetResourceDetailRequest = {
  resourceId: string
}

export type UpdateResourceRequest = {
  resourceId: string
} & CreateResourceRequest

export type BulkDeleteResourcesRequest = {
  resourceIds: string[]
}
