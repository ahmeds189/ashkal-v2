import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { Shapes, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileSheet from './mobile-sheet'
import UserProfile from './user-profile'
import NavList from './nav-list'
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header>
      <div className='container flex items-center justify-between gap-2 py-4'>
        <Link href='/' className='block w-fit'>
          <span className='sr-only'>click to home page</span>
          <Shapes className='h-9 w-9' />
        </Link>

        <NavList className='hidden gap-6 sm:flex' />

        <div className='grid grid-cols-3 items-center justify-items-center gap-1'>
          <SignedOut>
            <Link
              href='sign-in'
              className={cn(
                buttonVariants({ size: 'sm' }),
                'rounded-full px-7',
              )}>
              Sign in
            </Link>
          </SignedOut>

          <ThemeToggle />

          <Button size='icon' variant='ghost'>
            <ShoppingCart />
          </Button>

          <SignedIn>
            <UserProfile />
          </SignedIn>

          <MobileSheet />
        </div>
      </div>
    </header>
  )
}
