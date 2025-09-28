import * as React from 'react'
import { cn } from '../utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'muted'
  size?: 'sm' | 'base' | 'lg'
}

export const Badge = ({ 
  className, 
  variant = 'primary', 
  size = 'sm',
  children,
  ...props 
}: BadgeProps) => {
  
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200'
  
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-800 border border-blue-200',
    secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
    accent: 'bg-coral text-white border border-accent-300',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-orange-100 text-orange-800 border border-orange-200',
    muted: 'bg-purple-100 text-purple-800 border border-purple-200'
  }
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    base: 'px-3 py-1 text-sm', 
    lg: 'px-4 py-1.5 text-base'
  }

  const badgeClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  return (
    <span
      className={badgeClasses}
      {...props}
    >
      {children}
    </span>
  )
}