import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { defaultSaltRounds } from '@/lib/helpers/bcryptjs.helper'
import { userRoles } from '@/lib/helpers/user-role.helper'

const userAdminSeeder = async () => {
  const email = 'admin@temukampus.com'
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {
    return
  }

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: email,
      password: bcrypt.hashSync('admin1234!', defaultSaltRounds),
      role: userRoles.admin.value
    }
  })

  console.log('Admin user created')
}

const userLecturerSeeder = async () => {
  const email = 'lecturer@temukampus.com'
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {
    return
  }

  await prisma.user.create({
    data: {
      name: 'Lecturer',
      email: email,
      password: bcrypt.hashSync('lecturer1234!', defaultSaltRounds),
      role: userRoles.lecturers.value
    }
  })

  console.log('Lecturer user created')
}

const userStudentSeeder = async () => {
  const email = 'student@temukampus.com'
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {
    return
  }

  await prisma.user.create({
    data: {
      name: 'Student',
      email: email,
      password: bcrypt.hashSync('student1234!', defaultSaltRounds),
      role: userRoles.students.value
    }
  })

  console.log('Student user created')
}

const locationSeeder = async () => {
  await prisma.location.create({
    data: {
      name: 'Universitas Widyatama',
      address: 'Jl. Cikutra No.204A, Sukapada, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40125'
    }
  })

  console.log('Locations created')
}

const resourceSeeder = async () => {
  await prisma.resource.create({
    data: {
      name: 'Resource 1',
      quantity: 10
    }
  })

  console.log('Resources created')
}

const main = async () => {
  await userAdminSeeder()
  await userLecturerSeeder()
  await userStudentSeeder()
  await locationSeeder()
  await resourceSeeder()
}

main()
  .then(() => {
    console.log('Seeding completed')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
