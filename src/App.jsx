import React, { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import PageLoader from './components/UI/PageLoader'

const About = lazy(() => import('./components/About/About'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const Footer = lazy(() => import('./components/Footer/Footer'))

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-950 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="grid-overlay absolute inset-0 opacity-40" />
        <div className="orb orb-blue w-[600px] h-[600px] top-[-200px] left-[-100px]" />
        <div className="orb orb-purple w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/50 to-dark-950" />
      </div>

      <div className="scanline" />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(7, 18, 32, 0.95)',
            color: '#e2e8f0',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
          },
          success: {
            iconTheme: { primary: '#06FFC8', secondary: '#020408' },
          },
          error: {
            iconTheme: { primary: '#FF2D78', secondary: '#020408' },
          }
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<PageLoader />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}