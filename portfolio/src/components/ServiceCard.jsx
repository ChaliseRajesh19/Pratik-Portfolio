import React, { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   Animated border gradient colours per index
───────────────────────────────────────────────────────────── */
const THEMES = [
  { border: '#06b6d4', glow: 'rgba(6,182,212,0.22)',  bg: 'rgba(6,182,212,0.06)',  num: '#06b6d4' },
  { border: '#a78bfa', glow: 'rgba(167,139,250,0.22)', bg: 'rgba(167,139,250,0.06)', num: '#a78bfa' },
  { border: '#34d399', glow: 'rgba(52,211,153,0.22)',  bg: 'rgba(52,211,153,0.06)', num: '#34d399' },
  { border: '#f97316', glow: 'rgba(249,115,22,0.22)',  bg: 'rgba(249,115,22,0.06)', num: '#f97316' },
  { border: '#e879f9', glow: 'rgba(232,121,249,0.22)', bg: 'rgba(232,121,249,0.06)', num: '#e879f9' },
  { border: '#38bdf8', glow: 'rgba(56,189,248,0.22)',  bg: 'rgba(56,189,248,0.06)', num: '#38bdf8' },
]

function ServiceCard({ icon, title, description, index, onClick }) {
  const cardRef  = useRef(null)
  const [tilt, setTilt]     = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
  const [hovered, setHovered] = useState(false)

  const theme = THEMES[index % THEMES.length]
  const num   = String(index + 1).padStart(2, '0')

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTilt({
      rotX:   -((y - rect.height / 2) / rect.height) * 14,
      rotY:    ((x - rect.width  / 2) / rect.width)  * 14,
      glareX: (x / rect.width)  * 100,
      glareY: (y / rect.height) * 100,
    })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
    setHovered(false)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: '1200px' }}
      className="w-full h-full"
      data-cursor="hover-card"
      data-cursor-label="View"
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full cursor-pointer"
        style={{
          transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
          transition: hovered ? 'transform 0.08s ease' : 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* ── Outer glow ring ─────────────────────────────── */}
        <div
          className="absolute -inset-px rounded-2xl transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: `0 0 40px 4px ${theme.glow}, inset 0 0 0 1px ${theme.border}55`,
          }}
        />

        {/* ── Animated gradient border ─────────────────────── */}
        <div
          className="absolute -inset-[1.5px] rounded-2xl transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0.25,
            background: `linear-gradient(135deg, ${theme.border}55, transparent 40%, ${theme.border}33)`,
            borderRadius: 'inherit',
          }}
        />

        {/* ── Card shell ────────────────────────────────────── */}
        <div
          className="relative h-full rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: 'rgba(2, 6, 23, 0.85)',
            border: `1px solid rgba(255,255,255,0.07)`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top gradient mesh */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${theme.bg}, transparent)`,
              opacity: hovered ? 1 : 0.5,
            }}
          />

          {/* Noise grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Mouse glare */}
          {hovered && !isMobile && (
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.07), transparent 55%)`,
              }}
            />
          )}

          {/* ── Content ─────────────────────────────────────── */}
          <div
            className="relative z-20 p-7 flex flex-col h-full"
            style={{
              transform: hovered ? 'translateZ(32px)' : 'translateZ(0px)',
              transition: 'transform 0.4s cubic-bezier(0.25,1,0.5,1)',
            }}
          >
            {/* Top row: icon + number */}
            <div className="flex items-start justify-between mb-6">
              {/* Icon badge */}
              <div
                className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 transition-all duration-500"
                style={{
                  background: hovered
                    ? `linear-gradient(135deg, ${theme.border}28, rgba(2,6,23,0.8))`
                    : 'rgba(15,23,42,0.9)',
                  border: `1px solid ${hovered ? theme.border + '60' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: hovered ? `0 0 20px ${theme.glow}` : 'none',
                }}
              >
                {icon
                  ? <img src={icon} alt={title} className="w-9 h-9 object-contain" />
                  : <span className="text-2xl">✦</span>
                }
              </div>

              {/* Ghost number */}
              <span
                className="font-black text-5xl leading-none select-none transition-opacity duration-500"
                style={{
                  color: theme.num,
                  opacity: hovered ? 0.2 : 0.08,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {num}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-xl font-bold mb-3 leading-snug transition-colors duration-300"
              style={{ color: hovered ? theme.border : '#f8fafc' }}
            >
              {title}
            </h3>

            {/* Description */}
            <p className="text-[0.83rem] text-slate-400 leading-relaxed flex-1 transition-colors duration-300 group-hover:text-slate-300 line-clamp-3">
              {description}
            </p>

            {/* Bottom accent bar */}
            <div className="mt-6 pt-5 border-t border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div
                  className="h-[2px] rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: hovered ? '100%' : '24px',
                    background: `linear-gradient(90deg, ${theme.border}, ${theme.border}44)`,
                  }}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap"
                  style={{ color: hovered ? theme.border : 'rgba(148,163,184,0.4)' }}
                >
                  {hovered ? 'Hire Me' : 'Service'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
