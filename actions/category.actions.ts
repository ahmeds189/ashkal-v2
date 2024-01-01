'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function addCategoryAction(name: string) {
  return await db.category.create({
    data: {
      name: name,
    },
  })
}

export async function getCategoriesAction() {
  const data = await db.category.findMany()
  revalidatePath('/products/create')
  return data
}
