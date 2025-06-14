'use client'

import { ReactNode, useEffect } from 'react'
import { axios } from '@/lib/api/Axios'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter, usePathname } from 'next/navigation'

type UserResponse = {
  user: {
    name: string
    email: string
  }
}

export default function ClientAuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function fetchUser() {
      try {
        await axios.get('sanctum/csrf-cookie')
        const response = await axios.get<UserResponse>('/api/user', { withCredentials: true })
        const user = response.data.user
        if (user) {
          setUser(user)
          if (pathname !== '/dashboard') {
            router.push('/dashboard')
          }
        }
      } catch (error) {
        console.error('ログインエラー:', error)
        logout()
        if (pathname !== '/') {
          router.push('/')
        }
      } finally {
        // useAuthStore.getState().setAuthChecked(true)
      }
    }

    fetchUser()
  }, [setUser, logout, router, pathname])

  return <>{children}</>
}
