import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Check } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { gsap } from 'gsap'

export default function HeroFooter({ timeline }) {
  const { settings } = useContent()
  const cvUrl = settings?.cvUrl || '/cv/pratik-bhusal-cv.pdf'

  const [isHovered, setIsHovered] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  // Magnetic button ref
  const cvBtnRef = useRef(null)
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 })

  // GSAP entrance refs
  const roleRef = useRef(null)
  const cvRef = useRef(null)
  const scrollRef = useRef(null)
  const footerRef = useRef(null)

  const text = 'SCROLL TO BEGIN'

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  // Handle Download Click Feedback
  const handleDownloadClick = () => {
    setIsDownloaded(true)
    setTimeout(() => {
      setIsDownloaded(false)
    }, 1400)
  }

  // Magnetic pull on CV button
  const handleMouseMoveCV = (e) => {
    if (!cvBtnRef.current || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = cvBtnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const distance = Math.hypot(distanceX, distanceY)
    if (distance < 50) {
      setMagneticPos({ x: distanceX * 0.15, y: distanceY * 0.15 })
    } else {
      setMagneticPos({ x: 0, y: 0 })
    }
  }

  const handleMouseLeaveCV = () => {
    setMagneticPos({ x: 0, y: 0 })
    setBtnHovered(false)
  }

  // GSAP entrance fade up
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set([roleRef.current, cvRef.current, scrollRef.current].filter(Boolean), {
        opacity: 1,
        y: 0
      })
      return
    }

    const ctx = gsap.context(() => {
      const targets = [roleRef.current, cvRef.current, scrollRef.current].filter(Boolean)
      
      gsap.set(targets, { opacity: 0, y: 12 })

      const targetTl = timeline || gsap.timeline({ delay: 0.8 })

      targetTl.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }, 0.8)
    }, footerRef)

    return () => ctx.revert()
  }, [timeline])

  return (
    <footer
      ref={footerRef}
      className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-[11px] sm:text-xs tracking-[0.2em] text-neutral-500 uppercase font-medium select-none"
    >
      {/* Left side: Role Label + Divider + Download CV Button */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Role Label */}
        <span ref={roleRef} className="font-mono text-neutral-400 font-medium">
          GRAPHIC DESIGNER &nbsp;/&nbsp; ART WORKER
        </span>

        {/* Vertical Divider */}
        <span className="hidden sm:inline-block w-[1px] h-3.5 bg-neutral-800" />

        {/* Download CV Ghost Button */}
        <motion.div
          ref={cvRef}
          onMouseMove={handleMouseMoveCV}
          onMouseLeave={handleMouseLeaveCV}
          onMouseEnter={() => setBtnHovered(true)}
          animate={{ x: magneticPos.x, y: magneticPos.y }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        >
          <motion.a
            ref={cvBtnRef}
            href={cvUrl}
            download="pratik-bhusal-cv.pdf"
            onClick={handleDownloadClick}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 hover:border-[#ff6b35] bg-transparent text-neutral-300 hover:text-white font-mono text-[10px] sm:text-[11px] tracking-wider uppercase transition-colors duration-200 cursor-pointer shadow-sm"
          >
            {/* Morphing Icon Container */}
            <AnimatePresence mode="wait">
              {isDownloaded ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#ff6b35]"
                >
                  <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </motion.span>
              ) : (
                <motion.span
                  key="download"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: btnHovered ? [0, 2, 0] : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-neutral-400 group-hover:text-[#ff6b35] transition-colors"
                >
                  <Download className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </motion.span>
              )}
            </AnimatePresence>

            <span>{isDownloaded ? 'DOWNLOADED' : 'DOWNLOAD CV'}</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Right side: SCROLL TO BEGIN ↓ */}
      <div
        ref={scrollRef}
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

        {/* Down Arrow */}
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
      </div>
    </footer>
  )
}
