import React, { useEffect, useRef } from 'react'
import SEO from './SEO'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutPortrait from '../assets/Profile.png'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const headerRef = useRef(null)
  const bioRef = useRef(null)
  const imageRef = useRef(null)
  const capabilitiesRef = useRef(null)
  const milestonesRef = useRef(null)
  const ctaRef = useRef(null)

  const capabilities = [
    'VISUAL BRANDING',
    'EDITORIAL DESIGN',
    'ART DIRECTION',
    'PACKAGING SYSTEMS',
    'DIGITAL INTERFACES'
  ]

  const milestones = [
    { year: '2023', title: 'STUDIO INCUBATION', desc: 'Started freelancing and consulting for small scale businesses on visual communication assets.' },
    { year: '2024', title: 'REGIONAL EXPANSION', desc: 'Overhauled brand systems and directed marketing design strategies for medium scale ventures.' },
    { year: '2025', title: 'PRODUCT FOCUS', desc: 'Pivoted to a holistic design model merging packaging structures, print publications, and digital products.' },
    { year: '2026', title: 'SUPER-APP DEPLOYMENT', desc: 'Successfully designed the master visual design system and logistics visual assets for Pathao Nepal.' }
  ]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([headerRef.current, bioRef.current, imageRef.current, capabilitiesRef.current, milestonesRef.current, ctaRef.current], {
        opacity: 0,
        y: 30
      })

      const animateSection = (el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        })
      }

      animateSection(headerRef.current)
      animateSection(bioRef.current)
      animateSection(imageRef.current)
      animateSection(capabilitiesRef.current)
      animateSection(milestonesRef.current)
      animateSection(ctaRef.current)
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 select-none selection:bg-[#1e90ff] selection:text-black">
      <SEO
        title="About — Pratik Bhusal | Brand & Visual Designer"
        description="Learn about the design philosophy, milestones, and capabilities of Pratik Bhusal, a professional visual designer based in Nepal."
        url={`${siteUrl}/about`}
        type="website"
      />

      {/* Reduced margins: updated from max-w-4xl to max-w-6xl */}
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <header ref={headerRef} className="border-b border-neutral-900 pb-8">
          <p className="font-mono text-xs text-[#ff6b35] tracking-[0.25em] uppercase mb-3">
            [ ABOUT ME ]
          </p>
          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none">
            I MAKE THINGS WORTH SEEING.
          </h1>
        </header>

        {/* ── BIO & PORTRAIT GRID ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div ref={bioRef} className="md:col-span-7 space-y-6 max-w-xl text-neutral-300 font-sans text-base sm:text-[17px] leading-relaxed">
            <p className="font-bold text-white text-lg">
              I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems.
            </p>
            <p>
              Design is not just decoration — it is communication engineering. I build visual systems that help brands cut through clutter, establish clear visual architecture, and communicate value instantly to their users.
            </p>
            <p>
              Based in Kathmandu, Nepal, I work with local leaders and international teams to scale brands across packaging boxes, physical publications, and responsive digital interfaces.
            </p>
          </div>

          <div ref={imageRef} className="md:col-span-5 relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[4/5] shadow-lg">
            <img
              src={aboutPortrait}
              alt="Pratik Bhusal Portrait"
              className="w-full h-full object-cover grayscale-0 opacity-100 md:grayscale md:opacity-85 md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-300"
              loading="eager"
            />
          </div>
        </div>

        {/* ── CAPABILITIES / SKILLS ──────────────────────────────────────── */}
        <section ref={capabilitiesRef} className="space-y-6 pt-10 border-t border-neutral-900">
          <span className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase">
            [ CAPABILITIES ]
          </span>
          <div className="flex flex-col gap-2">
            {capabilities.map((skill, index) => (
              <div
                key={index}
                className="group flex items-center justify-between py-4 border-b border-neutral-900/60"
              >
                <span className="font-bebas text-3xl sm:text-5xl text-neutral-500 group-hover:text-white transition-colors duration-300">
                  {skill}
                </span>
                <span className="font-mono text-xs text-[#ff6b35] font-bold">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROCESS & MILESTONES ───────────────────────────────────────── */}
        <section ref={milestonesRef} className="space-y-8 pt-10 border-t border-neutral-900">
          <span className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase">
            [ MILESTONES &amp; JOURNEY ]
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {milestones.map((m) => (
              <div key={m.year} className="space-y-2 border-l border-neutral-900 pl-4 py-1">
                <span className="font-mono text-xs text-[#1e90ff] font-bold">{m.year}</span>
                <h4 className="font-bebas text-xl text-white tracking-wide">{m.title}</h4>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING CALL TO ACTION ─────────────────────────────────────── */}
        <section ref={ctaRef} className="pt-16 border-t border-neutral-900 flex flex-col items-center justify-center text-center gap-6 pb-6">
          <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide max-w-lg">
            HAVE A PROJECT IN MIND? LET&apos;S DEFINE IT.
          </h3>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/')
              window.dispatchEvent(new PopStateEvent('popstate'))
              setTimeout(() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }, 150)
            }}
            className="group flex items-center gap-3 border border-neutral-800 hover:border-[#1e90ff]/40 px-6 py-3 rounded-full text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-all bg-[#0a0a0a] cursor-pointer shadow-lg"
          >
            GET IN TOUCH
            <span className="w-5 h-5 rounded-full bg-[#1e90ff] flex items-center justify-center text-black group-hover:bg-[#ff6b35] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </button>
        </section>

      </div>
    </div>
  )
}
