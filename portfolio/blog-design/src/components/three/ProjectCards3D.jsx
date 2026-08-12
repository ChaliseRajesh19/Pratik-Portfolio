import { useRef, useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   Theme palette per card index
───────────────────────────────────────────────────────────── */
const THEMES = [
  { from: '#06b6d4', to: '#3b82f6', glow: 'rgba(6,182,212,0.26)',   bg: 'rgba(6,182,212,0.08)'   },
  { from: '#a855f7', to: '#ec4899', glow: 'rgba(168,85,247,0.26)',  bg: 'rgba(168,85,247,0.08)'  },
  { from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.26)',  bg: 'rgba(16,185,129,0.08)'  },
  { from: '#f97316', to: '#ef4444', glow: 'rgba(249,115,22,0.26)',  bg: 'rgba(249,115,22,0.08)'  },
  { from: '#6366f1', to: '#a855f7', glow: 'rgba(99,102,241,0.26)',  bg: 'rgba(99,102,241,0.08)'  },
  { from: '#e879f9', to: '#6366f1', glow: 'rgba(232,121,249,0.26)', bg: 'rgba(232,121,249,0.08)' },
]

/* ─────────────────────────────────────────────────────────────
   Single 3D Tilt Card  —  original compact layout, new effects
───────────────────────────────────────────────────────────── */
function TiltCard({ work, isMobile, index, fullWidth = false }) {
  const cardRef   = useRef(null)
  const [tilt, setTilt]       = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
  const [hovered, setHovered] = useState(false)
  const navigate  = useNavigate()

  const theme = THEMES[index % THEMES.length]
  const num   = String(index + 1).padStart(2, '0')

  /* ── 3D tilt (desktop only) ─────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTilt({
      rotX:   -((y - rect.height / 2) / rect.height) * 13,
      rotY:    ((x - rect.width  / 2) / rect.width)  * 13,
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
      initial={{ opacity: 0, rotateX: -20, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{
        type: 'spring',
        stiffness: 130,
        damping: 18,
        delay: Math.min(index, 5) * 0.06,
      }}
      style={{
        perspective: '1400px',
        flexShrink: 0,
        width: fullWidth ? '100%' : isMobile ? '100%' : '300px',
      }}
      data-cursor="hover-card"
      data-cursor-label="Explore →"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/portfolio/${work.pagename}`)}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale(${hovered && !isMobile ? 1.04 : 1})`,
          transition: hovered ? 'transform 0.08s ease' : 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          cursor: 'pointer',
        }}
        className="relative w-full rounded-2xl select-none"
      >
        {/* ── Outer glow ring ─────────────────────────────── */}
        <div
          className="absolute -inset-px rounded-2xl"
          style={{
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
            boxShadow: `0 0 40px 5px ${theme.glow}, inset 0 0 0 1px ${theme.from}55`,
          }}
        />

        {/* ── Animated gradient border ─────────────────────── */}
        <div
          className="absolute -inset-[1px] rounded-2xl"
          style={{
            opacity: hovered ? 0.9 : 0.2,
            transition: 'opacity 0.35s ease',
            background: `linear-gradient(135deg, ${theme.from}66, transparent 45%, ${theme.to}44)`,
          }}
        />

        {/* ── Card body ────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(4, 10, 30, 0.90)',
            border: '1px solid rgba(255,255,255,0.065)',
            backdropFilter: 'blur(18px)',
          }}
        >
          {/* Diagonal accent strip top-right */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
              opacity: hovered ? 0.18 : 0.10,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Radial mesh glow on hover */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${theme.bg}, transparent)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.45s ease',
            }}
          />

          {/* Mouse-follow glare */}
          {hovered && !isMobile && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.07), transparent 62%)`,
              }}
            />
          )}

          {/* ── Content block ─────────────────────────────── */}
          <div
            className="relative p-7"
            style={{
              transform: hovered ? 'translateZ(28px)' : 'translateZ(0px)',
              transition: 'transform 0.4s cubic-bezier(0.25,1,0.5,1)',
            }}
          >
            {/* Icon + title row */}
            <div className="flex items-center gap-4 mb-5">
              {/* Icon badge */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 transition-all duration-400"
                style={{
                  background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                  boxShadow: hovered ? `0 0 22px ${theme.glow}` : `0 4px 12px ${theme.glow}`,
                  transform: hovered ? 'scale(1.08) translateY(-2px)' : 'scale(1) translateY(0)',
                }}
              >
                <span className="text-2xl leading-none select-none">
                  {work.icon || '🎨'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug transition-colors duration-300"
                  style={{ color: hovered ? '#fff' : '#f1f5f9' }}>
                {work.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-7 transition-colors duration-300"
               style={{ color: hovered ? '#94a3b8' : '#64748b' }}>
              {work.description || 'Explore curated visual works in this category.'}
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-between">
              <span
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest"
                style={{
                  color: hovered ? theme.from : 'rgba(148,163,184,0.5)',
                  transition: 'color 0.3s ease',
                }}
              >
                Explore Works
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{
                    transform: hovered ? 'translateX(5px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </span>

              {/* Animated dots */}
              <div className="flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      height: '4px',
                      width: hovered && i === 0 ? '14px' : '4px',
                      background: hovered ? theme.from : 'rgba(255,255,255,0.12)',
                      transition: 'all 0.35s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Ghost index number — bottom right */}
          <div
            className="absolute bottom-4 right-5 select-none pointer-events-none font-black"
            style={{
              fontSize: '4.5rem',
              lineHeight: 1,
              color: theme.from,
              opacity: hovered ? 0.10 : 0.06,
              transition: 'opacity 0.4s ease',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {num}
          </div>

          {/* Animated bottom sweep border */}
          <div
            className="absolute bottom-0 left-0 h-[2px] rounded-b-full"
            style={{
              width: hovered ? '100%' : '0%',
              background: `linear-gradient(90deg, ${theme.from}, ${theme.to})`,
              transition: 'width 0.6s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   View All Button
───────────────────────────────────────────────────────────── */
function ViewAllBtn() {
  return (
    <div className="relative z-20 mt-12 flex justify-center">
      <motion.div whileHover={{ y: -3, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/portfolio"
          className="group inline-flex items-center gap-3 rounded-full border px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-300"
          style={{
            border: '1px solid rgba(99,102,241,0.35)',
            background: 'rgba(99,102,241,0.08)',
            color: '#a5b4fc',
            boxShadow: '0 16px 48px rgba(99,102,241,0.12)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background  = 'rgba(99,102,241,0.18)'
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.65)'
            e.currentTarget.style.color       = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background  = 'rgba(99,102,241,0.08)'
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'
            e.currentTarget.style.color       = '#a5b4fc'
          }}
        >
          <span>View All Works</span>
          <svg
            xmlns="http://www.w3.org/2000/svg" width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:translate-x-1.5 transition-transform duration-300"
          >
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ProjectCards3D — main export
───────────────────────────────────────────────────────────── */
export function ProjectCards3D({ works, limit = null, showViewAll = false, layout = 'rail' }) {
  const isMobile  = typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches
  const scrollRef = useRef(null)

  const effectiveLimit = limit !== null ? (isMobile ? Math.max(1, limit - 1) : limit) : null
  const displayedWorks = works.slice(0, effectiveLimit ?? works.length)
  const hasMore        = showViewAll && works.length > displayedWorks.length

  /* ── Wheel → horizontal scroll, release when rail is at ends ── */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handler = (e) => {
      // Only intercept vertical wheel deltas
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return

      const atStart = el.scrollLeft <= 0
      const atEnd   = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2

      // If already at the edge in the direction of scroll → let page scroll
      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return

      // Otherwise consume the event and scroll the rail
      e.preventDefault()
      el.scrollLeft += e.deltaY * 2.6
    }

    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  /* ── Grid layout (standalone /portfolio page) ─────────────── */
  if (layout === 'grid') {
    return (
      <div className="px-4 md:px-6 xl:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {displayedWorks.map((work, i) => (
            <TiltCard key={work.id} work={work} isMobile={isMobile} index={i} fullWidth />
          ))}
        </div>
        {hasMore && <ViewAllBtn />}
      </div>
    )
  }

  /* ── Mobile vertical sticky stack ─────────────────────────── */
  if (isMobile) {
    return (
      <>
        <div className="flex flex-col gap-4 px-4 pb-6">
          {displayedWorks.map((work, i) => (
            <div
              key={work.id}
              className="sticky"
              style={{ top: `calc(72px + ${i * 10}px)`, zIndex: i }}
            >
              <TiltCard work={work} isMobile index={i} />
            </div>
          ))}
        </div>
        {hasMore && <ViewAllBtn />}
      </>
    )
  }

  /* ── Desktop horizontal rail ──────────────────────────────── */
  return (
    <>
      <div className="relative">
        {/* Left / right edge fade masks */}
        <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-8 pt-2 px-16 w-full hide-scrollbar"
        >
          {displayedWorks.map((work, i) => (
            <TiltCard key={work.id} work={work} isMobile={false} index={i} />
          ))}
        </div>
      </div>
      {hasMore && <ViewAllBtn />}
    </>
  )
}

export default ProjectCards3D
