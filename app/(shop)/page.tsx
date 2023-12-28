import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <section>
        <div className='container text-balance py-10 text-start sm:text-center'>
          <a
            href='https://github.com/ahmeds189'
            target='_blank'
            className='flex w-fit items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-violet-500 ring-1 ring-inset ring-primary/50 sm:mx-auto'
          >
            <span>Star us on Github</span>
            <Star size={18} />
          </a>

          <h1 className='py-6 text-3xl font-bold tracking-tight sm:text-4xl'>
            Unleash Creativity with Ashkal, Your{' '}
            <span className='bg-gradient-to-r from-primary to-blue-600  bg-clip-text text-transparent '>
              Assets Gateway.
            </span>
          </h1>

          <p className='pb-8 text-sm leading-7 text-muted-foreground sm:text-base'>
            Embark on a visual journey with Ashkal, where every click brings you
            closer to a world of endless creative possibilities. Explore,
            create, and shape the digital stories of tomorrow.
          </p>

          <Link
            href='/'
            className={cn(
              buttonVariants(),
              'rounded-full px-14 text-sm font-semibold shadow-sm',
            )}
          >
            Explorer now
          </Link>
        </div>
      </section>
    </>
  )
}
