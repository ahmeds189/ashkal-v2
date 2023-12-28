'use client'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

export default function UserProfile() {
  const [mounted, setIsMounted] = useState(false)

  useInterval(() => setIsMounted(true), 1000)

  if (!mounted)
    return (
      <Loader className='animate-spin justify-self-end text-muted-foreground' />
    )

  return (
    <SignedIn>
      <UserButton
        afterSignOutUrl='/'
        appearance={{
          elements: {
            rootBox: 'justify-self-end',
          },
        }}
      />
    </SignedIn>
  )
}
