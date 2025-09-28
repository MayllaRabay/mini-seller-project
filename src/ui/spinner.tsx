import * as React from 'react'
import { cn } from '../utils/cn'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'base' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'neutral'
}

export const Spinner = ({ 
  className, 
  size = 'base',
  color = 'primary',
  ...props 
}: SpinnerProps) => {
  
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    base: 'h-6 w-6 border-2', 
    lg: 'h-8 w-8 border-2',
    xl: 'h-12 w-12 border-4'
  }
  
  const colorStyles = {
    primary: 'border-primary-500 border-t-transparent',
    secondary: 'border-secondary-500 border-t-transparent',
    neutral: 'border-neutral-400 border-t-transparent'
  }

  const spinnerClasses = cn(
    'animate-spin rounded-full',
    sizeStyles[size],
    colorStyles[color],
    className
  )

  return (
    <div
      className={spinnerClasses}
      {...props}
    />
  )
}