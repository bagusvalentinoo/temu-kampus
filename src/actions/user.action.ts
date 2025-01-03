import { User } from '@prisma/client'

export const userLoggedInDto = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }
}
