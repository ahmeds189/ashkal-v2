import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  element?: React.ReactNode
  parentStyles?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const InputWithElements = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { children, className, type, parentStyles, element, icon, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'flex h-10 basis-3/4 items-center gap-1 rounded-md border border-input bg-background px-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none disabled:cursor-wait',
          parentStyles,
        )}>
        {icon}
        <input
          type={type}
          className={cn(
            'flex-1 bg-background text-sm placeholder:text-muted-foreground focus-within:outline-none',
            className,
          )}
          ref={ref}
          {...props}
        />
        {element}
      </div>
    )
  },
)
InputWithElements.displayName = 'InputWithElements'

export { Input, InputWithElements }
