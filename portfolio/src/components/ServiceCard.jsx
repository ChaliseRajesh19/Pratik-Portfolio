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
      viewport={{ once: false, amount: 0.2 }}
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
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.15), inset 0 0 0 1px rgba(6, 182, 212, 0.3)',
          }}
        />

        {/* Card backdrop - Deep Premium Blue */}
        <div className="absolute inset-0 rounded-2xl border border-blue-900/40 bg-[#061230]/80 backdrop-blur-xl overflow-hidden group-hover:bg-[#061230]/90 transition-colors duration-500">
          {/* Sweeping diagonal gradient line on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent -translate-x-[100%] -translate-y-[100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 ease-out" />
          </div>
        </div>

        {/* Mouse follow glare */}
        {hovered && !isMobile && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.08), transparent 60%)`,
            }}
          />
        )}

        {/* Card Content (translated out in Z-space) */}
        <div 
          className="relative h-full p-8 flex flex-col items-start z-20" 
          style={{ 
            transform: hovered ? 'translateZ(40px)' : 'translateZ(20px)',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' 
          }}
        >
          {/* Icon Badge & Title */}
          <div className="flex items-center gap-5 mb-5 w-full">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/40 to-[#020617] shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] flex items-center justify-center flex-shrink-0 border border-blue-800/30 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500">
              <img src={icon} alt={title} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {title}
            </h3>
          </div>
          
          <div className="relative mt-2 pl-4">
            {/* Animated left border line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-900/50 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
