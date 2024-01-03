import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleError(error: unknown) {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: number | string): number | string => {
  const amount = typeof price === 'string' ? parseFloat(price) : price

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return typeof price === 'string' ? formattedPrice : amount
}
