'use client'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { X, ShoppingCart } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <span className='sr-only'>open cart</span>
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className='space-y-6'>
        <header className='flex items-center justify-between'>
          <p>Cart (0)</p>
          <SheetClose>
            <X />
          </SheetClose>
        </header>
        <Separator />
      </SheetContent>
    </Sheet>
  )
}
