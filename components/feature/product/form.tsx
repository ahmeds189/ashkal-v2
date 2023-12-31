'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryFormSchema, categoryFormType } from '@/lib/validator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AddProductForm() {
  const form = useForm<categoryFormType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: categoryFormType) {
    console.log(values)
    form.reset()
  }

  return (
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
  )
}
