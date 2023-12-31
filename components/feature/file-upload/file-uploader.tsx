'use client'
import { UploadDropzone } from '@/lib/uploadthing'

export default function FileUploader() {
  return (
    <div>
      <UploadDropzone
        appearance={{
          container:
            'mt-0 rounded-md border border-solid border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        }}
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          console.log('Files: ', res)
          alert('Upload Completed')
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`)
        }}
      />
    </div>
  )
}
