'use client'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { X, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Separator } from '../ui/separator'
import NavList from './nav-list'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function MobileSheet() {
  const [open, setOpen] = useState(false)
  const matches = useMediaQuery('(min-width: 640px)')
  useEffect(() => setOpen(false), [matches])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='sm:hidden' onClick={() => setOpen(true)} asChild>
        <Button variant='ghost' size='icon'>
          <span className='sr-only'>open mobile menu</span>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='space-y-6'>
        <header className='flex items-center justify-between'>
          <SignedIn>
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                elements: {
                  rootBox: 'inline-block',
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <span className='me-auto inline-block h-1 w-1' />
          </SignedOut>

          <SheetClose>
            <X />
          </SheetClose>
        </header>

        <Separator />

        <NavList className='space-y-8' isMobile />
      </SheetContent>
    </Sheet>
  )
}
