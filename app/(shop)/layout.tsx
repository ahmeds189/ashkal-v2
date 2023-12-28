import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { PropsWithChildren } from 'react'

export default function ShopLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex h-svh flex-col'>
      <Header />
      <main className='flex-1 border-y'>{children}</main>
      <Footer />
    </div>
  )
}
