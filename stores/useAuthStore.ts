import { create } from 'zustand'

export type User = {
  name: string
  email: string
}

type AuthState = {
  user: User | null
  isLoggedIn: boolean
  isAuthChecked: boolean
  setUser: (user: User) => void
  logout: () => void
  setAuthChecked: (flag: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isAuthChecked: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false, isAuthChecked: false }),
  setAuthChecked: (flag) => set({ isAuthChecked: flag }),
}))
