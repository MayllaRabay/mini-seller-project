import * as React from "react"
import { cn } from "../utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "base" | "lg" | "xl"
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "base",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"

    const variantStyles = {
      primary:
        "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 shadow-soft hover:shadow-medium",
      secondary:
        "bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500 shadow-soft hover:shadow-medium",
      outline:
        "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 bg-white hover:border-primary-600",
      ghost:
        "text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 hover:text-primary-700",
      danger:
        "bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500 shadow-soft hover:shadow-medium"
    }

    const sizeStyles = {
      sm: "h-8 px-3 text-sm gap-1.5",
      base: "h-10 px-4 py-2 text-base gap-2",
      lg: "h-11 px-6 py-2 text-base gap-2",
      xl: "h-12 px-8 py-3 text-lg gap-2.5"
    }

    const isDisabled = disabled || isLoading

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}

        {children}

        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
