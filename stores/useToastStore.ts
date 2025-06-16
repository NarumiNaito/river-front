import { create } from 'zustand'

type ToastSeverity = 'success' | 'error' | 'info' | 'warning'

type ToastState = {
  open: boolean
  message: string
  severity: ToastSeverity
  duration: number
  showToast: (message: string, severity?: ToastSeverity, duration?: number) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  duration: 6000,
  showToast: (message, severity = 'info', duration = 6000) =>
    set({ open: true, message, severity, duration }),
  hideToast: () => set({ open: false }),
}))
