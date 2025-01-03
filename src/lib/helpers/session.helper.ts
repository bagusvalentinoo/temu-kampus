import 'server-only'

import { JWTPayload, jwtVerify, SignJWT } from 'jose'
import { appEnvs } from '@/lib/helpers/env.helper'
import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export const authTokenCookieKey = 'auth_token'
export const authTokenExp = '1d'

const signKey = new TextEncoder().encode(process.env.JWT_SECRET || '')

const cookie = {
  name: authTokenCookieKey,
  options: {
    httpOnly: true,
    secure: process.env.APP_ENV === appEnvs.production,
    sameSite: 'strict'
  } as Partial<ResponseCookie>,
  duration: 60 * 60 * 24 * 1000
}

export const encrypt = async (payload: JWTPayload | undefined) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: process.env.JWT_ALG || '' })
    .setIssuedAt()
    .setExpirationTime(authTokenExp)
    .sign(signKey)
}

export const decrypt = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, signKey, {
      algorithms: [process.env.JWT_ALG || '']
    })

    return payload
  } catch (err) {
    console.log(err)
    return null
  }
}

export const createSession = async (userId: string) => {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ userId, expires })

  cookies().set(cookie.name, session, {
    ...cookie.options,
    expires
  })
}

export const verifySession = async () => {
  const cookieValue = cookies().get(authTokenCookieKey)?.value
  if (!cookieValue) return redirect('/login')

  const session = await decrypt(cookieValue)
  if (!session?.userId) return redirect('/login')

  return { userId: session.userId as string }
}

export const destroySession = async (res: NextResponse | null = null) => {
  if (res) {
    res.cookies.delete(authTokenCookieKey)
    return
  }

  if (cookies().has(authTokenCookieKey)) {
    cookies().delete(authTokenCookieKey)
  }
}
