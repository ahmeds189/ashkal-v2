import { getProductById } from '@/actions/products.actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchParamProps } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export default async function Page({ params: { id } }: SearchParamProps) {
  const product = await getProductById(id)

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
        <div className='sm:container sm:py-10 md:grid md:grid-cols-2 md:gap-4 lg:gap-8'>
          <Image
            src={productImageUrl}
            alt={title}
            width={1000}
            height={1000}
            priority
            className='sm:rounded-md'
          />

          <div className='container space-y-5 pt-5 md:p-0'>
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

        <div className='container'>
          <h5>Similar Products</h5>
        </div>
      </>
    )
  }
}
