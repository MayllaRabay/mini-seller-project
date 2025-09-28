import { useCallback, useState } from "react"

export interface ToastItem {
  id: string
  message: string
  type: "success" | "error" | "info"
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback(
    (
      message: string,
      type: "success" | "error" | "info" = "info",
      duration: number = 4000
    ) => {
      setToasts((prev) => {
        const isDuplicate = prev.some(
          (toast) => toast.message === message && toast.type === type
        )

        if (isDuplicate) {
          return prev
        }

        const id = Math.random().toString(36).substring(2, 9)
        const newToast: ToastItem = { id, message, type, duration }

        setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id))
        }, duration + 300)

        return [...prev, newToast]
      })
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showSuccess = useCallback(
    (message: string) => {
      addToast(message, "success")
    },
    [addToast]
  )

  const showError = useCallback(
    (message: string) => {
      addToast(message, "error")
    },
    [addToast]
  )

  const showInfo = useCallback(
    (message: string) => {
      addToast(message, "info")
    },
    [addToast]
  )

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo
  }
}
