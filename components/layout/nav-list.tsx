'use client'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
  isMobile?: boolean
}

export default function NavList({ className, isMobile }: Props) {
  const pathname = usePathname()

  return (
    <ul className={cn('font-medium', className)}>
      {NAV_ITEMS.map((item) => (
        <li key={item.path}>
          <Link
            href={item.path}
            className={cn(
              'transition-colors hover:text-primary',
              pathname === item.path && 'text-primary',
              isMobile && 'flex items-center',
            )}
          >
            <item.icon size={22} className='me-4 sm:hidden' />
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
