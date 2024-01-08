import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { currentUser } from '@clerk/nextjs'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if (!user) throw new Error('Unauthorized')

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
