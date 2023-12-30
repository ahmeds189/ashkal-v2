'use server'
import prisma from '@/prisma/db'
import { User } from '@prisma/client'
import { handleError } from '../utils'

export async function createUserAction(userData: User) {
  try {
    return await prisma.user.create({ data: userData })
  } catch (error) {
    handleError(error)
  }
}
