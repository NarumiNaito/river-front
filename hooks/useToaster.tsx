import { useToastStore } from '@/stores/useToastStore'

export type ToastOptions = {
  title: string
  description?: string
  variant?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export function useToaster() {
  const showToast = useToastStore((state) => state.showToast)

  return {
    toast: ({
      title,
      description,
      variant = 'info',
      duration = 6000,
    }: {
      title: string
      description?: string
      variant?: 'success' | 'error' | 'info' | 'warning'
      duration?: number
    }) => {
      const message = description ? `${title}: ${description}` : title
      showToast(message, variant, duration)
    },
  }
}
