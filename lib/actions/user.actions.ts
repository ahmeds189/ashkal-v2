'use server'

import { User } from '@prisma/client'
import { handleError } from '../utils'
import prisma from '@/prisma/db'

export async function createUser(user: User) {
  try {
    const newUser = await prisma.user.create({ data: user })
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}
