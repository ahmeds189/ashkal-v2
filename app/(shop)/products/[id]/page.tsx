import { getProductById } from '@/actions/products.actions'
import { SearchParamProps } from '@/lib/types'

export default async function Page({ params: { id } }: SearchParamProps) {
  const product = await getProductById(id)

  if (product) console.log(product)

  return <div className='container py-10'>Page</div>
}
