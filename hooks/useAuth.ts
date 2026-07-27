'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const router = useRouter()
  const { user, userDetails, isLoading, setUser, setUserDetails, setIsLoading, clearAuth } = useAuthStore()
  const supabase = createClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        
        // Fetch user details
        const response = await fetch('/api/user/me')
        if (response.ok) {
          const data = await response.json()
          setUserDetails(data.user)
        }
      } else {
        clearAuth()
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, setUser, setUserDetails, setIsLoading, clearAuth])

  const signOut = async () => {
    await supabase.auth.signOut()
    clearAuth()
    router.push('/login')
  }

  const isAdmin = userDetails?.role === 'ADMIN'
  const isStaff = userDetails?.role === 'STAFF'
  const isCustomer = userDetails?.role === 'CUSTOMER'

  return {
    user,
    userDetails,
    isLoading,
    isAuthenticated: !!user,
    isAdmin,
    isStaff,
    isCustomer,
    signOut,
  }
}
