export type ResponseData<TData = null, TErrors = null> = {
  success: boolean
  message: string
  data: TData
  errors: TErrors
}
