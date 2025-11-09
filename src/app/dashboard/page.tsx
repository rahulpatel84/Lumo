'use client'

import { useAuth } from '@/hooks/useAuth'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// Mock data for demonstration
const stats = [
  {
    name: 'Total Brands Monitored',
    value: '12',
    change: '+2.1%',
    changeType: 'positive' as const,
    icon: Target,
  },
  {
    name: 'Active Monitoring',
    value: '8',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: Eye,
  },
  {
    name: 'Competitor Analysis',
    value: '24',
    change: '-2.4%',
    changeType: 'negative' as const,
    icon: Users,
  },
  {
    name: 'Monthly Queries',
    value: '1,847',
    change: '+18.2%',
    changeType: 'positive' as const,
    icon: BarChart3,
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'analysis',
    message: 'Tesla brand analysis completed',
    time: '2 minutes ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'alert',
    message: 'Apple ranking dropped in "Best Smartphone" category',
    time: '15 minutes ago',
    status: 'warning',
  },
  {
    id: 3,
    type: 'monitoring',
    message: 'Microsoft monitoring started for AI category',
    time: '1 hour ago',
    status: 'active',
  },
  {
    id: 4,
    type: 'report',
    message: 'Weekly competitive report generated',
    time: '2 hours ago',
    status: 'completed',
  },
]

const topBrands = [
  { name: 'Tesla', category: 'Electric Vehicle', score: 94, trend: 'up' },
  { name: 'Apple', category: 'Smartphone', score: 91, trend: 'down' },
  { name: 'Microsoft', category: 'Cloud Services', score: 88, trend: 'up' },
  { name: 'Google', category: 'Search Engine', score: 85, trend: 'stable' },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your brand monitoring today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ml-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <a href="/dashboard/monitoring" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </a>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.status === 'completed' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' :
                    activity.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : activity.status === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Brands */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Brands</h3>
          
          <div className="space-y-4">
            {topBrands.map((brand, index) => (
              <div key={brand.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                    <p className="text-xs text-gray-500">{brand.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{brand.score}</span>
                  {brand.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : brand.trend === 'down' ? (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/dashboard/analysis"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
          >
            <Target className="h-8 w-8 text-primary-600 mb-3" />
            <h4 className="font-medium text-gray-900 group-hover:text-primary-700">Start Brand Analysis</h4>
            <p className="text-sm text-gray-600 mt-1">Analyze a new brand across multiple AI platforms</p>
          </a>
          
          <a
            href="/dashboard/monitoring"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
          >
            <Eye className="h-8 w-8 text-primary-600 mb-3" />
            <h4 className="font-medium text-gray-900 group-hover:text-primary-700">Monitor Brands</h4>
            <p className="text-sm text-gray-600 mt-1">Set up continuous monitoring for your brands</p>
          </a>
          
          <a
            href="/dashboard/reports"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
          >
            <BarChart3 className="h-8 w-8 text-primary-600 mb-3" />
            <h4 className="font-medium text-gray-900 group-hover:text-primary-700">View Reports</h4>
            <p className="text-sm text-gray-600 mt-1">Access detailed analytics and insights</p>
          </a>
        </div>
      </div>
    </div>
  )
}
