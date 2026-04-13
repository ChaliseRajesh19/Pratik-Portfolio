import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { getPreferredEmailHref, openPreferredEmail } from '../lib/email'

function ServiceModal({ service, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Randomize a nice theme color based on title length
  const hue = (service.title.length * 15) % 360
  const themeColor = `hsl(${hue}, 80%, 60%)`
  const themeGlow = `hsla(${hue}, 80%, 60%, 0.3)`

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: 'rgba(2, 6, 23, 0.85)', perspective: '2000px' }}
      onClick={onClose}
    >
      {/* ── AWESOME 3D MODAL WINDOW ──────────────────────── */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateX: 45, rotateY: 20, y: 150, z: -500 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, rotateY: 0, y: 0, z: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: -30, rotateY: -10, y: -100, z: -300 }}
        transition={{ type: 'spring', stiffness: 100, damping: 22, mass: 1.2 }}
        onClick={(e) => e.stopPropagation()} // Prevent close
        className="relative w-full max-w-4xl my-auto overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl flex-shrink-0"
        style={{
          background: 'rgba(10, 15, 35, 0.95)',
          boxShadow: `0 60px 150px -20px ${themeGlow}, inset 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
      >
        {/* Animated Background Mesh */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle at 30% 0%, ${themeGlow}, transparent 60%)`
          }}
        />

        {/* ── Single Panel Content ── */}
        <div className="relative z-10 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
          {/* Close Button X (Top Right) */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-500/30"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="mt-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${themeColor}33, rgba(2,6,23,0.8))`,
                border: `1px solid ${themeColor}60`,
                boxShadow: `0 0 40px ${themeGlow}`,
              }}
            >
              {service.icon ? (
                <img src={service.icon} alt={service.title} className="w-14 h-14 object-contain" />
              ) : (
                <span className="text-5xl">✦</span>
              )}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: 'spring', damping: 20 }}
              className="mb-5 text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
            >
              {service.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', damping: 20 }}
              className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              {service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex"
            >
              <motion.a
                href={getPreferredEmailHref()}
                onClick={(e) => {
                   e.preventDefault();
                   openPreferredEmail();
                   onClose();
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 35px ${themeGlow}` }}
                whileTap={{ scale: 0.96 }}
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full font-bold px-10 py-4 transition-all duration-300"
                style={{
                  background: '#f8fafc',
                  color: '#0f172a',
                }}
              >
                {/* Shine effect on hover */}
                <div
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)',
                  }}
                />
                <span className="relative z-10 uppercase tracking-[0.2em] text-[12px] font-black">Hire Me</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ServiceModal
