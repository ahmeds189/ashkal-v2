'use server'
import { db } from '@/lib/db'
import { GetAllProductsArgs, ProductUpdate } from '@/lib/types'
import { handleError } from '@/lib/utils'
import { productFormType } from '@/lib/validator'
import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'
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

export async function getProductByIdAction(id: string) {
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

export async function getAllProductsAction({
  limit = 6,
  query,
  category,
  page,
  excludeProductId,
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
        id: excludeProductId
          ? { not: { equals: excludeProductId } }
          : undefined,
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

export async function deleteProductByIdAction(id: string) {
  try {
    const product = await db.product.delete({
      where: {
        id: id,
      },
    })
    if (product) revalidatePath('/')
  } catch (error) {
    handleError(error)
  }
}

export async function updateProductAction(
  userId: string,
  product: ProductUpdate,
  productId: string,
) {
  try {
    if (!product) throw new Error('Product not found')
    if (!userId) throw new Error('Unauthorized')
    if (product && userId) {
      await db.product.update({
        where: {
          id: productId,
        },
        data: {
          ...product,
        },
      })
    }
    revalidatePath(`/products/${productId}/edit`)
  } catch (error) {
    handleError(error)
  }
}
