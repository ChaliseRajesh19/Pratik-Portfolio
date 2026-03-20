import React, { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * A modern 3D glassmorphic Service Card with mouse-follow perspective tilt.
 */
function ServiceCard({ icon, title, description, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
  const [hovered, setHovered] = useState(false)

  // Only apply tilt on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    setTilt({
      rotX: -((y - cy) / cy) * 10,
      rotY: ((x - cx) / cx) * 10,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
    setHovered(false)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      // Intercept ref for motion and our own interactions
      style={{ perspective: '1000px' }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl group cursor-default"
        style={{
          transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Glow behind card on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: '0 0 40px rgba(34,211,238,0.15), inset 0 0 0 1px rgba(34,211,238,0.25)',
          }}
        />

        {/* Card backdrop */}
        <div className="absolute inset-0 rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-md" />

        {/* Mouse follow glare */}
        {hovered && !isMobile && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.06), transparent 70%)`,
            }}
          />
        )}

        {/* Card Content (translated out in Z-space) */}
        <div className="relative h-full p-8 flex flex-col items-start" style={{ transform: 'translateZ(30px)' }}>
          {/* Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-slate-900 shadow-inner flex items-center justify-center mb-6 border border-slate-700/50 group-hover:border-cyan-500/50 transition-colors duration-300">
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          </div>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-3 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-700 pl-4 group-hover:border-cyan-500 transition-colors duration-300 mt-2">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard