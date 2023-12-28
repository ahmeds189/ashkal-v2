import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Shapes } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileSheet from './mobile-sheet'
import UserProfile from './user-profile'
import NavList from './nav-list'

export default function Header() {
  return (
    <header>
      <div className='container grid grid-cols-[auto_1fr_32px] items-center justify-items-center gap-2 py-4'>
        <Link href='/' className='mr-auto block w-fit sm:mr-0'>
          <span className='sr-only'>click to home page</span>
          <Shapes className='h-9 w-9' />
        </Link>

        <NavList className='hidden gap-6 sm:flex' />

        <SignedOut>
          <Link
            href='sign-in'
            className={cn(buttonVariants({ size: 'sm' }), 'rounded-full px-7')}
          >
            Sign in
          </Link>
        </SignedOut>

        <UserProfile />

        <MobileSheet />
      </div>
    </header>
  )
}
