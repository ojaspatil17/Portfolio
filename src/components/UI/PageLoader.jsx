import React from 'react'

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border border-neon-blue/20 rounded-full" />
        <div className="absolute inset-0 border-t border-neon-blue rounded-full animate-spin" />
        <div className="absolute inset-2 border-t border-neon-purple/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
      </div>
    </div>
  )
}
