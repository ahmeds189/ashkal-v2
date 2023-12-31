import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' aria-disabled={pending} className='w-full'>
      {pending ? <Loader /> : 'Submit'}
    </Button>
  )
}
