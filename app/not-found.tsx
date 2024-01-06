import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='grid h-svh place-content-center space-y-2 text-center text-lg font-semibold'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/'>Return Home</Link>
    </div>
  )
}
