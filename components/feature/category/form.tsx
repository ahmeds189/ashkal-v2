'use client'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryFormSchema, categoryFormType } from '@/lib/validator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { addCategoryAction } from '@/actions/category.actions'

export default function AddCategoryForm() {
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm<categoryFormType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: categoryFormType) {
    console.log(values)
    form.reset()
    setOpenDialog(false)
    toast.success('category added successfully!')
    await addCategoryAction(values.name)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size='icon'>
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='-translate-y-2'>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Icons' {...field} />
                  </FormControl>
                  <span className='block min-h-5'>
                    <FormMessage className='text-red-500' />
                  </span>
                </FormItem>
              )}
            />
            <Button type='submit' disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
