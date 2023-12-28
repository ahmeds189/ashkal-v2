import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  return <div className='grid h-svh place-content-center'>{children}</div>
}
