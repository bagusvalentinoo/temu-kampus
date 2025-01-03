import { PrismaClient } from '@prisma/client'
import { appEnvs } from '@/lib/helpers/env.helper'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.APP_ENV !== appEnvs.production) globalForPrisma.prisma = prisma
