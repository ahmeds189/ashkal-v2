'use server'

import { db } from '@/lib/db'
import { handleError } from '@/lib/utils'
import { productFormType } from '@/lib/validator'

type CreateEventParams = {
  product: productFormType
  userId: string
}

export async function createProductAction({
  product,
  userId,
}: CreateEventParams) {
  try {
    // get the publisher id
    const productPublisher = await db.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!productPublisher) throw new Error('Publisher not found')

    const newProduct = await db.product.create({
      data: {
        ...product,
        price: parseInt(product.price),
        publisherId: userId,
        categoryId: product.categoryId,
      },
    })

    return JSON.parse(JSON.stringify(newProduct))
  } catch (error) {
    handleError(error)
  }
}
