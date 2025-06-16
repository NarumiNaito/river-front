'use client'

import { ReactNode, useEffect } from 'react'
import { useToaster } from '@/hooks/useToaster'
import { setupAxiosInterceptors } from '@/lib/api/axiosInterceptors'

export function AxiosClientProvider({ children }: { children: ReactNode }) {
  const { toast } = useToaster()

  useEffect(() => {
    const eject = setupAxiosInterceptors(toast)
    return () => {
      eject()
    }
  }, [toast])

  return <>{children}</>
}
