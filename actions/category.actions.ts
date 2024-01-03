'use server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function addCategoryAction(name: string) {
  await db.category.create({
    data: {
      name: name,
    },
  })
  revalidatePath('/products/create')
}

export async function getCategoriesAction() {
  const data = await db.category.findMany()
  return data
}
