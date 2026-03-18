import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import axios from 'axios'
const FORMSPREE_URL = 'https://formspree.io/f/xwvraabp'

import toast from 'react-hot-toast'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'ojasambalalpatil@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ojasambalalpatil@gmail.com',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    color: '#00D4FF',
  },
  {
    label: 'WhatsApp',
    value: '+91 7620454946',
    href: 'https://wa.me/917620454946?text=Hi%20Ojas,%20I%20am%20a%20recruiter%20and%20would%20like%20to%20connect%20with%20you.',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .01 5.36 0 12c0 2.12.55 4.18 1.6 6L0 24l6.17-1.62A11.96 11.96 0 0012 24c6.63 0 12-5.36 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 21.82c-1.9 0-3.76-.5-5.38-1.44l-.38-.22-3.66.96.98-3.57-.25-.37A9.82 9.82 0 012.18 12c0-5.42 4.4-9.82 9.82-9.82 2.62 0 5.08 1.02 6.93 2.87A9.74 9.74 0 0121.82 12c0 5.42-4.4 9.82-9.82 9.82zm5.4-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.5-1.76-1.68-2.06-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>
    ),
    color: '#25D366',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ojaspatil17',
    href: 'https://linkedin.com/in/ojaspatil17',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077B5',
  },
  {
    label: 'GitHub',
    value: 'github.com/ojaspatil17',
    href: 'https://github.com/ojaspatil17',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    color: '#fff',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  if (!form.name || !form.email || !form.message) {
    toast.error('Please fill in all fields.')
    return
  }
  setSubmitting(true)
  try {
    await axios.post('https://formspree.io/f/xwvraabp', {
      name: form.name,
      email: form.email,
      message: form.message,
    })
    setSubmitted(true)
    toast.success("Message sent! I'll get back to you soon.")
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  } catch (err) {
    toast.error('Failed to send. Please try again.')
  } finally {
    setSubmitting(false)
  }
}

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-neon-blue/3 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-neon-blue" />
            <span className="section-label">06. Contact</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl font-black mb-4">Get In Touch</h2>
          <p className="font-body text-white/40 text-base max-w-lg mb-16">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="font-body text-white/50 leading-loose">
              I'm currently open to full-time roles and freelance projects. Whether you have a question or just want to say hi — my inbox is always open.
            </p>

            <div className="space-y-4 pt-4">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-4 glass-card rounded-xl hover:border-white/20"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${link.color}15`, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <div className="font-mono text-xs text-white/30">{link.label}</div>
                    <div className="font-body text-sm text-white/70 group-hover:text-white transition-colors">{link.value}</div>
                  </div>
                  <svg className="w-4 h-4 text-white/20 ml-auto group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl mb-4"
                  >
                    🚀
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="font-body text-sm text-white/50">Thank you for reaching out. I'll respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div className="group">
                    <label className="font-mono text-xs text-white/30 tracking-widest block mb-3">YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-field"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-mono text-xs text-white/30 tracking-widest block mb-3">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input-field"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-xs text-white/30 tracking-widest block mb-3">MESSAGE</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hey Ojas, I'd love to discuss..."
                      rows={5}
                      className="input-field resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 font-display font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-3"
                    style={{
                      background: submitting
                        ? 'rgba(0,212,255,0.1)'
                        : 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))',
                      border: '1px solid rgba(0,212,255,0.3)',
                      color: '#00D4FF',
                      boxShadow: submitting ? 'none' : '0 0 30px rgba(0,212,255,0.1)',
                    }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border border-neon-blue/30 border-t-neon-blue rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
