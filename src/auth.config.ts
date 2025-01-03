import type { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const authConfig = {
  pages: {
    error: '/',
    signIn: '/',
    signOut: '/'
  },
  secret: process.env.NEXTAUTH_SECRET || '',
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  
  providers: []
} satisfies NextAuthConfig
