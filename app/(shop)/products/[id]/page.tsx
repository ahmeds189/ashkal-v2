import {
  getAllProductsAction,
  getProductByIdAction,
} from '@/actions/products.actions'
import Collection from '@/components/feature/product/collection'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchParamProps } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export default async function Page({ params: { id } }: SearchParamProps) {
  const product = await getProductByIdAction(id)

  const relatedProducts = await getAllProductsAction({
    query: '',
    category: product?.category.name,
    limit: 3,
    page: 1,
    excludeProductId: product?.id,
  })

  if (product) {
    const {
      title,
      description,
      price,
      category: { name },
      publisher: { firstName, lastName, imageUrl },
      imageUrl: productImageUrl,
      credit,
    } = product
    return (
      <>
        <section className='bg-secondary/40 sm:py-20'>
          <div className='sm:container md:grid md:grid-cols-2 md:gap-4 lg:gap-8'>
            <Image
              src={productImageUrl}
              alt={title}
              width={1000}
              height={1000}
              priority
              className='sm:rounded-md'
            />

            <div className='space-y-5 px-4 pt-5 sm:px-0 md:pt-0'>
              <div className='flex items-center justify-between'>
                <Badge
                  variant='secondary'
                  className='truncate xs:px-5 xs:text-[14px]'>
                  {name}
                </Badge>
                <header className='flex items-center gap-2 text-sm font-semibold capitalize text-muted-foreground'>
                  <span className='relative inline-block h-8 w-8 overflow-hidden rounded-full '>
                    <Image
                      src={imageUrl}
                      alt={`${firstName} ${lastName} avatar`}
                      sizes='(max-width: 768px) 100vw'
                      fill
                    />
                  </span>
                  <span>
                    {firstName} {lastName}
                    {credit && (
                      <>
                        {' | '}
                        <a
                          href={credit}
                          target='_blank'
                          className='text-blue-500'>
                          Credit&#129149;
                        </a>
                      </>
                    )}
                  </span>
                </header>
              </div>
              <h3 className='text-2xl font-semibold'>{title}</h3>
              <p className='text-sm text-muted-foreground'>{description}</p>
              <h4 className='text-2xl font-bold'>{formatPrice(price)}</h4>
              <Button className='w-full'>Add To Cart</Button>
            </div>
          </div>
        </section>

        <section className='container my-10 space-y-4'>
          <h5 className='text-xl font-semibold'>Similar Products</h5>
          {relatedProducts && (
            <Collection data={relatedProducts} limit={3} page={1} />
          )}
        </section>
      </>
    )
  }
}
