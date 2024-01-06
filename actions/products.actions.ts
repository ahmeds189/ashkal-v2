'use server'
import { db } from '@/lib/db'
import { GetAllProductsArgs } from '@/lib/types'
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
      include: {
        category: true,
        publisher: true,
      },
    })
    return product
  } catch (error) {
    handleError(error)
  }
}

export async function getAllProducts({
  limit = 6,
  query,
  category,
  page,
}: GetAllProductsArgs) {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        category: true,
        publisher: true,
      },
      where: {
        title: query ? { contains: query, mode: 'insensitive' } : undefined,
        category: category ? { name: category } : undefined,
      },
    })

    const totalProducts = await db.product.count({
      where: {
        title: query ? { contains: query, mode: 'insensitive' } : undefined,
        category: category ? { name: category } : undefined,
      },
    })

    const totalPages = Math.ceil(totalProducts / limit)

    return {
      products,
      totalPages,
    }
  } catch (error) {
    handleError(error)
  }
}
