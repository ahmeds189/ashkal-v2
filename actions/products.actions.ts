'use server'
import { db } from '@/lib/db'
import { handleError } from '@/lib/utils'
import { productFormType } from '@/lib/validator'
import { Product } from '@prisma/client'
import { redirect } from 'next/navigation'

export async function createProductAction(
  product: productFormType,
  userId: string | undefined,
) {
  let newProduct: Partial<Product> = {}

  try {
    if (product && userId) {
      newProduct = await db.product.create({
        data: {
          ...product,
          categoryId: product.categoryId,
          publisherId: userId,
        },
      })
      console.log('new product:', newProduct)
    }
  } catch (error) {
    handleError(error)
  }

  if (newProduct !== undefined) redirect(`/products/${newProduct.id}`)
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: id,
      },
      select: {
        category: true,
        publisher: true,
      },
    })
    return product
  } catch (error) {
    handleError(error)
  }
}
