import type { ResponseData } from '@/types/server-actions/response'

export const createResponse = <TData = null, TErrors = null>(
  params: Partial<ResponseData<TData, TErrors>> = {}
): ResponseData<TData, TErrors> => ({
    success: false,
    message: '',
    data: null as TData,
    errors: null as TErrors,
    ...params
  })
