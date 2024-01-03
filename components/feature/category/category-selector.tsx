'use clinet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  onValueChange?: () => void
  value?: string
}

/* {isLoading && <Loader className='mx-auto animate-spin' /> */

// data.map((category) => (
//   <SelectItem key={category.id} value={category.id}>
//     {category.name}
//   </SelectItem>
// ))

export default function CategorySelector({ onValueChange, value }: Props) {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        <p className='py-4 text-center text-sm text-muted-foreground'>
          no categories found!
        </p>
      </SelectContent>
    </Select>
  )
}
