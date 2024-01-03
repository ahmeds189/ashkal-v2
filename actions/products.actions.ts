'use server'
import { db } from '@/lib/db'
import { handleError } from '@/lib/utils'
import { productFormType } from '@/lib/validator'
import { Category, User } from '@prisma/client'

export async function createProductAction(
  product: productFormType,
  userId: string | undefined,
) {
  const product_publisher: User | null = await db.user.findUnique({
    where: {
      id: userId,
    },
  })

  console.log(product_publisher)

  const product_category: Category | null = await db.category.findUnique({
    where: {
      id: product.categoryId,
    },
  })

  try {
    if (product_publisher && product_category) {
      console.log('product:', product)
      console.log('publisher:', product_publisher)
      console.log('category:', product_category)
    }
  } catch (error) {
    handleError(error)
  }
}
