import { useRef, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
 * On mobile (isMobile=true) the tilt is disabled for performance,
 * but the glare and gradient still apply.
 */
function TiltCard({ work, isMobile, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
  const [hovered, setHovered] = useState(false)

  const gradient = GRADIENTS[index % GRADIENTS.length]

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width  / 2
    const cy = rect.height / 2
    setTilt({
      rotX:   -((y - cy) / cy) * 12, // tilt up when mouse is at top
      rotY:    ((x - cx) / cx) * 12, // tilt right when mouse is at right
      glareX: (x / rect.width)  * 100,
      glareY: (y / rect.height) * 100,
    })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
    setHovered(false)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        // CSS 3D perspective tilt — the core "3D card" effect
        transform: `perspective(1000px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale(${hovered && !isMobile ? 1.04 : 1})`,
        transition: hovered ? 'transform 0.08s ease' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        // Card width: fixed on desktop so horizontal scroll shows them offset
        flexShrink: 0,
        width: isMobile ? '100%' : '300px',
      }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
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
        {/* Icon badge */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
        >
          {/* Palette icon — thematically matches graphic design */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26" height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="white" />
            <circle cx="17.5" cy="10.5" r=".5" fill="white" />
            <circle cx="8.5"  cy="7.5"  r=".5" fill="white" />
            <circle cx="6.5"  cy="12.5" r=".5" fill="white" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 leading-snug">{work.title}</h3>
        <p  className="text-slate-400 text-sm leading-relaxed mb-7">{work.description}</p>

        <Link to={`/portfolio/${work.pagename}`}>
          <button
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
          </button>
        </Link>
      </div>

      {/* Bottom number label */}
      <div
        className="absolute bottom-5 right-6 text-5xl font-black select-none pointer-events-none"
        style={{ color: gradient.from, opacity: 0.07 }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

/**
 * ProjectCards3D — the portfolio section renderer.
 *
 * Desktop: horizontal scrollable row of 3D-tilt cards with fade-edge masks.
 * Mobile:  regular vertical stack (no heavy 3D).
 *
 * @param {{ works: Array }} props  The same `works` array used in Portfolio.jsx
 */
export function ProjectCards3D({ works }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const handleWheel = (e) => {
      // Prioritize vertical scroll events over horizontal trackpad swipes to translate
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        // Multiply by 2.5 to make the horizontal scroll pleasantly fast
        el.scrollLeft += e.deltaY * 2.5
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-6 px-4 pb-8">
        {works.map((work, i) => (
          <TiltCard key={work.id} work={work} isMobile index={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Left + right fade masks so cards disappear into the edges nicely */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Horizontal scroll container — CSS hide-scrollbar */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-16 w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {works.map((work, i) => (
          <TiltCard key={work.id} work={work} isMobile={false} index={i} />
        ))}
      </div>

      <p className="text-center text-slate-600 text-xs mt-1 tracking-widest uppercase">
        ← Drag or Scroll →
      </p>
    </div>
  )
}
