import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { UserWithRelations } from '@/types'

interface AuthState {
  user: User | null
  userDetails: UserWithRelations | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setUserDetails: (userDetails: UserWithRelations | null) => void
  setIsLoading: (isLoading: boolean) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userDetails: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setUserDetails: (userDetails) => set({ userDetails }),
  setIsLoading: (isLoading) => set({ isLoading }),
  clearAuth: () => set({ user: null, userDetails: null, isLoading: false }),
}))
