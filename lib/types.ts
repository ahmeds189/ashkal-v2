import { Product } from '@prisma/client'

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type GetAllProductsArgs = {
  query: string
  category: string
  limit: number
  page: number
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
