import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    id: 'backend',
    label: 'Backend',
    color: '#00D4FF',
    icon: '⚙️',
    skills: [
      { name: 'Java', level: 90, icon: '☕' },
      { name: 'Spring Boot', level: 85, icon: '🌿' },
      { name: 'Hibernate / JPA', level: 80, icon: '🗄️' },
      { name: 'REST APIs', level: 90, icon: '🔗' },
      { name: 'Spring Security', level: 70, icon: '🔒' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#8B5CF6',
    icon: '🎨',
    skills: [
      { name: 'React.js', level: 88, icon: '⚛️' },
      { name: 'Redux Toolkit', level: 82, icon: '🔄' },
      { name: 'Tailwind CSS', level: 85, icon: '💨' },
      { name: 'JavaScript ES6+', level: 85, icon: '✨' },
      { name: 'HTML5 / CSS3', level: 90, icon: '📄' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    color: '#06FFC8',
    icon: '🗃️',
    skills: [
      { name: 'MySQL', level: 90, icon: '🐬' },
      { name: 'MongoDB', level: 65, icon: '🍃' },
      { name: 'JPA Queries', level: 80, icon: '🔍' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    color: '#FF2D78',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', level: 88, icon: '📦' },
      { name: 'VS Code', level: 90, icon: '💻' },
      { name: 'Eclipse IDE', level: 90, icon: '🌑' },
      { name: 'Maven', level: 85, icon: '📋' },
      { name: 'Postman', level: 85, icon: '📮' },
    ],
  },
]

function SkillBar({ name, level, color, icon, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">{name}</span>
        </div>
        <span className="font-mono text-xs" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('backend')
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const active = SKILL_CATEGORIES.find((c) => c.id === activeCategory)

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-neon-blue" />
            <span className="section-label">03. Skills</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl font-black mb-4">Tech Arsenal</h2>
          <p className="font-body text-white/40 text-base max-w-lg mb-16">
            Technologies I work with to build end-to-end digital experiences.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-dark-950 font-bold'
                  : 'glass text-white/50 hover:text-white border border-white/10'
              }`}
              style={
                activeCategory === cat.id
                  ? { backgroundColor: cat.color, boxShadow: `0 0 20px ${cat.color}50` }
                  : {}
              }
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Panel */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-2xl p-8 md:p-12"
          style={{ borderColor: `${active.color}20` }}
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="text-3xl">{active.icon}</span>
            <div>
              <h3 className="font-display font-bold text-xl text-white">{active.label}</h3>
              <p className="font-mono text-xs text-white/30">{active.skills.length} technologies</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {active.skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} color={active.color} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Tool badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-3 justify-center"
        >
          {['Java 17', 'Spring Boot 3', 'React 18', 'Redux Toolkit', 'Tailwind CSS', 'MySQL 8', 'Hibernate', 'Maven', 'Git', 'REST API', 'JPA', 'MongoDB'].map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
