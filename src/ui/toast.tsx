import { useEffect, useState } from "react"
import { cn } from "../utils/cn"
import { Button } from "./button"
import { Text } from "./text"

export interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose?: () => void
}

export function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const typeStyles = {
    success: "bg-primary-500 text-white border-primary-600",
    error: "bg-accent-500 text-white border-accent-600",
    info: "bg-primary-100 text-white border-primary-200"
  }

  const iconMap = {
    success: "✅",
    error: "❌",
    info: "ℹ️"
  }

  const handleOnClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  return (
    <div
      className={cn(
        "relative max-w-sm w-full",
        "border rounded-xl shadow-soft p-4 flex items-start gap-3",
        "transition-all duration-300 ease-in-out",
        typeStyles[type],
        isLeaving
          ? "transform translate-x-full opacity-0"
          : "transform translate-x-0 opacity-100"
      )}
    >
      <div className="flex justify-between items-center gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="text-md flex-shrink-0 mt-0.5">{iconMap[type]}</div>
          <Text
            variant="caption"
            weight="semibold"
            className="leading-5 text-white"
          >
            {message}
          </Text>
        </div>
        <Button
          onClick={handleOnClose}
          variant="ghost"
          size="sm"
          className="text-white hover:text-neutral-600 hover:bg-neutral-100 focus-visible:ring-0 p-1"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}
