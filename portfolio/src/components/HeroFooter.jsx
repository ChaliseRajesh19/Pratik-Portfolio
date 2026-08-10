import React from 'react'
import { motion } from 'framer-motion'

export default function HeroFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-[11px] sm:text-xs tracking-[0.2em] text-neutral-500 uppercase font-medium select-none"
    >
      <div>
        PORTFOLIO V.3 &nbsp;/&nbsp; TOKYO - PARIS
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 text-brand hover:text-white transition-colors cursor-pointer group"
      >
        <span>SCROLL TO BEGIN</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          ↓
        </motion.span>
      </motion.div>
    </motion.footer>
  )
}
