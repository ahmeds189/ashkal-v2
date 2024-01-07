'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Banknote, Figma, Link2, PlusCircle } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import CategorySelector from '../category/category-selector'
import FileUploader from '../file-upload/file-uploader'
import {
  createProductAction,
  updateProductAction,
} from '@/actions/products.actions'
import { useCategoryForm } from '@/lib/store'
import { Category, Product } from '@prisma/client'
import { uploadFiles, useUploadThing } from '@/lib/uploadthing'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
  userId: string | undefined
  type: 'create' | 'edit'
  categoriesList: Category[] | undefined
  productToEdit?: Product
  productId?: string
}

export default function AddProductForm({
  userId,
  type,
  categoriesList,
  productToEdit,
  productId,
}: Props) {
  const [files, setFiles] = useState<File[]>([])
  const { onOpen, isOpen } = useCategoryForm()
  const { startUpload } = useUploadThing('imageUploader')
  const router = useRouter()

  const form = useForm<productFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: productToEdit?.title ?? '',
      description: productToEdit?.description ?? '',
      imageUrl: productToEdit?.imageUrl ?? '',
      fileUrl: productToEdit?.fileUrl ?? '',
      price: productToEdit?.price ?? '',
      isFree: productToEdit?.isFree ?? false,
      credit: productToEdit?.credit ?? '',
      categoryId: productToEdit?.categoryId ?? '',
    },
  })

  async function onSubmit(product: productFormType) {
    let uploadedImageUrl = product.imageUrl

    if (files.length > 0) {
      const uploadImages = await startUpload(files)

      if (!uploadImages) return

      uploadedImageUrl = uploadImages[0].url
    }

    if (type === 'create') {
      try {
        await createProductAction(
          {
            ...product,
            imageUrl: uploadedImageUrl,
          },
          userId,
        )
        form.reset()
        toast.success('Product published successfully')
      } catch (error) {
        console.log(error)
      }
    }

    if (type === 'edit' && userId && product && productId) {
      try {
        await updateProductAction(userId, product, productId)
        form.reset()
        toast.success('Product updated successfully')
        router.push(`/products/${productId}`)
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
                  <Input {...field} placeholder='Product Title*' />
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
                      categoriesList={categoriesList}
                    />
                  </FormControl>
                  <span className='block h-5 pt-[5px]'>
                    <FormMessage />
                  </span>
                </FormItem>
              )}
            />
            <Button
              type='button'
              size='icon'
              variant='outline'
              onClick={onOpen}>
              <PlusCircle />
            </Button>
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
                    {...field}
                    icon={
                      <Link2
                        size={18}
                        className='hidden flex-none text-muted-foreground xs:block'
                      />
                    }
                    placeholder='File Url*'
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
                    {...field}
                    icon={
                      <Banknote
                        size={18}
                        className='hidden flex-none text-muted-foreground xs:block'
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
                                  className='whitespace-nowrap'>
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
                  {...field}
                  icon={
                    <Figma
                      size={18}
                      className='hidden flex-none shrink-0 text-muted-foreground xs:block'
                    />
                  }
                  placeholder='Credit Url'
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
          disabled={form.formState.isSubmitting || isOpen}
          className='w-full capitalize sm:w-1/2'>
          {form.formState.isSubmitting ? 'submitting...' : `${type} product`}
        </Button>
      </form>
    </Form>
  )
}
