import { buttonVariants } from '@/components/ui/button'
import HeroLabel from '@/components/layout/hero-label'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='container text-balance py-10 text-start sm:text-center'>
      <HeroLabel />

      <h1 className='py-6 text-3xl font-bold tracking-tight sm:text-4xl'>
        Unleash Creativity with Ashkal, Your{' '}
        <span className='bg-gradient-to-r from-primary to-blue-600  bg-clip-text text-transparent '>
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
        })}
      >
        Explorer now
      </Link>
    </div>
  )
}
