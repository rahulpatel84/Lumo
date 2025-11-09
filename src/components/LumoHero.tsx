"use client";

import { motion } from "framer-motion";

export default function LumoHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <Stars />
      <RingWaves />
      
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Content */}
        <div className="flex w-full items-center justify-center px-8 lg:w-1/2 lg:px-16">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="mb-8 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <div className="h-4 w-4 rounded-sm bg-gray-900"></div>
              </div>
              <span className="text-xl font-bold text-white">Brand Monitor</span>
            </div>

            {/* Main Headline */}
            <motion.h1 
              className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Lumo
              <br />
              <span className="text-gray-300">Your AI Brand Analyst</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="mb-8 text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Lumo continuously monitors your brand across ChatGPT, Claude, Gemini, and other AI platforms, 
              providing real-time insights and competitive intelligence.
            </motion.p>

            {/* Features */}
            <motion.div 
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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

            {/* Call to Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="/auth/signup"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Get Started Free
              </a>
              <a
                href="/auth/login"
                className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200 text-center border border-white/20"
              >
                Sign In
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Brands Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Monitoring</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Lumo Character */}
        <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <div className="relative">
            <LumoCharacter />
            
            {/* Floating Analytics Cards */}
            <motion.div 
              className="absolute -left-16 top-16 h-16 w-24 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <AnimatedMiniChart />
            </motion.div>

            <motion.div 
              className="absolute -right-12 bottom-20 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <div className="text-xs text-white/80">Brand Rank</div>
              <div className="text-lg font-bold text-white">#3</div>
              <div className="text-xs text-green-400">↑ +2</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
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
      <div className="relative h-96 w-80 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
        <svg width="280" height="320" viewBox="0 0 280 320" className="animate-float">
          <defs>
            {/* Character Gradients - Black & White Theme */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          
          {/* Character Shadow */}
          <ellipse cx="140" cy="300" rx="60" ry="15" fill="url(#shadowGradient)" opacity="0.3" />
          
          {/* Lumo's Form */}
          <g transform="translate(140, 160)">
            {/* Body */}
            <motion.ellipse 
              cx="0" cy="40" rx="45" ry="80" 
              fill="url(#bodyGradient)"
              animate={{ opacity: [0.9, 0.7, 0.9] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Head */}
            <motion.circle 
              cx="0" cy="-40" r="35" 
              fill="url(#bodyGradient)"
              animate={{ r: [35, 37, 35] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Hair/Hood Effect */}
            <path d="M-35 -65 Q0 -80 35 -65 Q30 -45 25 -35 Q0 -50 -25 -35 Q-30 -45 -35 -65 Z" fill="url(#shadowGradient)" opacity="0.8" />
            
            {/* Face Area */}
            <ellipse cx="0" cy="-35" rx="25" ry="30" fill="#ffffff" opacity="0.9" />
            
            {/* Eyes - Animated */}
            <motion.circle 
              cx="-8" cy="-40" r="3" 
              fill="#1f2937"
              animate={{ opacity: [0.9, 0.4, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle 
              cx="8" cy="-40" r="3" 
              fill="#1f2937"
              animate={{ opacity: [0.9, 0.4, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Arms */}
            <ellipse cx="-50" cy="20" rx="15" ry="40" fill="url(#shadowGradient)" transform="rotate(-20 -50 20)" />
            <ellipse cx="50" cy="20" rx="15" ry="40" fill="url(#shadowGradient)" transform="rotate(20 50 20)" />
            
            {/* Hands */}
            <circle cx="-65" cy="50" r="12" fill="#ffffff" />
            <circle cx="65" cy="50" r="12" fill="#ffffff" />
            
            {/* Peace Sign Hand */}
            <g transform="translate(65, 50)">
              <rect x="-2" y="-8" width="2" height="12" fill="#1f2937" opacity="0.9" />
              <rect x="2" y="-8" width="2" height="12" fill="#1f2937" opacity="0.9" />
            </g>
            
            {/* Chest Panel - Brand Monitoring */}
            <rect x="-20" y="10" width="40" height="30" rx="8" fill="#ffffff" opacity="0.2" />
            <rect x="-15" y="15" width="30" height="20" rx="4" fill="#1f2937" opacity="0.6" />
            
            {/* Screen Content */}
            <g opacity="0.9">
              <rect x="-12" y="18" width="4" height="6" fill="#ffffff" />
              <rect x="-6" y="20" width="4" height="8" fill="#9ca3af" />
              <rect x="0" y="19" width="4" height="9" fill="#6b7280" />
              <rect x="6" y="21" width="4" height="7" fill="#374151" />
              <path d="M-10 30 L-2 28 L6 26 L10 24" stroke="#ffffff" strokeWidth="1" fill="none" />
            </g>
            
            {/* Glow Effect */}
            <motion.circle 
              cx="0" cy="0" r="80" 
              fill="url(#glowGradient)"
              animate={{ r: [80, 85, 80], opacity: [0.2, 0.1, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </g>
          
          {/* Floating Data Waves */}
          <g opacity="0.3">
            <motion.path 
              d="M50 100 Q140 80 230 120" 
              stroke="#ffffff" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,5"
              animate={{ strokeDashoffset: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.path 
              d="M50 200 Q140 180 230 220" 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="3,7"
              animate={{ strokeDashoffset: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

function RingWaves() {
  const rings = [
    { size: 220, delay: 0 },
    { size: 280, delay: 0.6 },
    { size: 340, delay: 1.2 },
  ];

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {rings.map(({ size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/10"
          style={{ width: size, height: size }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: [0.85, 1, 0.85], opacity: [0, 0.7, 0] }}
          transition={{ duration: 7.5, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
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

function Stars() {
  const items = Array.from({ length: 40 });
  
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
    </div>
  );
}
