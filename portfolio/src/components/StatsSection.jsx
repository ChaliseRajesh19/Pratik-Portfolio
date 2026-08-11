import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const DEFAULT_STATS = [
  { value: 50, suffix: '+', label: 'PROJECTS DELIVERED' },
  { value: 5, suffix: '', label: 'YEARS OF EXPERIENCE' },
  { value: 12, suffix: '', label: 'COUNTRIES SERVED' },
  { value: 98, suffix: '%', label: 'CLIENT SATISFACTION' },
]

export default function StatsSection({
  stats = DEFAULT_STATS,
  title = '[ TRACK RECORD ]',
  className = ''
}) {
  const containerRef = useRef(null)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [counts, setCounts] = useState(() => stats.map(() => 0))
  const [showSuffixes, setShowSuffixes] = useState(() => stats.map(() => false))

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setHasTriggered(true)
      setCounts(stats.map((s) => s.value))
      setShowSuffixes(stats.map(() => true))
      return
    }

    let animFrameId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true)

          const duration = 1800 // 1.8 seconds
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)

            // Ease-out cubic formula
            const easeOutProgress = 1 - Math.pow(1 - progress, 3)

            setCounts(
              stats.map((stat) => Math.floor(easeOutProgress * stat.value))
            )

            // Reveal suffixes near the end (after 85% progress)
            if (progress >= 0.85) {
              setShowSuffixes(stats.map(() => true))
            }

            if (progress < 1) {
              animFrameId = requestAnimationFrame(animate)
            } else {
              setCounts(stats.map((stat) => stat.value))
              setShowSuffixes(stats.map(() => true))
            }
          }

          animFrameId = requestAnimationFrame(animate)
        } else {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId)
          }
          setHasTriggered(false)
          setCounts(stats.map(() => 0))
          setShowSuffixes(stats.map(() => false))
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(containerRef.current)

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId)
      }
      observer.disconnect()
    }
  }, [stats])

  return (
    <section
      ref={containerRef}
      className={`relative py-16 lg:py-20 bg-[#050505] border-t border-neutral-900 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header Bracket Label */}
        {title && (
          <div className="mb-10 text-center sm:text-left">
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#ff6b35] uppercase">
              {title}
            </span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center sm:items-start px-4 lg:px-8 first:pl-0 last:pr-0"
            >
              {/* Vertical divider line for desktop (lg screen between items) */}
              {idx > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hasTriggered ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * idx, ease: 'easeOut' }}
                  className="hidden lg:block absolute left-0 top-2 bottom-2 w-[1px] bg-neutral-800 origin-top"
                />
              )}

              {/* Horizontal divider line for mobile stacked items */}
              {idx > 0 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hasTriggered ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="block lg:hidden absolute -top-4 left-0 right-0 h-[1px] bg-neutral-850 origin-left"
                />
              )}

              {/* Animated Stat Value */}
              <div className="flex items-baseline font-bebas text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                <span className="tabular-nums">
                  {hasTriggered ? counts[idx] : 0}
                </span>
                <span
                  className={`ml-0.5 text-[#1e90ff] transition-opacity duration-300 ${
                    showSuffixes[idx] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Stat Label fading up */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: hasTriggered ? 1 : 0, y: hasTriggered ? 0 : 10 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
                className="mt-3 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-neutral-400 uppercase text-center sm:text-left"
              >
                {stat.label}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
