import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { improveText, summarizeText, clearResponse } from '../../store/aiSlice'
import toast from 'react-hot-toast'

const EXAMPLES = [
  'I am a developer who makes apps using Java and React.',
  'I built a hiring platform with Spring Boot and MySQL.',
  'My skills include backend development with Java and frontend with React.',
]

export default function AIAssistant() {
  const dispatch = useDispatch()
  const { response, loading, lastAction } = useSelector((s) => s.ai)
  const [inputText, setInputText] = useState('')
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  const handleImprove = () => {
    if (!inputText.trim()) return toast.error('Please enter some text first.')
    dispatch(improveText(inputText))
  }

  const handleSummarize = () => {
    if (!inputText.trim()) return toast.error('Please enter some text first.')
    dispatch(summarizeText(inputText))
  }

  const handleClear = () => {
    setInputText('')
    dispatch(clearResponse())
  }

  const loadExample = (ex) => setInputText(ex)

  return (
    <section id="ai" className="py-32 relative">
      {/* Section glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-purple/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-neon-purple" />
            <span className="section-label" style={{ color: '#8B5CF6' }}>05. AI Lab</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl font-black mb-4">
            AI Assistant
          </h2>
          <p className="font-body text-white/40 text-base max-w-lg mb-12">
            Paste any text and let AI improve your writing or generate a concise summary using our backend-powered AI endpoint.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card rounded-2xl overflow-hidden"
          style={{ borderColor: 'rgba(139, 92, 246, 0.15)' }}
        >
          {/* Header bar */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="font-mono text-xs text-white/30">ai-assistant.terminal</span>
            <div className="ml-auto flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-neon-purple"
              />
              <span className="font-mono text-xs text-neon-purple">LIVE</span>
            </div>
          </div>

          <div className="p-8">
            {/* Input area */}
            <div className="mb-4">
              <label className="font-mono text-xs text-white/30 tracking-widest mb-3 block">
                INPUT TEXT
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here — a bio, a description, a paragraph..."
                rows={5}
                className="w-full bg-dark-900/80 border border-white/8 rounded-xl p-4 font-body text-sm text-white/80 placeholder-white/20 outline-none resize-none transition-all duration-300 focus:border-neon-purple/50 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
              />
            </div>

            {/* Example prompts */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="font-mono text-xs text-white/20">Try:</span>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(ex)}
                  className="font-mono text-xs text-neon-purple/60 hover:text-neon-purple border border-neon-purple/15 hover:border-neon-purple/40 px-3 py-1 rounded-full transition-all duration-300 truncate max-w-[200px]"
                >
                  {ex.slice(0, 30)}…
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleImprove}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,212,255,0.2))',
                  border: '1px solid rgba(139,92,246,0.4)',
                  color: '#8B5CF6',
                  boxShadow: loading ? 'none' : '0 0 20px rgba(139,92,246,0.15)',
                }}
              >
                {loading && lastAction === 'improve' ? (
                  <div className="w-4 h-4 border border-neon-purple/40 border-t-neon-purple rounded-full animate-spin" />
                ) : (
                  <span>✨</span>
                )}
                Improve Text
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSummarize}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(6,255,200,0.15))',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: '#00D4FF',
                  boxShadow: loading ? 'none' : '0 0 20px rgba(0,212,255,0.1)',
                }}
              >
                {loading && lastAction === 'summarize' ? (
                  <div className="w-4 h-4 border border-neon-blue/40 border-t-neon-blue rounded-full animate-spin" />
                ) : (
                  <span>📝</span>
                )}
                Generate Summary
              </motion.button>

              {(response || inputText) && (
                <button
                  onClick={handleClear}
                  className="px-4 py-3 rounded-xl font-mono text-xs text-white/30 hover:text-white/60 border border-white/8 hover:border-white/20 transition-all"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Output */}
            <AnimatePresence>
              {(loading || response) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="border-t border-white/5 pt-6">
                    <label className="font-mono text-xs text-white/30 tracking-widest mb-3 block flex items-center gap-2">
                      AI OUTPUT
                      {loading && (
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-neon-purple"
                        >
                          ● processing...
                        </motion.span>
                      )}
                    </label>
                    <div
                      className="rounded-xl p-5 font-body text-sm leading-relaxed min-h-[80px]"
                      style={{
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(139,92,246,0.15)',
                        color: response ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                              className="w-2 h-2 rounded-full bg-neon-purple"
                            />
                          ))}
                        </div>
                      ) : (
                        response
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-white/20 mt-6"
        >
          Powered by Spring Boot AI endpoint · POST /api/ai/improve · POST /api/ai/summarize
        </motion.p>
      </div>
    </section>
  )
}
