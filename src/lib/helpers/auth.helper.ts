export const guestRoutes = [
  '/login',
  '/register',
  '/forgot-password'
]

export const protectedRoutes = [
  '/dashboard',
  '/events',
  '/calendar'
]

export const adminRoutes = [
  '/resources',
  '/location'
]

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
export const LOGIN_PAGE = '/login'
export const UNAUTHORIZED_REDIRECT = (referrer: string) => referrer || DEFAULT_LOGIN_REDIRECT