'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCategoryForm } from '@/lib/store'
import { categoryFormSchema, categoryFormType } from '@/lib/validator'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { addCategoryAction } from '@/actions/category.actions'
import { toast } from 'sonner'

export default function AddCategoryForm() {
  const { isOpen, onClose } = useCategoryForm()

  const form = useForm<categoryFormType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (isOpen === false) form.reset()
  }, [form, isOpen])

  async function onSubmit(value: categoryFormType) {
    await addCategoryAction(value.name)
    onClose()
    form.reset()
    toast.success('ok')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='mb-2 -translate-y-1'>
          <DialogTitle>Add new Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Icon' {...field} />
                  </FormControl>
                  <span className='block h-5 pt-[8px]'>
                    <FormMessage />
                  </span>
                </FormItem>
              )}
            />
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
