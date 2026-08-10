import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroFooter() {
  const [isHovered, setIsHovered] = useState(false)
  const text = 'SCROLL TO BEGIN'

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-[11px] sm:text-xs tracking-[0.2em] text-neutral-500 uppercase font-medium select-none"
    >
      {/* Left side text */}
      <div>
        GRAPHIC DESIGNER &nbsp;/&nbsp; ART WORKER
      </div>

      {/* Right side: SCROLL TO BEGIN ↓ with low opacity initial state and letter-by-letter hover reveal */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={scrollToNext}
        className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded group"
      >
        <div className="flex">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              animate={{
                opacity: isHovered ? 1 : 0.25,
                color: isHovered ? '#1e90ff' : '#6b7280',
                y: isHovered ? -1 : 0,
              }}
              transition={{
                duration: 0.2,
                delay: isHovered ? index * 0.035 : (text.length - index) * 0.015,
                ease: 'easeOut',
              }}
              className="inline-block transition-colors"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Down Arrow with low initial opacity and hover illumination */}
        <motion.span
          animate={{
            opacity: isHovered ? 1 : 0.3,
            color: isHovered ? '#1e90ff' : '#6b7280',
            y: isHovered ? [0, 5, 0] : 0,
          }}
          transition={{
            y: isHovered ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : {},
            duration: 0.2,
            delay: isHovered ? text.length * 0.035 : 0,
          }}
          className="inline-block ml-1 font-bold text-sm"
        >
          ↓
        </motion.span>
      </motion.div>
    </motion.footer>
  )
}
