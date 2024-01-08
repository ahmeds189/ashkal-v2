'use client'
import { InputWithElements } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchQuery, 300)
  const router = useRouter()

  useEffect(() => {
    if (!debouncedSearch) {
      router.push('/', { scroll: false })
    } else {
      router.push(`?search=${debouncedSearch}`, { scroll: false })
    }
  }, [router, debouncedSearch])

  return (
    <InputWithElements
      parentStyles='rounded-full px-4 divide-x-2 w-full h-12'
      className='px-2'
      icon={
        <SearchIcon size={18} className='rotate-90 text-muted-foreground' />
      }
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder='What are you looking for?'
    />
  )
}
