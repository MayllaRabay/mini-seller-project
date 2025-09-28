import * as React from "react"
import { cn } from "../utils/cn"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "default" | "error" | "success"
  selectSize?: "sm" | "base" | "lg"
  placeholder?: string
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant = "default",
      selectSize = "base",
      children,
      placeholder,
      error,
      ...props
    },
    ref
  ) => {
    const hasError = error || variant === "error"

    const baseStyles =
      "flex w-full rounded-xl border bg-white transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer hover:bg-secondary-50"

    const variantStyles = {
      default:
        "border-neutral-200 text-secondary-600 hover:border-secondary-300 focus-visible:border-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-100",
      error:
        "border-accent-500 text-neutral-900 focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-100 bg-accent-50/30 hover:bg-accent-50/50",
      success:
        "border-secondary-500 text-neutral-900 focus-visible:border-secondary-600 focus-visible:ring-2 focus-visible:ring-secondary-100 bg-secondary-50/30 hover:bg-secondary-50/50"
    }

    const sizeStyles = {
      sm: "h-9 px-3 py-2 text-sm pr-8",
      base: "h-11 px-4 py-2 text-base pr-10",
      lg: "h-12 px-4 py-3 text-lg pr-10"
    }

    const selectClasses = cn(
      baseStyles,
      variantStyles[hasError ? "error" : variant],
      sizeStyles[selectSize],
      className
    )

    return (
      <div className="relative">
        <select className={selectClasses} ref={ref} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
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

Select.displayName = "Select"

export { Select }
