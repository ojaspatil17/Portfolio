import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EDUCATION = [
  {
    degree: 'PG-DAC',
    school: 'CDAC Pune',
    year: '2026',
    desc: 'Post Graduate Diploma in Advanced Computing. Specialized in full-stack development, system design, and advanced Java.',
    color: '#00D4FF',
    icon: '🎓',
  },
  {
    degree: 'B.Tech — Computer Engineering',
    school: 'R C Patel Institute of Technology',
    year: '2025',
    desc: 'Bachelor of Technology in Computer Engineering with focus on data structures, algorithms, and software development.',
    color: '#8B5CF6',
    icon: '🏛️',
  },
]

const FACTS = [
  { label: 'Location', value: 'Pune, India' },
  { label: 'Specialization', value: 'Full Stack Dev' },
  { label: 'Status', value: 'Open to Work' },
  { label: 'Focus', value: 'Frontend + Backend + DB Operations' },
]

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-neon-blue" />
            <span className="section-label">02. About Me</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl font-black mb-16">
            Who I Am
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <p className="font-body text-white/60 text-base leading-loose">
                I'm a passionate Full Stack Developer with a strong foundation in both
                frontend and backend technologies. Graduated from{' '}
                <span className="text-neon-blue font-medium">CDAC Pune</span> with a
                PG-DAC certification, I specialize in building scalable, high-performance
                web applications.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-body text-white/60 text-base leading-loose">
                My expertise spans the entire development lifecycle — from designing
                RESTful APIs with{' '}
                <span className="text-neon-purple font-medium">Java Spring Boot</span> to
                crafting immersive UIs with{' '}
                <span className="text-neon-cyan font-medium">React & Redux</span>. I
                believe great software is a blend of clean architecture and exceptional UX.
              </p>
            </FadeIn>

            {/* Facts grid */}
            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {FACTS.map((f) => (
                  <div key={f.label} className="glass-card p-4 rounded-xl group">
                    <div className="font-mono text-xs text-white/25 tracking-widest mb-1">{f.label}</div>
                    <div className="font-display font-semibold text-sm text-white group-hover:text-neon-blue transition-colors">{f.value}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — Education Timeline */}
          <div>
            <FadeIn delay={0.2}>
              <div className="relative pl-8">
                <div className="timeline-line" />

                <div className="space-y-8">
                  {EDUCATION.map((edu, i) => (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-[38px] top-5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: edu.color, backgroundColor: `${edu.color}20` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: edu.color }} />
                      </div>

                      <div className="glass-card p-6 rounded-2xl hover:border-neon-blue/30">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-2xl mb-2 block">{edu.icon}</span>
                            <h3 className="font-display font-bold text-white text-lg">{edu.degree}</h3>
                            <p className="font-mono text-sm" style={{ color: edu.color }}>{edu.school}</p>
                          </div>
                          <span
                            className="font-mono text-xs px-3 py-1 rounded-full"
                            style={{ backgroundColor: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
                          >
                            {edu.year}
                          </span>
                        </div>
                        <p className="font-body text-sm text-white/50 leading-relaxed">{edu.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
