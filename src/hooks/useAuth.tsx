'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { auth } from '@/lib/supabase'
import { AuthState } from '@/types/auth'
import { User } from '@supabase/supabase-js'

const AuthContext = createContext<AuthState & {
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user, error } = await auth.getCurrentUser()
        if (error) {
          setError(error.message)
        } else {
          setUser(user)
        }
      } catch (err) {
        setError('Failed to get user session')
      } finally {
        clearTimeout(loadingTimeout)
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user as User)
        } else {
          setUser(null)
        }
        clearTimeout(loadingTimeout)
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(loadingTimeout)
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    const { data, error } = await auth.signIn(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
      return { error }
    }
    
    if (data?.user) {
      setUser(data.user)
    }
    
    setLoading(false)
    return { error: null }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    const { data, error } = await auth.signUp(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
      return { error }
    }
    
    setLoading(false)
    return { error: null }
  }

  const signOut = async () => {
    setLoading(true)
    await auth.signOut()
    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
