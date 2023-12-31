'use server'

import { db } from '@/lib/db'

export async function addCategoryAction(name: string) {
  try {
    await db.category.create({
      data: {
        name: name,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export async function getCategoriesAction() {
  try {
    return await db.category.findMany()
  } catch (error) {
    console.log(error)
  }
}
