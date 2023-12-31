import { Star } from 'lucide-react'

export default function HeroLabel() {
  return (
    <a
      href='https://github.com/ahmeds189'
      target='_blank'
      className='flex w-fit items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-violet-500 ring-1 ring-inset ring-primary/50 sm:mx-auto'
    >
      <span>Star us on Github</span>
      <Star size={18} />
    </a>
  )
}
