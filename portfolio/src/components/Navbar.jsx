import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import pratikIcon from '../assets/Pratik icon.png'
import { useContent } from '../context/ContentContext'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Works', path: '/works' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/#contact' },
]

const getWhatsappUrl = (val) => {
  if (!val) return 'https://wa.me/9779800000000'
  if (val.startsWith('http://') || val.startsWith('https://')) return val
  const cleaned = val.replace(/[^\d+]/g, '')
  return `https://wa.me/${cleaned.replace('+', '')}`
}

export default function Navbar() {
  const { settings } = useContent()
  const location = useLocation()
  const currentPath = location.pathname
  const hash = location.hash

  const [isMounted, setIsMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Magnetic button state
  const btnRef = useRef(null)
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 })

  // Determine active nav index based on path and hash
  const getActiveIndex = () => {
    if (currentPath === '/works' || currentPath.startsWith('/works/')) return 1
    if (currentPath === '/about') return 2
    if (currentPath === '/blog' || currentPath.startsWith('/blog/')) return 3
    if (hash === '#contact') return 4
    if (currentPath === '/') return 0
    return 0
  }

  const activeIdx = getActiveIndex()

  const [showFullNav, setShowFullNav] = useState(true)
  const lastScrollY = useRef(0)
  const idleTimer = useRef(null)
  const ticking = useRef(false)

  // Track scroll position, direction, and idle settle to compact state
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0
      setScrollProgress(progress)

      const isAtTop = currentScrollY <= 60
      const isScrollingUp = currentScrollY < lastScrollY.current

      if (isAtTop) {
        setShowFullNav(true)
        setIsScrolled(false)
      } else {
        setIsScrolled(true)
        if (isScrollingUp) {
          setShowFullNav(true)
        } else {
          // Scrolling down
          setShowFullNav(false)
        }
      }

      lastScrollY.current = currentScrollY

      // Settle into compact state after 250ms idle (no scroll movement)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        if (window.scrollY > 60) {
          setShowFullNav(false)
        }
      }, 250)

      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll)
        ticking.current = true
      }
    }

    handleScroll() // Initialize state
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [currentPath])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileOpen])

  // Magnetic button hover handler
  const handleMouseMoveCTA = (e) => {
    if (!btnRef.current || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const distance = Math.hypot(distanceX, distanceY)
    if (distance < 80) {
      setMagneticPos({ x: distanceX * 0.2, y: distanceY * 0.2 })
    } else {
      setMagneticPos({ x: 0, y: 0 })
    }
  }

  const handleMouseLeaveCTA = () => {
    setMagneticPos({ x: 0, y: 0 })
  }

  // Handle Logo & Monogram click: smooth scroll to top/hero section
  const handleLogoClick = (e) => {
    setIsMobileOpen(false)
    if (currentPath === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Smooth scroll handler for anchor links (#contact, #expertise)
  const handleNavClick = (path) => {
    setIsMobileOpen(false)
    if (path.includes('#')) {
      const [targetPath, targetHash] = path.split('#')
      if (currentPath === targetPath || (targetPath === '' && currentPath === '/')) {
        const el = document.getElementById(targetHash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <>

      {/* ── 2. MAIN NAVIGATION HEADER (Premium Dark Editorial Glass Bar) ─ */}
      <header
        style={{ zIndex: 999999 }}
        className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-auto ${
          showFullNav
            ? 'bg-[#0c0c0c]/95 border-b border-neutral-800/90 py-3 sm:py-4 shadow-2xl backdrop-blur-lg'
            : 'bg-[#0c0c0c]/95 border-b border-neutral-800/90 py-3 sm:py-3 shadow-2xl backdrop-blur-lg md:bg-transparent md:border-transparent md:shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">

          {/* ── LEFT: AVATAR & BRAND WORDMARK (DESKTOP) ───────────────────── */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className={`group hidden md:flex items-center gap-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 ${
              showFullNav ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            aria-label="Pratik Bhusal Homepage"
          >
            {/* Circular Avatar */}
            <div className="relative w-9 sm:w-10 h-9 sm:h-10 rounded-full overflow-hidden border border-neutral-800 bg-[#0a0a0a] shrink-0 shadow-md">
              <img
                src={pratikIcon}
                alt="Pratik Bhusal"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
              />
            </div>

            {/* Wordmark */}
            <span className="font-bebas text-base sm:text-lg tracking-wider text-neutral-300 group-hover:text-white group-hover:tracking-widest transition-all duration-300 uppercase select-none">
              PRATIK BHUSAL
            </span>
          </Link>

          {/* ── CENTER: PILL-SHAPED NAVIGATION CONTAINER (DESKTOP) ───────── */}
          <nav
            className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-[#0c0c0c]/90 border border-neutral-800/80 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.7)] z-20 pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeIdx === idx
              const isHovered = hoveredIdx === idx

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-4 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-colors duration-200 select-none ${
                    isActive
                      ? 'text-black font-bold'
                      : 'text-neutral-400 hover:text-white font-medium'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active White Pill Background (Fades & scales gently in place) */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_12px_rgba(255,255,255,0.25)] z-0"
                    />
                  )}

                  {/* Hover Preview Background Pill */}
                  {isHovered && !isActive && (
                    <div className="absolute inset-0 rounded-full bg-neutral-800/60 z-0 transition-opacity duration-150" />
                  )}

                  {/* Label Text */}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* ── RIGHT: "HIRE ME" BUTTON + MAGNETIC "GET IN TOUCH" BUTTON ───── */}
          <div
            className={`hidden md:flex items-center gap-4 z-20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              showFullNav ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {/* Custom HIRE ME Button with sliding hover fill from right */}
            <a
              href={`mailto:${settings?.contactEmail || 'pratikbhusal12345@gmail.com'}`}
              data-magnetic="true"
              className="group relative overflow-hidden px-4 py-2 rounded-full border border-neutral-800 hover:border-[#1e90ff] bg-transparent text-neutral-400 hover:text-white font-bold font-mono text-xs tracking-wider uppercase cursor-pointer select-none transition-all duration-300"
            >
              {/* Blue Background Fill Slide-in from Right */}
              <span className="absolute inset-0 bg-[#1e90ff] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />

              <span className="magnetic-inner relative z-10 block">HIRE ME</span>
            </a>

            <div
              data-magnetic="true"
              className="inline-block"
            >
              <a
                href={getWhatsappUrl(settings?.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-100 text-black font-bold font-mono text-xs tracking-wider uppercase flex items-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <span className="magnetic-inner flex items-center gap-2.5">
                  <span>LET&apos;S TALK</span>

                  {/* Small Blue Circular Icon with Rotating Arrow */}
                  <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#1e90ff] text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-sm transition-transform duration-200 group-hover:rotate-45">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </span>
              </a>
            </div>
          </div>


          {/* ── MOBILE BAR (< 768px): BRAND + HAMBURGER ────────────────────── */}
          <div className="flex md:hidden items-center justify-between w-full pointer-events-auto">
            {/* Brand Monogram */}
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-800 bg-[#0a0a0a]">
                <img src={pratikIcon} alt="Pratik" className="w-full h-full object-cover" />
              </div>
              <span className="font-bebas text-base tracking-wider text-white">
                PRATIK
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Animated Hamburger Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer z-50 focus:outline-none bg-transparent border-none p-1"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
              >
                <motion.span
                  animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-[2px] bg-white rounded-full block origin-center"
                />
                <motion.span
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="w-5 h-[2px] bg-white rounded-full block"
                />
                <motion.span
                  animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-[2px] bg-white rounded-full block origin-center"
                />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ── 3. FULL-SCREEN STAGGERED MOBILE DRAWER (< 768px) ─────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              style={{ zIndex: 9999998 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md md:hidden pointer-events-auto"
            />

            {/* Mobile Drawer */}
            <motion.div
              style={{ zIndex: 9999999 }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 h-full w-[85vw] max-w-sm bg-[#0a0a0a] border-l border-neutral-800 flex flex-col justify-between p-6 sm:p-8 pt-20 md:hidden shadow-2xl overflow-y-auto pointer-events-auto"
            >
              {/* Border-free Top Right Close 'X' Button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none focus:outline-none z-20"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Drawer Links */}
              <div className="flex flex-col space-y-6">
                <span className="font-mono text-[10px] text-[#ff6b35] tracking-[0.25em] uppercase">
                  [ MENU ]
                </span>

                <nav className="flex flex-col space-y-4">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeIdx === idx
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 * idx }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className={`flex items-center justify-between font-bebas text-3xl tracking-wider py-1 uppercase transition-colors ${
                            isActive
                              ? 'text-[#1e90ff] font-bold'
                              : 'text-neutral-300 hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-[#1e90ff] shadow-[0_0_8px_rgba(30,144,255,0.8)]" />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>
              </div>

              {/* Drawer Footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="pt-8 border-t border-neutral-900 space-y-4"
              >
                <a
                  href={getWhatsappUrl(settings?.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="group relative overflow-hidden w-full py-3.5 rounded-full border border-transparent hover:border-[#1e90ff] bg-white text-black font-bold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg cursor-pointer select-none transition-all duration-300"
                >
                  {/* Blue Background Fill Slide-in from Right */}
                  <span className="absolute inset-0 bg-[#1e90ff] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />

                  {/* Text Layer */}
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    LET&apos;S TALK (WHATSAPP)
                  </span>

                  {/* Small Blue Circular Icon with Rotating Arrow */}
                  <div className="relative z-10 w-5 h-5 rounded-full bg-[#1e90ff] group-hover:bg-white text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-sm transition-all duration-300 group-hover:rotate-45">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 text-black group-hover:text-[#1e90ff] transition-colors duration-300"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </a>

                <div className="text-center font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                  PRATIK BHUSAL STUDIO
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
