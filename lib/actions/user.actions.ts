'use server'
import prisma from '@/prisma/db'
import { handleError } from '../utils'

export async function createUserAction(userData: any) {
  try {
    return await prisma.user.create({ data: userData })
  } catch (error) {
    handleError(error)
  }
}
