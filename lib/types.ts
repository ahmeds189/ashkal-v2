import { Product } from '@prisma/client'

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type GetAllProductsArgs = {
  query: string
  category: string | undefined
  limit: number
  page: number
  excludeProductId?: string
}

export type ExtendedProduct = Product & {
  category: {
    id: string
    name: string
  }
  publisher: {
    id: string
    username: string
    firstName: string
    lastName: string
    imageUrl: string
    clerkId: string
    createdAt: Date
    updatedAt: Date
  }
}

export type ProductUpdate = {
  title?: string
  description?: string
  imageUrl?: string
  fileUrl?: string
  price?: string
  isFree?: boolean
  credit?: string | null
  categoryId?: string
  publisherId?: string
}
