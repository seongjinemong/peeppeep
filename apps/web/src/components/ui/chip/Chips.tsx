import { PropsWithChildren } from 'react'

import { cn } from '../../../utils'

interface ChipProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  variant?: 'default' | 'outlined' | 'filled'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  selected?: boolean
  disabled?: boolean
}

export function Chip({
  children,
  variant = 'default',
  size = 'md',
  selected = false,
  disabled = false,
  className,
  ...props
}: ChipProps) {
  const variantStyles = {
    default: 'bg-background-primary border border-border',
    outlined: 'border border-border hover:bg-background-gray',
    filled: 'bg-secondary text-background-primary hover:bg-primary'
  }

  const sizeStyles = {
    xs: 'md:px-2 px-1 md:py-1.5 py-1 text-xs md:text-sm text-secondary',
    sm: 'md:px-4 px-2 md:py-1.5 py-1 text-sm md:text-lg ',
    md: 'md:px-4 px-2 md:py-3 py-2 text-base md:text-lg text-secondary',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <div
      className={cn(
        'rounded-xl inline-flex items-center justify-center gap-2 cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        selected && 'bg-primary text-background-primary',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
