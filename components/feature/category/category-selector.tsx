'use clinet'
import { getCategoriesAction } from '@/actions/category.actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

type Props = {
  onValueChange?: () => void
  value?: string
}

export default function CategorySelector({ onValueChange, value }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoriesAction(),
  })

  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent className={cn(isLoading && 'py-4')}>
        {isLoading && <Loader className='mx-auto animate-spin' />}
        {data &&
          data.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
