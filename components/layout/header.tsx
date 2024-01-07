import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { Shapes, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileSheet from './mobile-sheet'
import UserProfile from './user-profile'
import NavList from './nav-list'
import Cart from './cart'

export default function Header() {
  return (
    <header>
      <div className='container grid grid-cols-[auto_1fr] items-center gap-2 py-4 sm:grid-cols-[10rem_1fr_10rem]'>
        <Link href='/' className='block w-fit'>
          <span className='sr-only'>click to home page</span>
          <Shapes className='h-9 w-9' />
        </Link>

        <NavList className='hidden gap-6 sm:flex sm:justify-self-center' />

        <div className='flex items-center gap-1 justify-self-end'>
          <SignedOut>
            <Link
              href='sign-in'
              className={cn(
                buttonVariants({ size: 'sm' }),
                'rounded-full px-4 sm:px-7',
              )}>
              Sign in
            </Link>
          </SignedOut>

          <SignedIn>
            <UserProfile />
          </SignedIn>

          <Cart />

          <MobileSheet />
        </div>
      </div>
    </header>
  )
}
