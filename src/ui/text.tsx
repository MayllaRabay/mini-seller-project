import * as React from 'react'
import { cn } from '../utils/cn'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'body' | 'caption' | 'small' | 'large' | 'lead'
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'dark'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  as?: 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Text = ({ 
  className, 
  variant = 'body', 
  color = 'primary', 
  weight = 'normal',
  align = 'left',
  as: Component = 'p',
  children,
  ...props 
}: TextProps) => {
  
  const baseStyles = 'transition-colors duration-200'
  
  const variantStyles = {
    body: 'text-base leading-6',
    caption: 'text-sm leading-5',
    small: 'text-xs leading-4',
    large: 'text-lg leading-7',
    lead: 'text-xl leading-8'
  }
  
  const colorStyles = {
    primary: 'text-neutral-900',
    secondary: 'text-neutral-700', 
    muted: 'text-neutral-500',
    accent: 'text-accent-600',
    success: 'text-primary-600',
    warning: 'text-secondary-600',
    error: 'text-accent-600',
    dark: 'text-secondary-900'
  }

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const textClasses = cn(
    baseStyles,
    variantStyles[variant],
    colorStyles[color],
    weightStyles[weight],
    alignStyles[align],
    className
  )

  return (
    <Component
      className={textClasses}
      {...props}
    >
      {children}
    </Component>
  )
}