import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@prisma/client'

type Props = {
  onValueChange?: () => void
  value?: string
  categoriesList: Category[] | undefined
}

export default function CategorySelector({
  onValueChange,
  value,
  categoriesList,
}: Props) {
  let content

  if (categoriesList && categoriesList.length > 0) {
    content = categoriesList.map((category) => (
      <SelectItem key={category.id} value={category.id}>
        {category.name}
      </SelectItem>
    ))
  } else if (categoriesList === undefined) {
    content = (
      <p className='py-4 text-center text-sm text-muted-foreground'>
        Loading categories...
      </p>
    )
  } else {
    content = (
      <p className='py-4 text-center text-sm text-muted-foreground'>
        No categories found!
      </p>
    )
  }

  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>{content}</SelectContent>
    </Select>
  )
}
