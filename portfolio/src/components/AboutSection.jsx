import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import profileImg from '../assets/Profile.png'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const portraitRef = useRef(null)
  const bioRef = useRef(null)
  const [isPortraitHovered, setIsPortraitHovered] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Headline Lines Line-by-Line Kinetic Slide & Fade Reveal (Bi-directional Reverse)
      const headlineLines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean)
      if (headlineLines.length > 0) {
        gsap.set(headlineLines, { opacity: 0, y: 70, scale: 0.98 })
        gsap.to(headlineLines, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse', // Reverses when scrolling up/down
          },
        })
      }

      // 2. Dome Arch Portrait Reveal
      if (portraitRef.current) {
        gsap.set(portraitRef.current, { opacity: 0, y: 60, scale: 0.94 })
        gsap.to(portraitRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        })
      }

      // 3. Biography Text Blocks Reveal
      if (bioRef.current) {
        const bioEls = Array.from(bioRef.current.children)
        gsap.set(bioEls, { opacity: 0, y: 40 })
        gsap.to(bioEls, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 selection:bg-[#1e90ff] selection:text-black select-none flex flex-col justify-between"
    >
      {/* 1. TOP BAR HEADER */}
      <div className="flex items-center justify-between w-full pb-6 border-b border-neutral-900">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">
          05
        </span>

        <span className="font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase">
          ABOUT THE STUDIO
        </span>
      </div>

      {/* 2. STAGGERED HEADLINE STATEMENT */}
      <div className="py-8 sm:py-12 lg:py-16 space-y-2 sm:space-y-4 max-w-7xl mx-auto w-full">
        <h1
          ref={line1Ref}
          className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none"
        >
          I DESIGN VISUAL LANGUAGES
        </h1>

        <h2
          ref={line2Ref}
          className="font-bebas text-4xl sm:text-6xl lg:text-7xl tracking-wider text-[#ff6b35] leading-none pl-6 sm:pl-24 lg:pl-36"
        >
          FOR IDEAS THAT DESERVE
        </h2>

        <h3
          ref={line3Ref}
          className="font-bebas text-4xl sm:text-6xl lg:text-7xl tracking-wider text-neutral-400 leading-none text-right pr-4 sm:pr-16"
        >
          TO BE REMEMBERED.
        </h3>
      </div>

      {/* 3. LOWER CONTENT STAGE: DOME ARCH PORTRAIT WITH LIGHTING ILLUMINATION HOVER & BIOGRAPHY */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center pt-4 sm:pt-8 pb-4">
        {/* LEFT COLUMN: DOME ARCH PORTRAIT WITH LIGHT ILLUMINATION (NO SCALE ZOOM) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start">
          <div
            ref={portraitRef}
            onMouseEnter={() => setIsPortraitHovered(true)}
            onMouseLeave={() => setIsPortraitHovered(false)}
            className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-t-full overflow-hidden bg-[#0a0a0a] shadow-[0_30px_75px_rgba(0,0,0,0.95)] group cursor-pointer"
          >
            {/* Ambient Backlight Aura on Hover */}
            <motion.div
              animate={{
                opacity: isPortraitHovered ? 0.35 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-brand/60 via-brand/20 to-transparent z-10 pointer-events-none"
            />

            {/* Profile Image with Smooth Lighting & Contrast Boost (No Scale Zoom) */}
            <motion.img
              animate={{
                filter: isPortraitHovered
                  ? 'brightness(1.12) contrast(1.08)'
                  : 'brightness(0.92) contrast(0.98)',
                opacity: isPortraitHovered ? 1 : 0.88,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              src={profileImg}
              alt="Pratik Bhusal Portrait"
              className="w-full h-full object-cover rounded-t-full relative z-0"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: BIOGRAPHY WITH MIDDLE VERTICAL ALIGNMENT (PRATIK BHUSAL) */}
        <div ref={bioRef} className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono text-[#ff6b35] tracking-widest font-semibold uppercase block">
            BIOGRAPHY // PRATIK BHUSAL
          </span>

          <p className="text-base sm:text-lg text-white font-sans leading-relaxed font-normal max-w-xl">
            Currently operating at the intersection of branding, typography, and raw spatial design. Building systems that do not merely inform, but establish structural memory.
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-xl">
            Operating internationally. Collaborating with architectural studios, luxury fashion houses, and progressive cultural institutions seeking stark, permanent aesthetic signatures.
          </p>
        </div>
      </div>
    </section>
  )
}
