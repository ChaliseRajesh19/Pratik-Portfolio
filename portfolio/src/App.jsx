import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionTwo from './components/SectionTwo'
import WorksSection from './components/WorksSection'
import RevealMechanicsSection from './components/RevealMechanicsSection'
import AboutSection from './components/AboutSection'
import PhilosophySection from './components/PhilosophySection'
import ExpertiseSection from './components/ExpertiseSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'

// Blog Components
import BlogListing from './components/BlogListing'
import BlogPost from './components/BlogPost'

// Standalone Core Page Components
import AboutPage from './components/AboutPage'
import WorksListing from './components/WorksListing'
import WorkPost from './components/WorkPost'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  )

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Scroll to top immediately on path transitions
    window.scrollTo({ top: 0, behavior: 'auto' })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [currentPath])

  useEffect(() => {
    const handlePopState = () => {
      // Clean up all ScrollTriggers on popstate transitions to prevent removeChild errors
      ScrollTrigger.getAll().forEach(t => t.kill(true))
      setCurrentPath(window.location.pathname)
    }

    // Intercept all internal standard anchor click events to prevent page refreshes
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        // Only intercept internal relative links, ignoring hashes, absolute links, and mailto/tel protocols
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault()
          navigate(href)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleGlobalClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [])

  const navigate = (path) => {
    // Clean up all ScrollTriggers before route transitions
    ScrollTrigger.getAll().forEach(t => t.kill(true))
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  // Route routing logic
  const isBlogListing = currentPath === '/blog' || currentPath === '/blog/'
  const isBlogPost = currentPath.startsWith('/blog/') && !isBlogListing

  const isAboutPage = currentPath === '/about' || currentPath === '/about/'
  const isWorksListing = currentPath === '/works' || currentPath === '/works/'
  const isWorkPost = currentPath.startsWith('/works/') && !isWorksListing

  let viewContent
  if (isBlogListing) {
    viewContent = <BlogListing onNavigate={navigate} />
  } else if (isBlogPost) {
    const slug = currentPath.split('/blog/')[1]?.split('?')[0]?.split('#')[0]
    viewContent = <BlogPost slug={slug} onNavigate={navigate} />
  } else if (isAboutPage) {
    viewContent = <AboutPage />
  } else if (isWorksListing) {
    viewContent = <WorksListing onNavigate={navigate} />
  } else if (isWorkPost) {
    const slug = currentPath.split('/works/')[1]?.split('?')[0]?.split('#')[0]
    viewContent = <WorkPost slug={slug} onNavigate={navigate} />
  } else {
    // Default homepage layout
    viewContent = (
      <>
        <Hero />
        <SectionTwo />
        <WorksSection />
        <RevealMechanicsSection />
        <AboutSection />
        <PhilosophySection />
        <ExpertiseSection />
        <TestimonialsSection />
        <ContactSection />
      </>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#1e90ff] selection:text-black">
      <Navbar />
      {viewContent}
    </main>
  )
}
