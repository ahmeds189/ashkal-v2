import { NAV_ITEMS } from '@/lib/constants'
import { Shapes } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='container flex justify-between py-9 text-muted-foreground'>
      <div className='flex flex-col gap-2'>
        <Link href='/' className='self-center'>
          <Shapes size={38} />
        </Link>
        <p className='text-sm font-medium'>
          Ashkal inc {new Date().getFullYear()}
        </p>
      </div>

      <ul className='space-y-1 text-sm font-medium'>
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className='transition-colors hover:text-primary'
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
