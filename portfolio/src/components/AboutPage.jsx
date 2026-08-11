import React, { useEffect, useRef, useState } from 'react'
import SEO from './SEO'
import StatsSection from './StatsSection'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import aboutPortrait from '../assets/Profile.png'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage({ initialCapabilities, initialMilestones, initialSettings }) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const bioRef = useRef(null)
  const portraitRef = useRef(null)
  const capabilitiesRef = useRef(null)
  const milestonesRef = useRef(null)
  const ctaRef = useRef(null)
  const ctaTitleRef = useRef(null)

  const [activeIdx, setActiveIdx] = useState(null)
  const [clickedIdx, setClickedIdx] = useState(null)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const defaultCapabilities = [
    {
      name: 'VISUAL BRANDING',
      desc: 'Developing cohesive, scalable visual assets, logo identities, adaptive grid systems, and typographic guidelines to align brand perception.'
    },
    {
      name: 'EDITORIAL DESIGN',
      desc: 'Configuring monographs, booklets, catalogs, and technical publication layouts using mathematical grids and fine horological typefaces.'
    },
    {
      name: 'ART DIRECTION',
      desc: 'Guiding marketing poster designs, destination brochures, social assets, and live World Cup match campaigns from concept to production.'
    },
    {
      name: 'PACKAGING SYSTEMS',
      desc: 'Designing sustainable, tactile cosmetic boxes, product containers, concrete vessels, and minimal logistics packaging that feel premium.'
    },
    {
      name: 'DIGITAL INTERFACES',
      desc: 'Structuring responsive mobile layout deck shuffles, dark-mode styling systems, interactive cursor tracking states, and clean transition flows.'
    }
  ]

  const defaultMilestones = [
    { year: '2023', title: 'STUDIO INCUBATION', desc: 'Started freelancing and consulting for small scale businesses on visual communication assets.', order: 1 },
    { year: '2024', title: 'REGIONAL EXPANSION', desc: 'Overhauled brand systems and directed marketing design strategies for medium scale ventures.', order: 2 },
    { year: '2025', title: 'PRODUCT FOCUS', desc: 'Pivoted to a holistic design model merging packaging structures, print publications, and digital products.', order: 3 },
    { year: '2026', title: 'SUPER-APP DEPLOYMENT', desc: 'Successfully designed the master visual design system and logistics assets for Pathao Nepal.', order: 4 }
  ]

  const defaultSettings = {
    aboutHeroText: 'I MAKE THINGS WORTH SEEING.',
    aboutBio: `I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems. Design is not just decoration — it is communication engineering. I build visual systems that help brands cut through clutter, establish clear visual architecture, and communicate value instantly to their users. Based in Kathmandu, Nepal, I work with local leaders and international teams to scale brands across packaging boxes, physical publications, and responsive digital interfaces.`
  }

  const capabilities = initialCapabilities && initialCapabilities.length > 0 ? initialCapabilities : defaultCapabilities
  const milestones = initialMilestones && initialMilestones.length > 0 ? initialMilestones : defaultMilestones
  const settings = initialSettings && initialSettings.aboutBio ? initialSettings : defaultSettings

  const bioText = settings.aboutBio
  const bioSentences = bioText.split(/(?<=[.?!])\s+/)

  // Capabilities hover / click interactions
  const handleRowInteraction = (index, isEnter) => {
    if (isTouchDevice) return
    setActiveIdx(isEnter ? index : null)
  }

  const handleRowClick = (index) => {
    if (clickedIdx === index) {
      setClickedIdx(null)
    } else {
      setClickedIdx(index)
    }
  }

  const activeCapabilityIndex = isTouchDevice ? clickedIdx : activeIdx
  const isAnyActive = activeCapabilityIndex !== null

  // GSAP scroll animation effects
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, portraitRef.current, ctaTitleRef.current], { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', filter: 'grayscale(0%)' })
      const sentences = bioRef.current?.querySelectorAll('.bio-sentence')
      if (sentences) gsap.set(sentences, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // ─── 1. INTRO HEADER UNCLIP REVEAL (REVERSING) ──────────────────────────
      gsap.fromTo(titleRef.current,
        { y: '102%' },
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )

      // ─── 2. PORTRAIT CLIP-PATH WIPE & GRAYSCALE REVEAL (REVERSING) ──────────
      gsap.fromTo(portraitRef.current,
        { clipPath: 'inset(0 100% 0 0)', filter: 'grayscale(100%)', opacity: 0.3 },
        {
          clipPath: 'inset(0 0% 0 0)',
          filter: 'grayscale(0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )

      // Portrait scroll-tied parallax drift (scrubbed)
      gsap.to(portraitRef.current, {
        y: '-10%',
        scrollTrigger: {
          trigger: portraitRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // ─── 3. BIO SENTENCES STAGGERED REVEALS (REVERSING) ───────────────────
      const sentences = bioRef.current.querySelectorAll('.bio-sentence')
      gsap.fromTo(sentences,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 82%',
            end: 'bottom 18%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )

      // ─── 4. CAPABILITIES LIST INITIAL SCROLL CASCADE (REVERSING) ──────────
      const capRows = capabilitiesRef.current.querySelectorAll('.cap-row')
      capRows.forEach((row) => {
        const num = row.querySelector('.cap-num')
        const name = row.querySelector('.cap-name')
        const line = row.querySelector('.cap-line')

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse'
          }
        })

        rowTl.fromTo(num, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo(name, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.65, ease: 'power2.out' }, '-=0.35')
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      })

      // ─── 5. MILESTONES CARDS PROGRESS SCUB & REVEAL (REVERSING) ───────────
      const cards = milestonesRef.current.querySelectorAll('.milestone-card')
      cards.forEach((card) => {
        const line = card.querySelector('.card-progress-line')
        const year = card.querySelector('.m-year')
        const title = card.querySelector('.m-title')
        const desc = card.querySelector('.m-desc')

        if (line && year && title && desc) {
          // Set initial hidden state for text elements
          gsap.set([year, title, desc], { opacity: 0, y: 12 })

          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 55%',
              scrub: true
            }
          })

          // Draw the blue progress line
          cardTl.to(line, { height: '100%', ease: 'none', duration: 1 }, 0)

          // Fade and translate text components to active state sequentially as the line draws past them
          cardTl.to(year, { opacity: 1, y: 0, duration: 0.25 }, 0.25)
            .to(title, { opacity: 1, y: 0, duration: 0.25 }, 0.55)
            .to(desc, { opacity: 1, y: 0, duration: 0.3 }, 0.85)
        }
      })

      // ─── 6. CLOSING CTA HEADLINE UNCLIP REVEAL (REVERSING) ─────────────────
      gsap.fromTo(ctaTitleRef.current,
        { y: '102%' },
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )

    }, headerRef)

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

      {/* Local Rotating Badge Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes badge-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .badge-rotating {
          animation: badge-spin 22s linear infinite;
        }
        .badge-interactive-group:hover .badge-rotating {
          animation-duration: 13s;
        }
      `}} />

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* ── HEADER ZONE (Line reveal headline - py-2 padding prevents clipping) ── */}
        <header ref={headerRef} className="border-b border-neutral-900 pb-8">
          <p className="font-mono text-xs text-[#ff6b35] tracking-[0.25em] uppercase mb-3">
            [ ABOUT ME ]
          </p>
          <div className="overflow-hidden relative py-2.5 mb-1">
            <h1 ref={titleRef} className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none inline-block">
              {settings.aboutHeroText}
            </h1>
          </div>
        </header>

        {/* ── BIO & PORTRAIT GRID ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div ref={bioRef} className="md:col-span-7 space-y-6 max-w-xl text-neutral-300 font-sans text-base sm:text-[17px] leading-relaxed">
            {bioSentences.map((sent, idx) => {
              const isFirst = idx === 0
              return (
                <p
                  key={idx}
                  className={`bio-sentence ${isFirst ? 'font-bold text-white text-lg' : ''}`}
                >
                  {sent}
                </p>
              )
            })}
          </div>

          <div className="md:col-span-5 relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[4/5] shadow-lg">
            <img
              ref={portraitRef}
              src={aboutPortrait}
              alt="Pratik Bhusal Portrait"
              className="w-full h-full object-cover transition-all duration-300"
              style={{ willChange: 'transform, clip-path, filter' }}
              loading="eager"
            />
          </div>
        </div>

        {/* ── STATS / TRACK RECORD ────────────────────────────────────────── */}
        <StatsSection title="[ BY THE NUMBERS ]" className="my-12 border-y border-neutral-900" />

        {/* ── CAPABILITIES / SKILLS ──────────────────────────────────────── */}
        <section ref={capabilitiesRef} className="space-y-6 pt-10 border-t border-neutral-900">
          <span className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase block mb-4">
            [ CAPABILITIES ]
          </span>
          <dl className="flex flex-col border-b border-neutral-900/60 divide-y divide-neutral-900/60">
            {capabilities.map((skill, index) => {
              const isActive = activeCapabilityIndex === index
              const isDimmed = isAnyActive && !isActive

              return (
                <div
                  key={index}
                  className="cap-row group py-5 sm:py-6 transition-all duration-300 relative"
                  style={{
                    opacity: isDimmed ? 0.45 : 1
                  }}
                  onMouseEnter={() => handleRowInteraction(index, true)}
                  onMouseLeave={() => handleRowInteraction(index, false)}
                  onClick={() => handleRowClick(index)}
                >
                  {/* Title & trigger zone */}
                  <dt
                    role="button"
                    aria-expanded={isActive}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleRowClick(index)
                      }
                    }}
                    className="flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="cap-name font-bebas text-3xl sm:text-5xl text-neutral-500 group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                    <span className="cap-num font-mono text-xs text-[#ff6b35] font-bold">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </dt>

                  {/* Expandable description element */}
                  <dd
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      gridTemplateRows: isActive ? '1fr' : '0fr'
                    }}
                  >
                    <div className="overflow-hidden">
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.35, delay: 0.08 }}
                            className="pt-4 pb-1 text-sm sm:text-base font-sans text-neutral-400 leading-relaxed border-l-2 border-[#ff6b35] pl-4"
                          >
                            {skill.desc}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </dd>

                  {/* Border line indicator */}
                  <div className="cap-line absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900/60 origin-left" style={{ scaleX: 0 }} />
                </div>
              )
            })}
          </dl>
        </section>

        {/* ── PROCESS & MILESTONES (Symmetrical dual-column progress lines) ─ */}
        <section ref={milestonesRef} className="space-y-8 pt-10 border-t border-neutral-900 relative">
          <span className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase block">
            [ MILESTONES &amp; JOURNEY ]
          </span>

          <div className="relative py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {milestones.map((m) => (
                <div key={m.year} className="milestone-card space-y-2 relative pl-6 py-2">
                  
                  {/* Card individual vertical progress connector line */}
                  <div className="absolute left-[3px] top-1 bottom-1 w-[1.5px] bg-neutral-900/60 overflow-hidden">
                    <div
                      className="card-progress-line w-full bg-[#1e90ff] origin-top h-0 shadow-[0_0_8px_rgba(30,144,255,0.7)]"
                      style={{ willChange: 'height' }}
                    />
                  </div>

                  <span className="m-year font-mono text-xs text-[#1e90ff] font-bold block">{m.year}</span>
                  <h4 className="m-title font-bebas text-xl text-white tracking-wide block">{m.title}</h4>
                  <p className="m-desc text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed block">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CALL TO ACTION (py-3 padding prevents clipping) ─────── */}
        <section ref={ctaRef} className="pt-16 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-12 pb-6">
          <div className="overflow-hidden relative py-3 max-w-xl">
            <h3 ref={ctaTitleRef} className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-tight inline-block">
              HAVE A PROJECT IN MIND? LET&apos;S DEFINE IT.
            </h3>
          </div>

          {/* Rotating Interactive Badge CTA */}
          <div className="flex items-center justify-center relative min-h-[160px] w-full md:w-auto pr-0 md:pr-12">
            <div
              className="absolute w-[200px] aspect-square rounded-full blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, rgba(0,0,0,0) 70%)',
              }}
            />

            <motion.a
              href={`mailto:${settings.contactEmail || 'pratikbhusal12345@gmail.com'}`}
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="badge-interactive-group relative w-[130px] sm:w-[150px] aspect-square rounded-full flex items-center justify-center cursor-pointer group"
            >
              {/* Rotating SVG Ring */}
              <div className="badge-rotating absolute inset-0 w-full h-full will-change-transform">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="badgeCirclePathAbout"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text className="fill-neutral-400 font-mono text-[6.1px] font-bold uppercase tracking-[0.18em]">
                    <textPath href="#badgeCirclePathAbout" startOffset="0%">
                      * AVAILABLE FOR WORK * LET&apos;S TALK * GET IN TOUCH * COLLAB *
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Static arrow inside circle */}
              <div className="relative w-12 sm:w-14 aspect-square rounded-full border border-neutral-800/80 bg-[#0c0c0c] flex items-center justify-center shadow-lg group-hover:border-[#ff6b35]/60 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white group-hover:text-[#ff6b35] transition-colors duration-300"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </motion.a>
          </div>
        </section>

      </div>
    </div>
  )
}
