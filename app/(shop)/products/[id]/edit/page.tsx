import { getCategoriesAction } from '@/actions/category.actions'
import { getProductByIdAction } from '@/actions/products.actions'
import AddProductForm from '@/components/feature/product/form'
import { SearchParamProps } from '@/lib/types'
import { auth } from '@clerk/nextjs'

export default async function Page({ params: { id } }: SearchParamProps) {
  const { userId } = auth()
  const categoriesList = await getCategoriesAction()
  const productToEdit = await getProductByIdAction(id)

  return (
    <div className='container py-10'>
      <h1 className='pb-2 text-2xl font-bold tracking-tight sm:text-3xl'>
        Edit a Product
      </h1>

      <p className='pb-10 text-sm text-muted-foreground sm:text-base'>
        Please fill all the field below to publish your product.
      </p>

      {productToEdit && (
        <AddProductForm
          userId={userId}
          type='edit'
          categoriesList={categoriesList}
          productToEdit={productToEdit}
          productId={productToEdit.id}
        />
      )}
    </div>
  )
}
