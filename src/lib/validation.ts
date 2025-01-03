import { ZodType } from 'zod'

export const validate = <T, U>(
  schema: ZodType<T>,
  data: U
) => {
  const validationResult = schema.safeParse(data)

  return {
    success: validationResult.success,
    errors: validationResult.error ? validationResult.error.flatten().fieldErrors : null
  }
}
