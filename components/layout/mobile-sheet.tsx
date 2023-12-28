'use client'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { X, Menu, Shapes } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Separator } from '../ui/separator'
import NavList from './nav-list'

export default function MobileSheet() {
  const [open, setOpen] = useState(false)
  const matches = useMediaQuery('(min-width: 640px)')
  useEffect(() => setOpen(false), [matches])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='sm:hidden' onClick={() => setOpen(true)}>
        <span className='sr-only'>open mobile menu</span>
        <Menu size={27} />
      </SheetTrigger>
      <SheetContent className='space-y-6'>
        <header className='flex items-center justify-between'>
          <Shapes className='h-9 w-9' />
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
