import * as React from "react"
import { cn } from "../utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error" | "success"
  inputSize?: "sm" | "base" | "lg"
  icon?: React.ReactNode
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "base",
      type,
      icon,
      error,
      ...props
    },
    ref
  ) => {
    const hasError = error || variant === "error"

    const baseStyles =
      "flex w-full rounded-xl border bg-white transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

    const variantStyles = {
      default:
        "border-neutral-200 text-secondary-700 focus-visible:border-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-100",
      error:
        "border-accent-500 text-neutral-900 focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-100 bg-accent-50/30",
      success:
        "border-secondary-500 text-neutral-900 focus-visible:border-secondary-600 focus-visible:ring-2 focus-visible:ring-secondary-100 bg-secondary-50/30"
    }

    const sizeStyles = {
      sm: "h-9 px-3 py-2 text-sm",
      base: "h-11 px-4 py-2 text-base",
      lg: "h-12 px-4 py-3 text-lg"
    }

    const iconStyles = icon ? "pl-10" : ""

    const inputClasses = cn(
      baseStyles,
      variantStyles[hasError ? "error" : variant],
      sizeStyles[inputSize],
      iconStyles,
      className
    )

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </div>
        )}
        <input type={type} className={inputClasses} ref={ref} {...props} />
        {error && (
          <p className="mt-1 text-sm text-accent-600 flex items-center gap-1">
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
