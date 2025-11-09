'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { signIn, signUp, loading, error: authError } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Clear any auth errors when component mounts
  useEffect(() => {
    setError('')
    setSuccess('')
  }, [mode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      
      const { error } = await signUp(formData.email, formData.password)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Please check your email to confirm your account')
        setTimeout(() => {
          window.location.href = '/auth/login'
        }, 5000)
      }
    } else {
      const { error } = await signIn(formData.email, formData.password)
      if (error) {
        setError(error.message)
      } else {
        window.location.href = '/dashboard'
      }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">Brand Monitor</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-gray-600">
              {mode === 'login' ? 'Please enter your details' : 'Please enter your details to get started'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password for Signup */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="text-sm text-gray-900 hover:text-gray-700">
                  Forgot password
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Switch Mode */}
            <div className="text-center">
              <span className="text-gray-600">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <a
                href={mode === 'login' ? '/auth/signup' : '/auth/login'}
                className="text-gray-900 hover:text-gray-700 font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Character Illustration */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        {/* Background Pattern - Exact Match */}
        <div className="absolute inset-0">
          {/* Tech Icons Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="techPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  {/* Chat bubble with dots */}
                  <rect x="15" y="15" width="20" height="14" rx="3" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="20" cy="22" r="1" fill="#ffffff" opacity="0.4" />
                  <circle cx="24" cy="22" r="1" fill="#ffffff" opacity="0.4" />
                  <circle cx="28" cy="22" r="1" fill="#ffffff" opacity="0.4" />
                  
                  {/* Globe with 24 */}
                  <circle cx="70" cy="25" r="10" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  <path d="M60 25 Q70 15 80 25 Q70 35 60 25" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                  <path d="M70 15 L70 35" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                  <text x="70" y="28" textAnchor="middle" fontSize="6" fill="#ffffff" opacity="0.4">24</text>
                  
                  {/* Headphones */}
                  <path d="M15 65 Q25 60 35 65 L35 75 Q35 80 30 80 L25 80 Q20 80 20 75 L20 65" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="22" cy="70" r="2.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                  <circle cx="33" cy="70" r="2.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                  
                  {/* Shield with checkmark */}
                  <path d="M65 60 L70 55 L75 60 L75 75 Q70 80 65 75 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  <path d="M68 65 L70 67 L73 62" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                  
                  {/* Laptop */}
                  <rect x="75" y="75" width="18" height="10" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  <rect x="77" y="77" width="14" height="6" fill="#ffffff" opacity="0.1" />
                  
                  {/* Email */}
                  <rect x="20" y="85" width="18" height="12" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  <path d="M20 85 L29 91 L38 85" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                  
                  {/* Hand/Palm */}
                  <path d="M75 85 L80 80 L85 85 L85 95 Q80 100 75 95 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  
                  {/* Question mark */}
                  <circle cx="45" cy="85" r="8" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
                  <text x="45" y="88" textAnchor="middle" fontSize="8" fill="#ffffff" opacity="0.4">?</text>
                  
                  {/* Circles and X marks scattered */}
                  <circle cx="10" cy="10" r="2" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                  <circle cx="90" cy="10" r="1.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                  <circle cx="10" cy="90" r="1" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                  <circle cx="90" cy="90" r="2.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                  
                  {/* X marks */}
                  <g opacity="0.3">
                    <path d="M50 10 L54 14 M54 10 L50 14" stroke="#ffffff" strokeWidth="1" />
                    <path d="M85 45 L89 49 M89 45 L85 49" stroke="#ffffff" strokeWidth="1" />
                    <path d="M15 45 L19 49 M19 45 L15 49" stroke="#ffffff" strokeWidth="1" />
                    <path d="M50 90 L54 94 M54 90 L50 94" stroke="#ffffff" strokeWidth="1" />
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#techPattern)" />
            </svg>
          </div>
        </div>
        
        {/* Content and Character */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              
              {/* Left Side - Content */}
              <motion.div
                className="lg:col-span-3 text-white space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Header */}
                <div>
                  <motion.h2 
                    className="text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Meet Lumo
                    <br />
                    <span className="text-gray-300">Your AI Brand Analyst</span>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Lumo continuously monitors your brand across ChatGPT, Claude, Gemini, and other AI platforms.
                  </motion.p>
                </div>

                {/* Features */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      <span className="text-sm">🤖</span>
                    </div>
                    <span className="text-gray-200">AI-powered brand monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      <span className="text-sm">📊</span>
                    </div>
                    <span className="text-gray-200">Real-time competitive analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      <span className="text-sm">🎯</span>
                    </div>
                    <span className="text-gray-200">Multi-platform insights</span>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">50K+</div>
                    <div className="text-xs text-gray-400">Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-gray-400">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">24/7</div>
                    <div className="text-xs text-gray-400">Monitor</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Character */}
              <div className="lg:col-span-2 relative flex justify-center">
                <LumoCharacter />
                
                {/* Floating Analytics Cards */}
                <motion.div 
                  className="absolute -left-8 top-8 h-12 w-20 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <AnimatedMiniChart />
                </motion.div>

                <motion.div 
                  className="absolute -right-8 bottom-16 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  <div className="text-xs text-white/80">Rank</div>
                  <div className="text-sm font-bold text-white">#3</div>
                  <div className="text-xs text-green-400">↑ +2</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LumoCharacter() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Character Container */}
      <div className="relative h-96 w-72 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
        <svg width="260" height="300" viewBox="0 0 280 320" className="animate-float">
                  <defs>
                    {/* Character Gradients - Serene Meditation Theme */}
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e5e7eb" />
                      <stop offset="50%" stopColor="#d1d5db" />
                      <stop offset="100%" stopColor="#9ca3af" />
                    </linearGradient>
                    <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#374151" />
                      <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#f3f4f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                    </radialGradient>
                    <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                    </radialGradient>
                  </defs>
          
          {/* Character Shadow */}
          <ellipse cx="140" cy="300" rx="60" ry="15" fill="url(#shadowGradient)" opacity="0.3" />
          
          {/* Lumo's Meditation Form */}
          <g transform="translate(140, 180)">
            {/* Halo */}
            <motion.ellipse 
              cx="0" cy="-80" rx="45" ry="8" 
              fill="url(#haloGradient)" 
              stroke="#ffffff" 
              strokeWidth="2"
              opacity="0.9"
              animate={{ 
                opacity: [0.9, 0.5, 0.9],
                rx: [45, 48, 45],
                ry: [8, 10, 8]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Halo Inner Glow */}
            <motion.ellipse 
              cx="0" cy="-80" rx="35" ry="6" 
              fill="#ffffff" 
              opacity="0.3"
              animate={{ opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Head - Perfect Circle */}
            <motion.circle 
              cx="0" cy="-40" r="40" 
              fill="url(#bodyGradient)"
              animate={{ r: [40, 42, 40] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Serene Eyes - Closed/Peaceful */}
            <motion.path 
              d="M-12 -45 Q-8 -42 -4 -45" 
              stroke="#1f2937" 
              strokeWidth="2" 
              fill="none"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.path 
              d="M4 -45 Q8 -42 12 -45" 
              stroke="#1f2937" 
              strokeWidth="2" 
              fill="none"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Peaceful Smile */}
            <path 
              d="M-8 -30 Q0 -25 8 -30" 
              stroke="#1f2937" 
              strokeWidth="2" 
              fill="none"
              opacity="0.7"
            />
            
            {/* Body - Sitting Position */}
            <motion.ellipse 
              cx="0" cy="20" rx="50" ry="60" 
              fill="url(#bodyGradient)"
              animate={{ opacity: [0.9, 0.7, 0.9] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Meditation Arms - Crossed/Resting */}
            <ellipse cx="-40" cy="0" rx="18" ry="45" fill="url(#bodyGradient)" transform="rotate(-30 -40 0)" />
            <ellipse cx="40" cy="0" rx="18" ry="45" fill="url(#bodyGradient)" transform="rotate(30 40 0)" />
            
            {/* Meditation Hands - Mudra Position */}
            <circle cx="-45" cy="35" r="15" fill="url(#bodyGradient)" />
            <circle cx="45" cy="35" r="15" fill="url(#bodyGradient)" />
            
            {/* Mudra Fingers */}
            <g transform="translate(-45, 35)">
              <circle cx="0" cy="-8" r="3" fill="url(#bodyGradient)" />
              <circle cx="0" cy="8" r="3" fill="url(#bodyGradient)" />
            </g>
            <g transform="translate(45, 35)">
              <circle cx="0" cy="-8" r="3" fill="url(#bodyGradient)" />
              <circle cx="0" cy="8" r="3" fill="url(#bodyGradient)" />
            </g>
            
            {/* Legs - Lotus Position */}
            <ellipse cx="-25" cy="70" rx="30" ry="15" fill="url(#bodyGradient)" transform="rotate(-10 -25 70)" />
            <ellipse cx="25" cy="70" rx="30" ry="15" fill="url(#bodyGradient)" transform="rotate(10 25 70)" />
            
            {/* Feet */}
            <ellipse cx="-35" cy="75" rx="12" ry="8" fill="url(#bodyGradient)" />
            <ellipse cx="35" cy="75" rx="12" ry="8" fill="url(#bodyGradient)" />
            
            {/* Meditation Glow - Soft Aura */}
            <motion.circle 
              cx="0" cy="0" r="90" 
              fill="url(#glowGradient)"
              animate={{ r: [90, 100, 90], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            {/* Inner Peace Glow */}
            <motion.circle 
              cx="0" cy="-40" r="50" 
              fill="url(#glowGradient)"
              animate={{ r: [50, 55, 50], opacity: [0.2, 0.05, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </g>
          
          {/* Floating Meditation Elements */}
          <g opacity="0.4">
            {/* Peaceful Energy Waves */}
            <motion.path 
              d="M50 120 Q140 100 230 140" 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="3,6"
              animate={{ strokeDashoffset: [0, 9, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.path 
              d="M50 220 Q140 200 230 240" 
              stroke="#ffffff" 
              strokeWidth="1" 
              fill="none" 
              strokeDasharray="2,8"
              animate={{ strokeDashoffset: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            {/* Floating Meditation Orbs */}
            <motion.circle 
              cx="80" cy="120" r="3" 
              fill="#ffffff" 
              opacity="0.6"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.6, 0.2, 0.6]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0 }}
            />
            <motion.circle 
              cx="200" cy="160" r="2" 
              fill="#ffffff" 
              opacity="0.5"
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.5, 0.1, 0.5]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
            <motion.circle 
              cx="60" cy="200" r="2.5" 
              fill="#ffffff" 
              opacity="0.4"
              animate={{ 
                y: [0, -12, 0],
                opacity: [0.4, 0.1, 0.4]
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

function AnimatedMiniChart() {
  return (
    <svg viewBox="0 0 120 40" className="h-full w-full">
      <defs>
        <linearGradient id="chartGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="120" height="40" fill="url(#chartGradient)" opacity="0.15" />
      <motion.polyline
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        points="0,32 15,28 30,30 45,22 60,26 75,16 90,18 105,10 120,14"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />
    </svg>
  );
}