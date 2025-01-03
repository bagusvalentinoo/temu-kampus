import bcrypt from 'bcryptjs'
import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { authConfig } from '@/auth.config'
import { prisma } from '@/lib/prisma'
import { userLoggedInDto } from '@/actions/user.action'
import { User } from '@prisma/client'

export const {
  handlers, signIn, signOut, auth
} = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user)
          throw new Error('Email atau kata sandi tidak valid')

        const isValid = await bcrypt.compare(credentials.password as string, user.password)

        if (!isValid)
          throw new Error('Email atau kata sandi tidak valid')

        return userLoggedInDto(user) as User
      }
    })
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }

      return token
    },

    session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }

      return session
    }
  }
} satisfies NextAuthConfig)