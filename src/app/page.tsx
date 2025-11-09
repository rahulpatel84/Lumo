'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LumoHero from '@/components/LumoHero'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard')
      }
      // If no user, show the hero page (don't redirect to login immediately)
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4" />
          <p className="text-white">Loading Brand Monitoring Platform...</p>
        </div>
      </div>
    )
  }

  // Show hero page for non-authenticated users
  return <LumoHero />
}
