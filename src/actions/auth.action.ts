'use server'

import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { validate } from '@/lib/validation'
import { signIn, signOut } from '@/lib/auth'

import { LoginSchema, LoginValues } from '@/schemas/auth/login.schema'
import { RegisterSchema, type RegisterValues } from '@/schemas/auth/register.schema'

import { createResponse } from '@/lib/helpers/response.helper'
import { defaultSaltRounds } from '@/lib/helpers/bcryptjs.helper'
import { LOGIN_PAGE } from '@/lib/helpers/auth.helper'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { CallbackRouteError } from '@auth/core/errors'

export const login = async (data: LoginValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(LoginSchema, data)

    if (!success)
      return createResponse({ errors })

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    return createResponse({
      success: true,
      message: 'Login berhasil!'
    })
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }

    if (error instanceof CallbackRouteError) {
      if (error?.cause?.err?.message === 'Email atau kata sandi tidak valid') {
        return createResponse({
          message: error.cause.err.message
        })
      }

      return createResponse({
        success: true,
        message: 'Login berhasil!'
      })
    }

    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  }
}

export const register = async (data: RegisterValues) => {
  try {
    // Validate the form data
    const { success, errors } = validate(RegisterSchema, data)

    if (!success)
      return createResponse({ errors })

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true }
    })

    if (existingUser)
      return createResponse({
        message: 'Pengguna sudah terdaftar'
      })

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, defaultSaltRounds)

    // Create a new user with the hashed password
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role
      } satisfies Omit<RegisterValues, 'passwordConfirmation'>
    })

    return createResponse({
      success: true,
      message: 'Pendaftaran berhasil!'
    })
  } catch (error) {
    return createResponse({
      message: error instanceof Error ? error.message : 'Terjadi kesalahan'
    })
  }
}

export async function logout() {
  await signOut({
    redirectTo: LOGIN_PAGE
  })
}
