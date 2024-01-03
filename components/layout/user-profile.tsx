'use client'
import { UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function UserProfile() {
  const [mounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted)
    return (
      <Loader className='animate-spin justify-self-end text-muted-foreground' />
    )

  return (
    <UserButton
      afterSignOutUrl='/'
      appearance={{
        elements: {
          rootBox: 'justify-self-end',
        },
      }}
    />
  )
}
