import React, {
  useState, useEffect, useRef, useCallback,
} from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import pratikIcon from '../assets/Pratik icon.png'

/**
 * Smart Sticky Navbar + Premium Mobile Drawer
 *
 * Desktop: logo-left | center-pill | CTA-right
 *   - Compact (scroll down) → only center pill floats
 *   - Full (scroll up / idle) → full bar returns
 *
 * Mobile: logo-left | hamburger-right
 *   - Tap hamburger → full-screen drawer slides from right
 *   - GSAP staggered links, hamburger morphs to ✕
 *   - Body scroll lock, backdrop blur, focus trap, Escape key
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Home',      id: 'home'      },
  { label: 'Works',     id: 'portfolio' },
  { label: 'About',     id: 'about'     },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Blog',      id: 'blog'      },
  { label: 'Contact',   id: 'contact'   },
]
const BRAND_TEXT    = 'PRATIK BHUSAL'
const SCROLL_THRESHOLD = 60   // px before compacting
const IDLE_DELAY       = 200  // ms before restoring full nav
const NAV_HEIGHT       = 64   // fixed nav offset for scroll targets

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function scrollToSection(id, reduced) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
  window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' })
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeNav,     setActiveNav]     = useState('Home')
  const [navState,      setNavState]      = useState('full') // 'full' | 'compact'
  const [drawerOpen,    setDrawerOpen]    = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [currentPath,   setCurrentPath]   = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  )

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Scroll refs
  const lastScrollY  = useRef(0)
  const rafId        = useRef(null)
  const idleTimer    = useRef(null)
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Drawer GSAP refs
  const drawerRef    = useRef(null)
  const backdropRef  = useRef(null)
  const linkRefs     = useRef([])
  const hamburgerRef = useRef(null)
  const firstFocusRef = useRef(null)

  const isCompact = navState === 'compact'
  const transition = prefersReduced.current
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.4, 0, 0.2, 1] }

  // ─── SCROLL DIRECTION DETECTION ──────────────────────────────────────────
  const updateNavState = useCallback(() => {
    const currentY = window.scrollY
    const diff = currentY - lastScrollY.current
    if (currentY < SCROLL_THRESHOLD) {
      setNavState('full')
    } else if (diff > 0) {
      setNavState('compact')
    } else if (diff < 0) {
      setNavState('full')
    }
    lastScrollY.current = currentY
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setNavState('full'), IDLE_DELAY)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return
      rafId.current = requestAnimationFrame(() => {
        updateNavState()
        rafId.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId.current)
      clearTimeout(idleTimer.current)
    }
  }, [updateNavState])

  // ─── SCROLL SPY ──────────────────────────────────────────────────────────
  useEffect(() => {
    // Only set up scroll spy when on homepage
    if (window.location.pathname !== '/') {
      setActiveNav('') // Clear active highlights when visiting separate pages
      return
    }

    const sectionMap = {}
    NAV_ITEMS.forEach(({ label, id }) => { sectionMap[id] = label })
    const visibilityMap = {}

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { visibilityMap[e.target.id] = e.intersectionRatio })
      let bestId = null, bestRatio = 0
      Object.entries(visibilityMap).forEach(([id, ratio]) => {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id }
      })
      if (bestId && sectionMap[bestId]) setActiveNav(sectionMap[bestId])
    }, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-10% 0px -10% 0px',
    })

    // Give DOM 200ms to mount before binding observer
    const timer = setTimeout(() => {
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [currentPath])

  // ─── DRAWER OPEN ─────────────────────────────────────────────────────────
  const openDrawer = useCallback(() => {
    setDrawerOpen(true)
    // Lock body scroll
    document.body.style.overflow = 'hidden'
  }, [])

  // ─── DRAWER CLOSE (with optional callback on complete) ───────────────────
  const closeDrawer = useCallback((onComplete) => {
    if (!drawerRef.current) {
      setDrawerOpen(false)
      document.body.style.overflow = ''
      onComplete?.()
      return
    }

    if (prefersReduced.current) {
      setDrawerOpen(false)
      document.body.style.overflow = ''
      onComplete?.()
      return
    }

    // Animate links OUT fast
    const links = linkRefs.current.filter(Boolean)
    gsap.to(links, {
      opacity: 0,
      y: 10,
      duration: 0.15,
      stagger: 0.03,
      ease: 'power2.in',
    })

    // Slide panel out + fade backdrop
    gsap.to(drawerRef.current, {
      x: '100%',
      duration: 0.35,
      ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
    })
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        setDrawerOpen(false)
        document.body.style.overflow = ''
        // Return focus to hamburger
        hamburgerRef.current?.focus()
        onComplete?.()
      },
    })
  }, [])

  // ─── NAV CLICK HANDLER ───────────────────────────────────────────────────
  const handleNavClick = useCallback((item) => {
    const label = typeof item === 'string' ? item : item.label
    const id    = typeof item === 'string'
      ? (NAV_ITEMS.find(n => n.label === item)?.id ?? item.toLowerCase())
      : item.id
    setActiveNav(label)

    const runNavigation = () => {
      const isHomepage = window.location.pathname === '/'

      if (isHomepage) {
        if (id === 'blog') {
          // Clean up ScrollTriggers to allow safe unmounting by React
          if (typeof window !== 'undefined' && window.gsap) {
            ScrollTrigger.getAll().forEach(t => t.kill(true))
          }
          window.history.pushState({}, '', '/blog')
          window.dispatchEvent(new PopStateEvent('popstate'))
          return
        }
        
        // Scroll in-page directly
        scrollToSection(id, prefersReduced.current)
      } else {
        // Standalone routing when visiting from external pages
        if (id === 'blog') {
          if (typeof window !== 'undefined' && window.gsap) {
            ScrollTrigger.getAll().forEach(t => t.kill(true))
          }
          window.history.pushState({}, '', '/blog')
          window.dispatchEvent(new PopStateEvent('popstate'))
          return
        }

        if (id === 'portfolio') {
          if (typeof window !== 'undefined' && window.gsap) {
            ScrollTrigger.getAll().forEach(t => t.kill(true))
          }
          window.history.pushState({}, '', '/works')
          window.dispatchEvent(new PopStateEvent('popstate'))
          return
        }

        if (id === 'about') {
          if (typeof window !== 'undefined' && window.gsap) {
            ScrollTrigger.getAll().forEach(t => t.kill(true))
          }
          window.history.pushState({}, '', '/about')
          window.dispatchEvent(new PopStateEvent('popstate'))
          return
        }

        // Home, Expertise, Contact -> Redirect to / and scroll in-page
        if (typeof window !== 'undefined' && window.gsap) {
          ScrollTrigger.getAll().forEach(t => t.kill(true))
        }
        window.history.pushState({}, '', '/')
        window.dispatchEvent(new PopStateEvent('popstate'))
        setTimeout(() => {
          scrollToSection(id, prefersReduced.current)
        }, 150)
      }
    }

    closeDrawer(runNavigation)
  }, [closeDrawer])

  // ─── ANIMATE DRAWER IN once mounted ──────────────────────────────────────
  useEffect(() => {
    if (!drawerOpen || !drawerRef.current) return
    const links = linkRefs.current.filter(Boolean)

    if (prefersReduced.current) {
      gsap.set(drawerRef.current,  { x: 0, opacity: 1 })
      gsap.set(backdropRef.current, { opacity: 1 })
      gsap.set(links, { opacity: 1, y: 0 })
      firstFocusRef.current?.focus()
      return
    }

    // Panel slides in from right
    gsap.fromTo(drawerRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.42, ease: 'cubic-bezier(0.65, 0, 0.35, 1)' }
    )

    // Backdrop fades in
    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 }
    )

    // Links stagger in
    gsap.fromTo(links,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.18,
      }
    )

    // Focus first link
    setTimeout(() => firstFocusRef.current?.focus(), 450)
  }, [drawerOpen])

  // ─── ESCAPE KEY & FOCUS TRAP ─────────────────────────────────────────────
  useEffect(() => {
    if (!drawerOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()

      // Focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeDrawer])

  // ─── CENTER NAV PILL ─────────────────────────────────────────────────────
  const NavPill = () => (
    <nav className={`flex items-center gap-1 transition-all duration-300 ${
      isCompact
        ? 'bg-[#0f0f0f]/90 backdrop-blur-[14px] border border-neutral-700/70 rounded-full px-2 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
        : 'bg-[#111111] border border-neutral-800/60 rounded-lg px-1 py-1'
    }`}>
      {NAV_ITEMS.map(({ label, id }) => {
        const isActive = activeNav === label
        return (
          <button
            key={id}
            onClick={() => handleNavClick({ label, id })}
            className={`relative px-4 py-1.5 text-xs font-medium tracking-wide cursor-pointer transition-colors duration-200 ${
              isCompact ? 'rounded-full' : 'rounded-md'
            } ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            {isActive && (
              <motion.div
                layoutId="activePill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className={`absolute inset-0 ${
                  isCompact
                    ? 'bg-[#1e90ff] rounded-full shadow-[0_0_12px_rgba(30,144,255,0.45)]'
                    : 'bg-white rounded-md'
                }`}
              />
            )}
            <span className={`relative z-10 font-semibold ${
              isActive && !isCompact ? 'text-[#1e90ff]' : ''
            } ${isActive && isCompact ? 'text-black' : ''}`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══ DESKTOP NAV ═══════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="relative w-full flex items-center justify-center px-6 pt-3 pb-3"
          style={{ pointerEvents: 'none' }}
        >
          {/* LEFT — Logo + Wordmark */}
          <motion.div
            animate={{ opacity: isCompact ? 0 : 1, x: isCompact ? -24 : 0 }}
            transition={transition}
            className="absolute left-6 flex items-center gap-3 cursor-pointer select-none"
            style={{ pointerEvents: isCompact ? 'none' : 'auto' }}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={() => handleNavClick('Home')}
          >
            <div className="w-11 h-11 rounded-md overflow-hidden shadow-md flex-shrink-0">
              <img src={pratikIcon} alt="Pratik Bhusal" className="w-full h-full object-cover" />
            </div>
            <div className="font-bebas text-2xl tracking-widest flex">
              {BRAND_TEXT.split('').map((char, i) => (
                <motion.span
                  key={i}
                  animate={{
                    opacity: isLogoHovered ? 1 : 0.55,
                    color: isLogoHovered ? '#ffffff' : '#9ca3af',
                    textShadow: isLogoHovered ? '0 0 14px rgba(30,144,255,0.65)' : 'none',
                  }}
                  transition={{ duration: 0.18, delay: isLogoHovered ? i * 0.028 : (BRAND_TEXT.length - i) * 0.012 }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CENTER — Nav Pill */}
          <motion.div
            animate={{ scale: isCompact ? 0.97 : 1 }}
            transition={transition}
            style={{ pointerEvents: 'auto' }}
          >
            <NavPill />
          </motion.div>

          {/* RIGHT — Hire Me + Get in Touch */}
          <motion.div
            animate={{ opacity: isCompact ? 0 : 1, x: isCompact ? 24 : 0 }}
            transition={transition}
            className="absolute right-6 flex items-center gap-3"
            style={{ pointerEvents: isCompact ? 'none' : 'auto' }}
          >
            <button
              onClick={() => window.open('https://wa.me/9779762519961', '_blank')}
              className="text-xs font-medium text-neutral-300 hover:text-white px-3 py-2 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer"
            >
              Hire Me
            </button>
            <button
              onClick={() => window.open('mailto:pratikbhusal12345@gmail.com', '_blank')}
              className="group flex items-center bg-white hover:bg-neutral-100 transition-all rounded-md p-1 pl-3 font-medium text-xs cursor-pointer shadow-lg"
            >
              <span className="font-semibold mr-2 text-neutral-900 group-hover:text-[#1e90ff] transition-colors">
                Get in Touch
              </span>
              <span className="w-6 h-6 rounded bg-[#1e90ff] flex items-center justify-center text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </header>

      {/* ══ MOBILE TOP BAR ════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className={`flex items-center justify-between w-full px-5 py-3 transition-all duration-300 ${
          isCompact || drawerOpen
            ? 'bg-[#080808]/95 backdrop-blur-[14px] border-b border-neutral-800/50'
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => handleNavClick({ label: 'Home', id: 'home' })}
          >
            <div className="w-9 h-9 rounded-md overflow-hidden">
              <img src={pratikIcon} alt="Pratik Bhusal" className="w-full h-full object-cover" />
            </div>
            <span className="font-bebas text-lg tracking-widest text-white">PRATIK BHUSAL</span>
          </div>

          {/* Right side: Get in Touch CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {/* CTA stays visible in collapsed bar */}
            {!drawerOpen && (
              <button
                onClick={() => window.open('mailto:pratikbhusal12345@gmail.com', '_blank')}
                className="hidden sm:flex items-center bg-white rounded-md p-1 pl-3 font-medium text-xs cursor-pointer shadow-md"
              >
                <span className="font-semibold mr-2 text-neutral-900 text-[11px]">Get in Touch</span>
                <span className="w-5 h-5 rounded bg-[#1e90ff] flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                </span>
              </button>
            )}

            {/* Hamburger → X morphing button */}
            <button
              ref={hamburgerRef}
              onClick={() => drawerOpen ? closeDrawer() : openDrawer()}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] cursor-pointer rounded-md hover:bg-neutral-800/50 transition-colors p-2"
            >
              <span
                className="block w-5 h-[1.5px] bg-white origin-center transition-all duration-250"
                style={{
                  transform: drawerOpen ? 'rotate(45deg) translate(0px, 5px)' : 'none',
                  transitionTimingFunction: 'cubic-bezier(0.65,0,0.35,1)',
                }}
              />
              <span
                className="block w-5 h-[1.5px] bg-white origin-center transition-all duration-250"
                style={{
                  opacity: drawerOpen ? 0 : 1,
                  transform: drawerOpen ? 'scaleX(0)' : 'scaleX(1)',
                  transitionTimingFunction: 'cubic-bezier(0.65,0,0.35,1)',
                }}
              />
              <span
                className="block w-5 h-[1.5px] bg-white origin-center transition-all duration-250"
                style={{
                  transform: drawerOpen ? 'rotate(-45deg) translate(0px, -5px)' : 'none',
                  transitionTimingFunction: 'cubic-bezier(0.65,0,0.35,1)',
                }}
              />
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ──────────────────────────────────────────────── */}
        {drawerOpen && (
          <>
            {/* Backdrop — tap to close */}
            <div
              ref={backdropRef}
              onClick={() => closeDrawer()}
              className="fixed inset-0 z-40 bg-black/60"
              style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            />

            {/* Drawer Panel */}
            <div
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[85vw] max-w-sm bg-[#080808] flex flex-col"
              style={{ willChange: 'transform' }}
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/70">
                <div
                  className="flex items-center gap-2.5 cursor-pointer select-none"
                  onClick={() => handleNavClick({ label: 'Home', id: 'home' })}
                >
                  <div className="w-8 h-8 rounded-md overflow-hidden">
                    <img src={pratikIcon} alt="Pratik Bhusal" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bebas text-lg tracking-widest text-white animate-pulse">PRATIK BHUSAL</span>
                </div>
                <button
                  onClick={() => closeDrawer()}
                  className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors cursor-pointer text-lg font-light"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Nav Links */}
              <nav className="flex flex-col flex-1 justify-center px-8 gap-2">
                {NAV_ITEMS.map(({ label, id }, i) => {
                  const isActive = activeNav === label
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavClick({ label, id })}
                      className={`relative text-left py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 group ${
                        isActive ? 'bg-white/8' : 'hover:bg-neutral-800/50'
                      }`}
                      style={{ opacity: 0, transform: 'translateY(22px)' }}
                      ref={(el) => {
                        if (i === 0) firstFocusRef.current = el
                        linkRefs.current[i] = el
                      }}
                    >
                      <span className={`font-bebas text-4xl sm:text-5xl tracking-widest block leading-none ${
                        isActive ? 'text-[#1e90ff]' : 'text-neutral-200 group-hover:text-white'
                      }`}>
                        {label}
                      </span>
                      {isActive && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#1e90ff] rounded-full" />
                      )}
                    </button>
                  )
                })}
              </nav>

              {/* Drawer Bottom — Hire Me + Get in Touch */}
              <div
                className="px-6 py-6 border-t border-neutral-800/70 flex flex-col gap-3"
                ref={(el) => { linkRefs.current[NAV_ITEMS.length] = el }}
                style={{ opacity: 0, transform: 'translateY(22px)' }}
              >
                <button
                  onClick={() => { closeDrawer(); window.open('https://wa.me/9779762519961', '_blank') }}
                  className="w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-medium text-sm text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                >
                  Hire Me
                </button>
                <button
                  onClick={() => { closeDrawer(); window.open('mailto:pratikbhusal12345@gmail.com', '_blank') }}
                  className="w-full py-3 rounded-xl bg-[#1e90ff] hover:bg-[#1a7fe0] text-white font-bold text-sm text-center cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  Get in Touch
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Spacer for fixed nav */}
      <div className="h-[60px] hidden md:block" />
    </>
  )
}
