import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * SectionHeader — shared premium 3-element animated header.
 *
 * Each of the three parts has a distinct, sequenced animation:
 *  1. Eyebrow label  → clips up from a masked line (typewriter-style reveal)
 *  2. Main heading   → each word flips in with a 3D Y perspective
 *  3. Subtitle       → smooth fade + slight upward drift after heading settles
 */
export function SectionHeader({ label, title, subtitle, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })

  const words = title.split(' ')

  return (
    <div ref={ref} className={`text-center max-w-2xl mx-auto mb-16 ${className}`}>

      {/* 1 ── Eyebrow label: clip-reveal from left */}
      <div className="overflow-hidden mb-4">
        <motion.p
          animate={inView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm uppercase tracking-[0.35em] text-blue-400 font-black"
        >
          {label}
        </motion.p>
      </div>

      {/* 2 ── Main heading: each word flips in on 3D Y axis */}
      <h2 className="text-4xl md:text-5xl font-black text-white mb-5 overflow-hidden"
          style={{ perspective: 800 }}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              animate={inView
                ? { rotateX: 0, opacity: 1, y: 0 }
                : { rotateX: -80, opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: 'bottom center', display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* 3 ── Subtitle: soft fade after heading is settled */}
      {subtitle && (
        <motion.p
          animate={inView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 16, filter: 'blur(4px)' }}
          transition={{ duration: 0.65, delay: 0.15 + words.length * 0.08, ease: 'easeOut' }}
          className="text-slate-400 leading-relaxed font-medium"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
