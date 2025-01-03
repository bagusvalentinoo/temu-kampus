import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString
}

export const searchParamsCache = createSearchParamsCache(searchParams)
