'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productFormSchema, productFormType } from '@/lib/validator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input, InputWithElements } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import CategorySelector from '../category/category-selector'
import AddCategoryForm from '../category/form'
import FileUploader from '../file-upload/file-uploader'
import { useState } from 'react'
import { Banknote, Figma, Link2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { createProductAction } from '@/actions/products.actions'

type Props = {
  userId: string | null
  type: 'create' | 'edit'
}

export default function AddProductForm({ userId, type }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing('imageUploader')
  const router = useRouter()

  const form = useForm<productFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      fileUrl: '',
      price: '',
      isFree: false,
      credit: '',
      categoryId: '',
    },
  })

  async function onSubmit(values: productFormType) {
    // form.reset()
    let submittedData

    // upload the image
    if (files.length > 0) {
      const uploadImage = await startUpload(files)

      if (uploadImage) {
        submittedData = { ...values, imageUrl: uploadImage[0].url }
      }
    }

    // submit the product
    if (type === 'create' && userId && submittedData) {
      try {
        const newProduct = await createProductAction({
          product: submittedData,
          userId: userId,
        })

        if (newProduct) {
          form.reset()
          router.push(`/products/${newProduct.id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <div className='sm:grid sm:grid-cols-2 sm:gap-2 md:gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Product Title*' {...field} />
                </FormControl>
                <span className='block h-5 pt-[5px]'>
                  <FormMessage />
                </span>
              </FormItem>
            )}
          />
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormControl>
                    <CategorySelector
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <span className='block h-5 pt-[5px]'>
                    <FormMessage />
                  </span>
                </FormItem>
              )}
            />
            <AddCategoryForm />
          </div>
        </div>
        <div className='sm:grid sm:grid-cols-2 sm:justify-stretch sm:gap-2 md:gap-4'>
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <span className='block h-5 pt-[5px]'>
                  <FormMessage />
                </span>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className='h-[calc(100%-20px)] resize-none'
                    placeholder='Product Description*'
                  />
                </FormControl>
                <span className='block h-5 pt-[5px]'>
                  <FormMessage />
                </span>
              </FormItem>
            )}
          />
        </div>
        <div className='sm:grid sm:grid-cols-2 sm:gap-2 md:gap-4'>
          <FormField
            control={form.control}
            name='fileUrl'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithElements
                    icon={
                      <Link2
                        size={18}
                        className='hidden text-muted-foreground xs:block'
                      />
                    }
                    placeholder='File Url*'
                    {...field}
                  />
                </FormControl>
                <span className='block h-5 pt-[5px]'>
                  <FormMessage />
                </span>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithElements
                    icon={
                      <Banknote
                        size={18}
                        className='hidden text-muted-foreground xs:block'
                      />
                    }
                    element={
                      <FormField
                        control={form.control}
                        name='isFree'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Checkbox
                                  id='isFree'
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                                <label
                                  htmlFor='isFree'
                                  className='whitespace-nowrap'
                                >
                                  Free
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    }
                    placeholder='Price*'
                    type='number'
                    {...field}
                  />
                </FormControl>
                <span className='block h-5 pt-[5px]'>
                  <FormMessage />
                </span>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='credit'
          render={({ field }) => (
            <FormItem className='sm:w-1/2'>
              <FormControl>
                <InputWithElements
                  icon={
                    <Figma
                      size={18}
                      className='hidden shrink-0 text-muted-foreground xs:block'
                    />
                  }
                  placeholder='Credit Url'
                  {...field}
                />
              </FormControl>
              <span className='block h-5 pt-[5px]'>
                <FormMessage />
              </span>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='w-full capitalize sm:w-1/2'
        >
          {form.formState.isSubmitting ? 'submitting...' : `${type} product`}
        </Button>
      </form>
    </Form>
  )
}
