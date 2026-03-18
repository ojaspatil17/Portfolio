import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, useInView } from 'framer-motion'
import { fetchProjects } from '../../store/projectsSlice'

/* GitHub Icon */
const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
  </svg>
)

/* Project Card */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const color = project.color || '#00D4FF'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Top Glow Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs mb-2" style={{ color: `${color}80` }}>
              {project.featured ? '★ FEATURED' : 'PROJECT'}
            </div>
            <h3 className="text-xl text-white">{project.title}</h3>
            <p className="text-xs mt-1" style={{ color }}>
              {project.subtitle}
            </p>
          </div>

          {/* GitHub Icon Clickable */}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 flex items-center justify-center rounded-xl transition hover:scale-110"
              style={{ backgroundColor: `${color}15`, color }}
            >
              <GithubIcon className="w-6 h-6" />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 mb-6">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(project.techStack || []).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: `${color}10`,
                border: `1px solid ${color}25`,
                color: `${color}cc`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 border-t border-white/10 pt-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white flex items-center gap-1"
            >            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color }}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* Main Section */
export default function Projects() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((s) => s.projects)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-5xl mb-6 text-white">Projects</h2>
        </motion.div>

        {/* Loader */}
        {loading ? (
          <div className="text-center py-20 text-white">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* Bottom Button */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/ojaspatil17"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}