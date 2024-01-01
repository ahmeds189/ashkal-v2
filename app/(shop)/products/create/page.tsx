import AddProductForm from '@/components/feature/product/form'
import { auth } from '@clerk/nextjs'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default async function Page() {
  const { userId }: { userId: string | null } = auth()

  return (
    <div className='container py-10'>
      <h1 className='pb-2 text-2xl font-bold tracking-tight sm:text-3xl'>
        Publish a Product
      </h1>

      <p className='pb-10 text-sm text-muted-foreground sm:text-base'>
        Please fill all the field below to publish your product.
      </p>
      <AddProductForm userId={userId} type='create' />

      <ReactQueryDevtools />
    </div>
  )
}
