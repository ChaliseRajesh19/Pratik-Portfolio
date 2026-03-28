import { useRef, useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Color themes per card index — each card gets a unique gradient.
 */
const GRADIENTS = [
  { from: '#06b6d4', to: '#3b82f6' }, // cyan → blue
  { from: '#a855f7', to: '#ec4899' }, // purple → pink
  { from: '#10b981', to: '#06b6d4' }, // emerald → cyan
  { from: '#f97316', to: '#ef4444' }, // orange → red
  { from: '#6366f1', to: '#a855f7' }, // indigo → purple
]

/**
 * Single portfolio card with CSS 3D perspective tilt on mouse hover.
 * Clicking anywhere on the card navigates to the category work page.
 */
function TiltCard({ work, isMobile, index, fullWidth = false }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const gradient = GRADIENTS[index % GRADIENTS.length]

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width  / 2
    const cy = rect.height / 2
    setTilt({
      rotX:   -((y - cy) / cy) * 12,
      rotY:    ((x - cx) / cx) * 12,
      glareX: (x / rect.width)  * 100,
      glareY: (y / rect.height) * 100,
    })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
    setHovered(false)
  }, [])

  const destination = `/portfolio/${work.pagename}`

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -28, rotateY: 12, y: 72, z: -120, scale: 0.88 }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0, z: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.02 }}
      transition={{ 
        type: 'spring', 
        stiffness: 150, 
        damping: 18, 
        mass: 0.9,
        delay: Math.min(index, 4) * 0.045 
      }}
      style={{
        perspective: '1500px',
        flexShrink: 0,
        width: fullWidth ? '100%' : isMobile ? '100%' : '300px',
      }}
      className="group"
    >
      {/* Entire card is clickable */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(destination)}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale(${hovered && !isMobile ? 1.04 : 1})`,
          transition: hovered ? 'transform 0.08s ease' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          cursor: 'pointer',
        }}
        className="relative w-full h-full rounded-2xl overflow-hidden"
      >
      {/* Outer glow border (visible on hover) */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: `0 0 28px 2px ${gradient.from}55, inset 0 0 0 1px ${gradient.from}44`,
        }}
      />

      {/* Dark card base */}
      <div className="absolute inset-0 rounded-2xl border border-slate-700/40 bg-slate-900/90 backdrop-blur-sm" />

      {/* Diagonal gradient accent strip at top-right */}
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-bl-[5rem] opacity-15"
        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
      />

      {/* Mouse-follow glare effect */}
      {hovered && !isMobile && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.07), transparent 65%)`,
          }}
        />
      )}

      {/* Card content — translate-z pushes it "out" of the card plane */}
      <div className="relative p-8" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center gap-4 mb-5">
          {/* Icon badge */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-3xl flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
          >
            {work.icon || '🎨'}
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">{work.title}</h3>
        </div>
        <p  className="text-slate-400 text-sm leading-relaxed mb-7">{work.description}</p>

        {/* "Explore Works" arrow — visual only, card click handles navigation */}
        <span
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-200"
          style={{ color: gradient.from }}
        >
          Explore Works
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16" height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-1.5 transition-transform duration-300"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>

      {/* Bottom number label */}
      <div
        className="absolute bottom-5 right-6 text-5xl font-black select-none pointer-events-none"
        style={{ color: gradient.from, opacity: 0.07 }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      </div>
    </motion.div>
  )
}

/**
 * ProjectCards3D — the portfolio section renderer.
 *
 * Desktop: horizontal scrollable row of 3D-tilt cards with fade-edge masks.
 * Mobile:  regular vertical stack (no heavy 3D).
 *
 * @param {{ works: Array, limit: number|null, showViewAll: boolean, layout: string }} props
 */
export function ProjectCards3D({
  works,
  limit = null,
  showViewAll = false,
  layout = 'rail',
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const scrollContainerRef = useRef(null)
  const navigate = useNavigate()

  // On mobile show 1 fewer card (5 vs 6)
  const mobileLimit = limit !== null ? Math.max(1, limit - 1) : null
  const effectiveLimit = isMobile ? mobileLimit : limit
  const maxCards = effectiveLimit !== null ? effectiveLimit : works.length
  const displayedWorks = works.slice(0, maxCards)
  const hasMore = showViewAll && works.length > maxCards

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const handleWheel = (e) => {
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY * 2.5
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const ViewAllBtn = () => (
    <div className="relative z-20 mt-10 flex justify-center">
      <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/portfolio"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-300 shadow-[0_18px_50px_rgba(8,145,178,0.14)] transition-all duration-300 hover:border-cyan-300/55 hover:bg-cyan-400/[0.14] hover:text-white hover:shadow-[0_24px_60px_rgba(8,145,178,0.24)]"
        >
          <span>View All Works</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  )

  if (layout === 'grid') {
    return (
      <div className="px-4 md:px-6 xl:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayedWorks.map((work, i) => (
            <TiltCard
              key={work.id}
              work={work}
              isMobile={isMobile}
              index={i}
              fullWidth
            />
          ))}
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <>
        <div className="flex flex-col gap-6 px-4 pb-8 relative">
          {displayedWorks.map((work, i) => (
            <div 
              key={work.id} 
              className="sticky"
              style={{ top: `calc(84px + ${i * 12}px)`, zIndex: i }}
            >
              <TiltCard work={work} isMobile index={i} />
            </div>
          ))}
        </div>
        {hasMore && <ViewAllBtn />}
      </>
    )
  }

  return (
    <>
      <div className="relative">
        {/* Left + right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 px-16 w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
