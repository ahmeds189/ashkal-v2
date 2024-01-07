import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z.string().min(3).max(15),
})
export type categoryFormType = z.infer<typeof categoryFormSchema>

export const productFormSchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .min(5, 'Title must be at least 5 characters long.')
    .max(70, 'Title cannot exceed 100 characters.'),
  description: z
    .string({ required_error: 'Description is required.' })
    .min(10, 'Description must be at least 10 characters long.')
    .max(600, 'Description cannot exceed 600 characters.'),
  imageUrl: z
    .string({ required_error: 'Image URL is required.' })
    .url('Invalid URL format for Image.'),
  fileUrl: z
    .string({ required_error: 'File URL is required.' })
    .url('Invalid URL format for File.'),
  price: z
    .string({
      required_error: 'Price is required.',
      invalid_type_error: 'Price is required.',
    })
    .min(1, 'Price must be at least 1.'),
  isFree: z.boolean().default(false),
  credit: z.string().url('Invalid URL format for Credit.').optional(),
  categoryId: z
    .string({ required_error: 'Category is required.' })
    .min(1, 'Category must be at least 1 character long.'),
})

export type productFormType = z.infer<typeof productFormSchema>
