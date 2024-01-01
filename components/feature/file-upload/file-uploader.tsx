'use client'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { MonitorUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type Props = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export default function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: Props) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
      className='cursor-pointer overflow-hidden rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
    >
      <input {...getInputProps()} className='cursor-pointer' />

      {imageUrl ? (
        <img
          src={imageUrl}
          alt='image'
          width={100}
          height={100}
          className='w-full object-cover object-center'
        />
      ) : (
        <div className='py-6 text-center text-muted-foreground'>
          <MonitorUp size={40} className='inline-block' />
          <h3 className='pt-4 font-semibold text-foreground'>
            Drag photo here
          </h3>
          <p className='pb-5 text-xs font-medium'>SVG, PNG, JPG</p>
          <Button
            type='button'
            className='rounded-full'
            size='sm'
            variant='secondary'
          >
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}
