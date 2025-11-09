'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import {
  BarChart3,
  Search,
  Settings,
  Users,
  TrendingUp,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  Target,
  Eye,
  FileText
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Brand Analysis', href: '/dashboard/analysis', icon: Target },
  { name: 'Monitoring', href: '/dashboard/monitoring', icon: Eye },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Competitors', href: '/dashboard/competitors', icon: Users },
  { name: 'Trends', href: '/dashboard/trends', icon: TrendingUp },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
]

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/login')
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-white p-2 rounded-lg shadow-md border border-gray-200"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Brand Monitor</span>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    sidebar-item
                    ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500">Premium Plan</p>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="/dashboard/settings"
                className="sidebar-item sidebar-item-inactive w-full"
              >
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </a>
              
              <button
                onClick={handleSignOut}
                className="sidebar-item sidebar-item-inactive w-full text-left"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
