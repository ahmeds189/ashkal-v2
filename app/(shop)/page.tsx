import Link from 'next/link'
import { getAllProductsAction } from '@/actions/products.actions'
import HeroLabel from '@/components/layout/hero-label'
import Collection from '@/components/feature/product/collection'
import { buttonVariants } from '@/components/ui/button'
import Search from '@/components/feature/product/search'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { search, category } = searchParams

  const products = await getAllProductsAction({
    query: search ? search.trim() : '',
    category: category,
    page: 1,
    limit: 6,
  })

  return (
    <>
      <section className='container text-balance py-16 text-start sm:text-center'>
        <HeroLabel />
        <h1 className='py-6 text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[3.5rem]'>
          Unleash Creativity with Ashkal, Your{' '}
          <span className='bg-gradient-to-r from-primary to-blue-600  bg-clip-text text-transparent'>
            Assets Gateway.
          </span>
        </h1>
        <p className='pb-8 text-sm leading-7 text-muted-foreground sm:text-base'>
          Embark on a visual journey with Ashkal, where every click brings you
          closer to a world of endless creative possibilities. Explore, create,
          and shape the digital stories of tomorrow.
        </p>
        <Link
          href='/'
          className={buttonVariants({
            className: '!rounded-full !px-14 !shadow-sm',
          })}>
          Explorer now
        </Link>
      </section>

      <section className='container space-y-8 py-10'>
        <h2 className='line-clamp-2 text-2xl font-bold sm:leading-[2.5rem]'>
          Explore Limitless <br /> Possibilities with Ashkal
        </h2>
        <Search />
        {products && (
          <Collection data={products} limit={6} page={1} totalPages={2} />
        )}
      </section>
    </>
  )
}
