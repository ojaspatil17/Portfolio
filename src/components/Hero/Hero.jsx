import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'Java & Spring Boot Dev',
  'React Specialist',
  'Problem Solver',
]

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.5 + 0.1,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 4,
}))

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
    } else if (!isDeleting && displayed.length === current.length) {
      setIsPaused(true)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, isPaused, roleIndex])

  return (
    <div className="flex items-center gap-2 h-10">
      <span className="font-mono text-neon-cyan text-lg md:text-xl">
        {displayed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-[2px] h-5 bg-neon-cyan ml-[2px] align-middle"
        />
      </span>
    </div>
  )
}

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-neon-blue"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Connection lines effect */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <radialGradient id="heroGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleField />

      {/* Glowing center orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-neon-blue/3 blur-[120px]" />
        <div className="absolute inset-20 rounded-full bg-neon-purple/5 blur-[80px]" />
      </div>

      {/* Horizontal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 40, 60, 80].map((pct) => (
          <motion.div
            key={pct}
            className="absolute left-0 right-0 h-px"
            style={{ top: `${pct}%`, background: `linear-gradient(90deg, transparent, rgba(0,212,255,0.05), transparent)` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + pct / 20, repeat: Infinity, delay: pct / 40 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-neon-blue" />
              <span className="section-label">Available for opportunities</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-neon-cyan"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <p className="font-mono text-sm text-white/30 mb-2 tracking-widest">Hello, World! I'm</p>
              <h1 className="font-display font-black leading-none mb-4">
                <span
                  className="block text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 50%, #00D4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Ojas
                </span>
                <span
                  className="block text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 60%, #06FFC8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Patil
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <TypingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-white/50 text-base leading-relaxed max-w-lg mb-10"
            >
              PG-DAC graduate from CDAC Pune, crafting scalable full-stack solutions
              with Java Spring Boot & React. Passionate about clean architecture,
              performance, and delightful user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button onClick={scrollToProjects} className="btn-primary">
                <span>View Projects</span>
              </button>
              <a href="https://drive.google.com/uc?export=download&id=1u007lrBYGpZwWzLdggAuJy0bmi7Px8eU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download Resume
            </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-10 mt-14"
            >
              {[
                { num: '3+', label: 'Projects Built' },
                { num: 'PG-DAC', label: 'CDAC Pune' },
                { num: 'Full', label: 'Stack Dev' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-white">{stat.num}</div>
                  <div className="font-mono text-xs text-white/30 tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 rounded-full border border-dashed border-neon-blue/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-16 rounded-full border border-dashed border-neon-purple/10"
              />

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-neon-blue/10 blur-[60px] scale-150 animate-pulse-glow" />

              {/* Avatar box */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-72 h-72 rounded-2xl glass-card overflow-hidden"
                style={{ border: '1px solid rgba(0,212,255,0.2)' }}
              >
                {/* Code snippet visual */}
                <div className="absolute inset-0 p-6 font-mono text-xs leading-relaxed">
                  <div className="text-white/20 mb-4">// Full Stack Developer</div>
                  <div><span className="text-neon-purple">const</span> <span className="text-neon-cyan">ojas</span> = {'{'}</div>
                  <div className="pl-4"><span className="text-white/40">name:</span> <span className="text-green-400">"Ojas Patil"</span>,</div>
                  <div className="pl-4"><span className="text-white/40">role:</span> <span className="text-green-400">"SWE"</span>,</div>
                  <div className="pl-4"><span className="text-white/40">stack:</span> [</div>
                  <div className="pl-8"><span className="text-yellow-400">"Java"</span>, <span className="text-yellow-400">"Spring"</span>,</div>
                  <div className="pl-8"><span className="text-yellow-400">"React"</span>, <span className="text-yellow-400">"MySQL"</span></div>
                  <div className="pl-4">],</div>
                  <div className="pl-4"><span className="text-white/40">passionate:</span> <span className="text-neon-blue">true</span>,</div>
                  <div className="pl-4"><span className="text-white/40">available:</span> <span className="text-neon-cyan">true</span>,</div>
                  <div>{'}'}</div>
                  <div className="mt-4 text-white/20">// Let's build something great!</div>
                </div>

                {/* Scan line on card */}
                <motion.div
                  animate={{ y: ['-100%', '300%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent pointer-events-none"
                />
              </motion.div>

              {/* Floating badges */}
              {[
                { label: 'Spring Boot', color: '#6DB33F', x: '-120px', y: '20px' },
                { label: 'React', color: '#61DAFB', x: '100px', y: '-30px' },
                { label: 'MySQL', color: '#00ACD7', x: '-80px', y: '200px' },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
                  className="absolute glass px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap"
                  style={{
                    left: badge.x,
                    top: badge.y,
                    borderColor: `${badge.color}40`,
                    color: badge.color,
                    boxShadow: `0 0 12px ${badge.color}30`,
                  }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-white/20 tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-neon-blue/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
