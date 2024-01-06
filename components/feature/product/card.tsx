import { Badge } from '@/components/ui/badge'
import { ExtendedProduct } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  product: ExtendedProduct
}

export default function Card({ product }: Props) {
  const { id, title, price, imageUrl, category } = product

  return (
    <div className='flex min-h-[22rem] flex-col rounded-lg border p-3 transition-colors hover:bg-secondary md:min-h-[23rem] lg:max-w-[25rem]'>
      <Link
        style={{ backgroundImage: `url(${imageUrl})` }}
        className='max-h- flex-1 rounded-md bg-cover bg-center'
        href={`/products/${id}`}
      />
      <div className='line-clamp-1 space-x-2 truncate whitespace-nowrap py-3'>
        <Badge>{formatPrice(price)}</Badge>
        <Badge variant='secondary'>{category.name}</Badge>
      </div>
      <Link
        href={`/products/${id}`}
        className='line-clamp-2 flex-none self-start font-semibold'>
        {title}
      </Link>
    </div>
  )
}
