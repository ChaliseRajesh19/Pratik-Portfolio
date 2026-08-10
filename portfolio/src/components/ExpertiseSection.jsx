import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import editorialThumb from '../assets/works/work2.jpg'

gsap.registerPlugin(ScrollTrigger)

/**
 * ExpertiseSection — Section 07
 *
 * Scroll-driven alternating marquee:
 * Each row drifts left/right scrubbed directly to scroll position.
 * Reversible: scrolling up reverses the motion exactly.
 *
 * Row directions (scroll DOWN):
 *   Row 1 BRANDING          → LEFT
 *   Row 2 EDITORIAL·DESIGN  → RIGHT
 *   Row 3 TYPOGRAPHY        → LEFT
 *   Row 4 ART DIR·PACKAGING → RIGHT
 *   Row 5 DIGITAL IFACES    → LEFT
 *
 * Static bracketed labels are absolutely positioned and do NOT move.
 */

export default function ExpertiseSection() {
  const sectionRef = useRef(null)
  // Each row wrapper ref stored in order
  const rowRefs = useRef([])
  rowRefs.current = [] // reset on each render

  const addRow = (el) => {
    if (el) rowRefs.current.push(el)
  }

  useEffect(() => {
    // Respect prefers-reduced-motion — show static layout only
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // One shared scrubbed timeline driving all rows simultaneously
      // Section is PINNED for an extra 100vh of scroll distance —
      // that extra scroll drives the translate.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',        // pin fires when section reaches top of viewport
          end: '+=100%',           // pin for one extra viewport-height of scroll
          pin: true,               // keep section in view while scrolling through
          scrub: 1.2,              // slight lag for polished feel
          anticipatePin: 1,
        },
      })

      // Alternating direction: even index → LEFT, odd index → RIGHT
      const DRIFT = 14 // vw units — conservative, keeps text always on screen

      rowRefs.current.forEach((row, i) => {
        const sign = i % 2 === 0 ? -1 : 1   // even = left, odd = right
        const drift = DRIFT + i * 1.5        // slight variation per row

        tl.fromTo(
          row,
          { x: 0 },
          { x: `${sign * drift}vw`, ease: 'none' },
          0  // all start together at position 0 in the timeline
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative bg-[#050505] text-white border-t border-neutral-900 select-none"
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div className="relative z-20 flex items-center justify-between w-full px-6 sm:px-10 lg:px-14 py-5 border-b border-neutral-900">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">07</span>
        <span className="font-bebas text-sm tracking-[0.25em] text-neutral-400 uppercase">EXPERTISE</span>
      </div>

      {/* ── STATIC BRACKETED LABELS (don't move with marquee) ───────────── */}
      <span className="absolute top-20 right-10 lg:right-14 font-mono text-[9px] sm:text-[10px] text-neutral-600 tracking-widest z-20 hidden sm:block pointer-events-none">
        [ HOLISTIC SYSTEMS ]
      </span>
      <span className="absolute font-mono text-[9px] sm:text-[10px] text-neutral-600 tracking-widest z-20 hidden sm:block pointer-events-none"
        style={{ top: '42%', left: '5%' }}>
        [ COMPOSITION / GLYPHS ]
      </span>
      <span className="absolute bottom-10 right-10 lg:right-14 font-mono text-[9px] sm:text-[10px] text-neutral-600 tracking-widest z-20 hidden sm:block pointer-events-none">
        [ VARIABLE SCREEN SCAPE ]
      </span>

      {/* ── MARQUEE ROWS ────────────────────────────────────────────────── */}
      <div
        className="flex flex-col justify-center px-4 sm:px-10 lg:px-14"
        style={{ minHeight: 'calc(100vh - 66px)', gap: '0.15em' }}
      >

        {/* ROW 1 — BRANDING → LEFT */}
        <div ref={addRow} className="will-change-transform">
          <span
            className="font-bebas block leading-none tracking-wide text-neutral-500 cursor-default transition-colors duration-300 hover:text-neutral-300"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}
          >
            BRANDING
          </span>
        </div>

        {/* ROW 2 — EDITORIAL [image] DESIGN → RIGHT  (image moves WITH row) */}
        <div ref={addRow} className="will-change-transform flex items-center gap-3 sm:gap-5">
          <span
            className="font-bebas leading-none tracking-wide text-[#ff6b35] cursor-default flex-shrink-0"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}
          >
            EDITORIAL
          </span>

          {/* Inline editorial thumbnail — moves with the row */}
          <div
            className="flex-shrink-0 overflow-hidden rounded-sm shadow-lg"
            style={{ width: 'clamp(60px, 7vw, 120px)', height: 'clamp(44px, 5.2vw, 88px)' }}
          >
            <img
              src={editorialThumb}
              alt="Editorial design sample"
              className="w-full h-full object-cover"
            />
          </div>

          <span
            className="font-bebas leading-none tracking-wide text-[#ff6b35] cursor-default flex-shrink-0"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}
          >
            DESIGN
          </span>
        </div>

        {/* ROW 3 — TYPOGRAPHY → LEFT (right-aligned for contrast) */}
        <div ref={addRow} className="will-change-transform flex justify-end">
          <span
            className="font-bebas block leading-none tracking-wide text-neutral-500 cursor-default transition-colors duration-300 hover:text-neutral-300"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}
          >
            TYPOGRAPHY
          </span>
        </div>

        {/* ROW 4 — ART DIRECTION — PACKAGING → RIGHT */}
        <div ref={addRow} className="will-change-transform flex items-center gap-3 sm:gap-6">
          <span
            className="font-bebas leading-none tracking-wide text-neutral-500 cursor-default flex-shrink-0 transition-colors duration-300 hover:text-neutral-300"
            style={{ fontSize: 'clamp(2rem, 8.5vw, 7rem)' }}
          >
            ART DIRECTION
          </span>

          {/* Thin horizontal rule between the two words */}
          <div className="flex-shrink-0 h-px bg-neutral-600 w-12 sm:w-20 lg:w-28" />

          <span
            className="font-bebas leading-none tracking-wide text-neutral-500 cursor-default flex-shrink-0 transition-colors duration-300 hover:text-neutral-300"
            style={{ fontSize: 'clamp(2rem, 8.5vw, 7rem)' }}
          >
            PACKAGING
          </span>
        </div>

        {/* ROW 5 — DIGITAL INTERFACES → LEFT */}
        <div ref={addRow} className="will-change-transform">
          <span
            className="font-bebas block leading-none tracking-wide text-neutral-500 cursor-default transition-colors duration-300 hover:text-neutral-300"
            style={{ fontSize: 'clamp(2rem, 8.5vw, 7rem)' }}
          >
            DIGITAL INTERFACES
          </span>
        </div>

      </div>
    </section>
  )
}
