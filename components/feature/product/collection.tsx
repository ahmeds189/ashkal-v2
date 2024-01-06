import Card from './card'
import { ExtendedProduct } from '@/lib/types'

type Props = {
  data: { products: ExtendedProduct[]; totalPages: number }
  emptyTitle: string
  subTitle: string
  page: number | string
  limit: number
  totalPages?: number
  urlParam?: string
  type?: 'published_products' | 'my_orders' | 'all_products'
}

export default function Collection({
  data: { products },
  emptyTitle,
  subTitle,
  page,
  limit,
  totalPages,
  urlParam,
  type,
}: Props) {
  return (
    <section className='text-start'>
      {products.length > 0 ? (
        <div className='py-10'>
          <ul className='grid gap-y-6 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 lg:gap-4'>
            {products.map((product) => (
              <li key={product.id}>
                <Card product={product} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>{emptyTitle}</h3>
          <p>{subTitle}</p>
        </div>
      )}
    </section>
  )
}
