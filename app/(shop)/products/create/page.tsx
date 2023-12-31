import AddCategoryForm from '@/components/feature/category/form'
import FileUploader from '@/components/feature/file-upload/file-uploader'
import AddProductForm from '@/components/feature/product/form'

export default function Page() {
  return (
    <div className='container py-10'>
      <h1 className='pb-2 text-2xl font-bold tracking-tight sm:text-3xl'>
        Publish a Product
      </h1>

      <p className='text-sm text-muted-foreground sm:text-base'>
        Please fill all the field below to publish your product.
      </p>

      {/* TODO: combine all of those in one form */}
      <AddProductForm />
      <AddCategoryForm />
      <FileUploader />
    </div>
  )
}
