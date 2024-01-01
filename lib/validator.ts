import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z.string().min(3).max(15),
})

export type categoryFormType = z.infer<typeof categoryFormSchema>

export const productFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(400),
  imageUrl: z.string().url(),
  fileUrl: z.string().url(),
  price: z.string().min(1),
  isFree: z.boolean().default(false),
  credit: z.string().optional(),
  categoryId: z.string().min(1),
})

export type productFormType = z.infer<typeof productFormSchema>
