import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toggleNav, closeNav, setActiveSection } from '../../store/uiSlice'

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const dispatch = useDispatch()
  const { navOpen, activeSection } = useSelector((s) => s.ui)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      // Active section detection
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id))
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          dispatch(setActiveSection(NAV_LINKS[i].id))
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dispatch])

  const handleNavClick = useCallback((href) => {
    dispatch(closeNav())
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [dispatch])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border border-neon-blue/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
              <div className="absolute inset-1 border border-neon-purple/40 rotate-12 group-hover:rotate-[90deg] transition-transform duration-700" />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-neon-blue font-bold">OP</span>
            </div>
            <span className="font-display font-bold text-sm tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">
              Ojas Patil<span className="text-neon-blue">.</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`relative font-body text-sm font-medium transition-all duration-300 group ${
                  activeSection === link.id ? 'text-neon-blue' : 'text-white/50 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] text-neon-blue/60 mr-1">0{NAV_LINKS.indexOf(link) + 1}.</span>
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1u007lrBYGpZwWzLdggAuJy0bmi7Px8eU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-5 py-2"
              >
              <span>Resume</span>
              </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] group"
            onClick={() => dispatch(toggleNav())}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={navOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white block transition-colors group-hover:bg-neon-blue"
            />
            <motion.span
              animate={navOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-4 h-[1px] bg-white/60 block self-end"
            />
            <motion.span
              animate={navOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white block transition-colors group-hover:bg-neon-purple"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="font-display text-3xl font-bold text-white/70 hover:text-white hover:text-neon-blue transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
