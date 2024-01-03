'use server'
import { db } from '@/lib/db'
import { handleError } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function addCategoryAction(name: string) {
  try {
    await db.category.create({
      data: {
        name: name,
      },
    })
    revalidatePath('/products/create')
  } catch (error) {
    handleError(error)
  }
}

export async function getCategoriesAction() {
  try {
    return await db.category.findMany()
  } catch (error) {
    handleError(error)
  }
}
