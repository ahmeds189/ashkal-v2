import Card from './card'
import { ExtendedProduct } from '@/lib/types'

type Props = {
  data: { products: ExtendedProduct[]; totalPages: number }
  page: number | string
  limit: number
  totalPages?: number
  urlParam?: string
  type?: 'published_products' | 'my_orders' | 'all_products'
}

export default function Collection({
  data: { products },
  page,
  limit,
  totalPages,
  urlParam,
  type,
}: Props) {
  if (products.length > 0) {
    return (
      <section className='py-10'>
        <ul className='grid gap-y-6 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 lg:gap-4'>
          {products.map((product) => (
            <li key={product.id}>
              <Card product={product} />
            </li>
          ))}
        </ul>
      </section>
    )
  }
  return (
    <section className='mt-8 rounded-md bg-secondary py-28 text-center'>
      <h3 className='text-2xl font-bold'>No Products Found</h3>
      <small className='text-muted-foreground'>comeback later!</small>
    </section>
  )
}
