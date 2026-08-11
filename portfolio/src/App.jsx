import React, { useEffect } from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const location = useLocation()
  const outlet = useOutlet()
  const currentPath = location.pathname
  const isAdminPage = currentPath.startsWith('/admin')

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const handleRaf = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(handleRaf)
    gsap.ticker.lagSmoothing(0)

    // Scroll to top instantly on navigation
    window.scrollTo({ top: 0, behavior: 'auto' })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(handleRaf)
    }
  }, [currentPath])

  return (
    <ContentProvider>
      <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#1e90ff] selection:text-black overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col min-h-screen"
          >
            <div className="flex-grow">
              {outlet}
            </div>
            {!isAdminPage && <Footer />}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isAdminPage && <Navbar />}
    </ContentProvider>
  )
}
