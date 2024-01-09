import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExtendedProduct } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { PenSquare } from 'lucide-react'
import Link from 'next/link'
import DeleteProduct from './delete-product'
import { Badge } from '@/components/ui/badge'

type Props = {
  product: ExtendedProduct
}

export default function Card({ product }: Props) {
  const {
    id,
    title,
    price,
    imageUrl: productImageUrl,
    category,
    publisher: { firstName, lastName, id: publisherId },
  } = product
  const { userId } = auth()
  const isProductPublisher = userId === publisherId

  return (
    <div className='group relative grid min-h-[22rem] grid-rows-[15rem_1fr] flex-col rounded-xl border text-start shadow-sm transition-colors hover:bg-secondary/40 md:min-h-[24rem] lg:max-w-[24rem]'>
      <Link
        style={{ backgroundImage: `url(${productImageUrl})` }}
        className='block rounded-t-md bg-cover bg-center'
        href={`/products/${id}`}
      />
      {isProductPublisher && (
        <div className='absolute right-2 top-2 flex flex-col gap-y-2 rounded-md bg-secondary p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100'>
          <Link
            href={`/products/${id}/edit`}
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'h-9 w-9 hover:bg-secondary-foreground/20',
            })}>
            <PenSquare size={18} />
          </Link>
          <Separator className='bg-gray-500' />
          <DeleteProduct productId={id} />
        </div>
      )}
      <div className='flex flex-col gap-2 p-3'>
        <div className='space-x-2 whitespace-nowrap'>
          <Badge className='bg-emerald-100 text-green-600 hover:bg-emerald-100'>
            {formatPrice(price)}
          </Badge>
          <Badge variant='secondary'>{category.name}</Badge>
        </div>
        <Link
          href={`/products/${product.id}`}
          className='line-clamp-2 flex-1 font-bold'>
          {title}
        </Link>
        <p className='text-xs font-semibold capitalize text-muted-foreground'>
          {firstName} {lastName}
        </p>
      </div>
    </div>
  )
}
