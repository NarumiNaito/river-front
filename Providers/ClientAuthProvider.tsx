'use client'

import { ReactNode, useEffect } from 'react'
import { axios } from '@/lib/api/Axios'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter, usePathname } from 'next/navigation'
import { useLoadingStore } from '@/stores/useLoadingStore'
import Loader from '@/components/Loader'

type UserResponse = {
  user: {
    name: string
    email: string
  }
}

export default function ClientAuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked)
  const showLoading = useLoadingStore((state) => state.show)
  const hideLoading = useLoadingStore((state) => state.hide)
  const isLoading = useLoadingStore((state) => state.isLoading)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function fetchUser() {
      if (['/', '/login', '/register'].includes(pathname)) {
        setAuthChecked(true)
        hideLoading()
        return
      }
      try {
        await axios.get('sanctum/csrf-cookie')
        const res = await axios.get<UserResponse>('/api/user', { withCredentials: true })
        setUser(res.data.user)
        if (res.data.user && pathname === '/login') {
          router.push('/dashboard')
        }
      } catch {
        logout()
        if (!['/', '/login', '/register'].includes(pathname)) {
          router.push('/login')
        }
      } finally {
        setAuthChecked(true)
        hideLoading()
      }
    }
    fetchUser()
  }, [pathname, logout, setUser, router, showLoading, hideLoading, setAuthChecked])

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
