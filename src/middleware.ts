import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  adminRoutes,
  DEFAULT_LOGIN_REDIRECT,
  guestRoutes,
  LOGIN_PAGE,
  protectedRoutes,
  UNAUTHORIZED_REDIRECT
} from '@/lib/helpers/auth.helper'

export default auth((req) => {
  const currentPath = req.nextUrl.pathname
  const isRouteProtected = protectedRoutes.some(route => currentPath.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => currentPath.startsWith(route))
  const isAuthenticated = !!req.auth
  const userRole = req.auth?.user?.role

  if (isRouteProtected || isAdminRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(LOGIN_PAGE, req.nextUrl))
    }
    if (isAdminRoute && userRole !== 'admin') {
      const referrer = req.headers.get('referer') || DEFAULT_LOGIN_REDIRECT
      return NextResponse.redirect(new URL(UNAUTHORIZED_REDIRECT(referrer), req.nextUrl))
    }
  }

  const isRouteGuest = guestRoutes.some(route => currentPath.startsWith(route))
  if (isRouteGuest && isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}