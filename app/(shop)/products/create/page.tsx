import { getCategoriesAction } from '@/actions/category.actions'
import AddCategoryForm from '@/components/feature/category/form'
import AddProductForm from '@/components/feature/product/form'
import { auth } from '@clerk/nextjs'

export default async function Page() {
  // get categories list and pass it to category selector component
  const categoriesList = await getCategoriesAction()
  const { userId } = auth()

  return (
    <div className='container py-10'>
      <h1 className='pb-2 text-2xl font-bold tracking-tight sm:text-3xl'>
        Publish a Product
      </h1>

      <p className='pb-10 text-sm text-muted-foreground sm:text-base'>
        Please fill all the field below to publish your product.
      </p>
      <AddProductForm
        type='create'
        categoriesList={categoriesList}
        userId={userId}
      />
      <AddCategoryForm />
    </div>
  )
}
