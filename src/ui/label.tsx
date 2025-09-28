import { cn } from "../utils/cn"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "default" | "required" | "optional"
  size?: "sm" | "base" | "lg"
  children: React.ReactNode
}

const Label = ({
  className,
  variant = "default",
  size = "base",
  children,
  ...props
}: LabelProps) => {
  const baseStyles = "block font-medium text-neutral-700 transition-colors"

  const variantStyles = {
    default: "",
    required: 'after:content-["*"] after:ml-1 after:text-accent-600',
    optional:
      'after:content-["(optional)"] after:ml-2 after:text-neutral-400 after:font-normal after:text-sm'
  }

  const sizeStyles = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg"
  }

  return (
    <label
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}

Label.displayName = "Label"

export { Label }
