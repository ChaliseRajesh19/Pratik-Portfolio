import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import mechanicAImg from '../assets/works/work1.jpg'
import mechanicBImg from '../assets/works/work3.jpg'
import mechanicC1Img from '../assets/social media/Study 2.png'
import mechanicC2Img from '../assets/social media/pp.png'

gsap.registerPlugin(ScrollTrigger)

/**
 * RevealCard — curtain wipe reveal
 * Desktop: hover to reveal / leave to hide
 * Mobile:  tap to toggle reveal
 */
function RevealCard({ label, desc, children }) {
  const [revealed, setRevealed] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const handleClick = () => {
    if (isTouchDevice) setRevealed(r => !r)
  }
  const handleMouseEnter = () => { if (!isTouchDevice) setRevealed(true) }
  const handleMouseLeave = () => { if (!isTouchDevice) setRevealed(false) }

  return (
    <div className="space-y-3">
      <div className="text-[11px] font-mono text-[#ff6b35] font-semibold tracking-wider uppercase">
        {label}
      </div>

      {/* Card wrapper with curtain overlay */}
      <div
        className="relative aspect-[16/10] overflow-hidden border border-neutral-800/80 bg-[#0a0a0a] cursor-pointer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* The actual content (image / svg) */}
        <div className="w-full h-full">
          {children}
        </div>

        {/* Dark curtain — slides UP on reveal, slides DOWN on hide */}
        <div
          className="absolute inset-0 bg-[#050505] pointer-events-none"
          style={{
            transform: revealed ? 'translateY(-101%)' : 'translateY(0%)',
            transition: 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />

        {/* Hint label inside curtain */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
          style={{
            opacity: revealed ? 0 : 1,
            transition: 'opacity 0.35s ease',
          }}
        >
          <div className="w-8 h-[1px] bg-[#ff6b35]" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#ff6b35] uppercase">
            {isTouchDevice ? 'TAP TO REVEAL' : 'HOVER TO REVEAL'}
          </span>
          <div className="w-8 h-[1px] bg-[#ff6b35]" />
        </div>
      </div>

      <p className="text-xs text-neutral-400 font-sans leading-relaxed">{desc}</p>
    </div>
  )
}

export default function RevealMechanicsSection() {
  const sectionRef = useRef(null)
  const slitRef = useRef(null)
  const portalMaskRef = useRef(null)
  const portalImgRef = useRef(null)
  const bentoTile1Ref = useRef(null)
  const bentoTile2Ref = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      if (slitRef.current) gsap.set(slitRef.current, { clipPath: 'inset(0% 0% 0% 0%)' })
      if (bentoTile1Ref.current) gsap.set([bentoTile1Ref.current, bentoTile2Ref.current], { opacity: 1, y: 0, scale: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────
      // COLUMN A: HORIZONTAL SLIT APERTURE (BI-DIRECTIONAL REVERSE)
      // ─────────────────────────────────────────────────────────────
      if (slitRef.current) {
        gsap.fromTo(
          slitRef.current,
          { clipPath: 'inset(49% 0% 49% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: slitRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse', // Exact reverse on scroll up!
            },
          }
        )
      }

      // ─────────────────────────────────────────────────────────────
      // COLUMN B: ALPHABETIC PORTAL (BI-DIRECTIONAL REVERSE & PARALLAX)
      // ─────────────────────────────────────────────────────────────
      if (portalMaskRef.current && portalImgRef.current) {
        gsap.fromTo(
          portalMaskRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: portalMaskRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )

        gsap.fromTo(
          portalImgRef.current,
          { y: -35 },
          {
            y: 35,
            scrollTrigger: {
              trigger: portalMaskRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }

      // ─────────────────────────────────────────────────────────────
      // COLUMN C: SLIDING BENTO (BI-DIRECTIONAL REVERSE)
      // ─────────────────────────────────────────────────────────────
      const tiles = [bentoTile1Ref.current, bentoTile2Ref.current].filter(Boolean)
      if (tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { opacity: 0, y: '15%', scale: 1.1 },
          {
            opacity: 1,
            y: '0%',
            scale: 1.0,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tiles[0],
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse', // Exact reverse on scroll up!
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reveal-mechanics"
      className="relative bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 selection:bg-[#1e90ff] selection:text-black select-none"
    >
      {/* 1. TOP BAR HEADER */}
      <div className="flex items-center justify-between w-full pb-6 border-b border-neutral-900">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">
          04
        </span>

        <span className="font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase">
          MORE BY ME
        </span>
      </div>

      {/* 2. THREE-COLUMN ARCHITECTURAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 pt-6 sm:pt-10 lg:pt-12">
        {/* ─────────────────────────────────────────────────────────────
            COLUMN A: NORDIC GLACIER LANDSCAPE
            ───────────────────────────────────────────────────────────── */}
        {/* ── COLUMN A: NORDIC GLACIER LANDSCAPE ──────────────────────── */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono text-[#ff6b35] font-semibold tracking-wider uppercase">
            [ NORDIC GLACIER LANDSCAPE ]
          </div>
          <div className="relative aspect-[16/10] overflow-hidden border border-neutral-800/80 bg-[#0a0a0a]">
            <div ref={slitRef} className="w-full h-full" style={{ clipPath: 'inset(49% 0% 49% 0%)' }}>
              <img src={mechanicAImg} alt="Nordic Glacier Landscape" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            High-contrast architectural photography capturing raw glacier formations and natural mountain textures.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            COLUMN B: KINETIC TYPOGRAPHY ART
            ───────────────────────────────────────────────────────────── */}
        {/* ── COLUMN B: KINETIC TYPOGRAPHY ART ─────────────────────── */}
        <RevealCard label="[ KINETIC TYPOGRAPHY ART ]" desc="Typographic brand artwork scoping abstract motion graphics inside architectural letterform contours.">
          <svg
            ref={portalMaskRef}
            viewBox="0 0 800 500"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="alphaPortalMask">
                <rect width="800" height="500" fill="black" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="420" fontWeight="900" fontFamily="Bebas Neue, sans-serif" letterSpacing="0">P</text>
              </mask>
            </defs>
            <g mask="url(#alphaPortalMask)">
              <image ref={portalImgRef} href={mechanicBImg} x="-10%" y="-10%" width="120%" height="120%" preserveAspectRatio="xMidYMid slice" />
            </g>
          </svg>
        </RevealCard>

        {/* ─────────────────────────────────────────────────────────────
            COLUMN C: ACADEMIC & BRAND CAMPAIGN
            ───────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="text-[11px] font-mono text-[#ff6b35] font-semibold tracking-wider uppercase">
            [ ACADEMIC & BRAND CAMPAIGN ]
          </div>

          <div className="grid grid-cols-2 gap-3 aspect-[16/10] relative">
            <div className="relative overflow-hidden border border-neutral-800/80 bg-[#0a0a0a]">
              <div ref={bentoTile1Ref} className="w-full h-full opacity-0">
                <img
                  src={mechanicC1Img}
                  alt="Study in Australia Poster"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative overflow-hidden border border-neutral-800/80 bg-[#0a0a0a]">
              <div ref={bentoTile2Ref} className="w-full h-full opacity-0">
                <img
                  src={mechanicC2Img}
                  alt="Commercial Brand Poster"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Social media advertising artwork designed for academic programs and commercial brand promotions.
          </p>
        </div>
      </div>

      {/* 3. MINIMAL EXPLORE MORE BUTTON */}
      <div className="flex justify-end pt-10">
        <a
          href="/works"
          className="relative overflow-hidden group flex items-center gap-3 border border-neutral-800 px-5 py-2.5 rounded-lg text-xs font-mono tracking-widest text-neutral-400 hover:text-black transition-colors duration-300 bg-[#0a0a0a] cursor-pointer shadow-lg"
        >
          {/* Top-to-Bottom sliding background curtain */}
          <div className="absolute inset-0 bg-[#1e90ff] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out pointer-events-none" />

          {/* Text content */}
          <span className="relative z-10 font-bold transition-colors duration-300">
            EXPLORE MORE
          </span>

          {/* Arrow container */}
          <span className="relative z-10 w-5 h-5 rounded-md bg-[#1e90ff] group-hover:bg-black flex items-center justify-center transition-colors duration-300 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-2.5 h-2.5 text-white group-hover:text-[#1e90ff] transition-colors duration-300"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}
