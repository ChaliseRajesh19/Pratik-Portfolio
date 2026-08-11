import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { worksData } from '../data/worksData'
import SEO from './SEO'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function WorkPost({ slug, initialWorks }) {
  const navigate = useNavigate()
  const works = initialWorks && initialWorks.length > 0 ? initialWorks : worksData
  const work = works.find((w) => w.slug === slug)

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  const heroRef = useRef(null)
  const bgLettersRef = useRef(null)
  const metaLeftRef = useRef(null)
  const metaRightRef = useRef(null)
  const eyebrowRef = useRef(null)
  const imageFrameRef = useRef(null)
  const imageWrapperRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)

  const bodyContainerRef = useRef(null)
  const progressRailRef = useRef(null)
  const sectionsRef = useRef([])
  sectionsRef.current = []

  // Scroll to top on slug navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setLightboxIndex(null) // Reset lightbox when swapping projects
  }, [slug])

  // GSAP animations for intro, parallax scroll, progress rail, and line reveals
  useEffect(() => {
    if (!work) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([bgLettersRef.current, metaLeftRef.current, metaRightRef.current, eyebrowRef.current, imageFrameRef.current], { opacity: 1 })
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // ─── 1. FAST, SMOOTH HERO ENTRANCE ─────────────────────────────────────
      gsap.fromTo(bgLettersRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 0.08, scale: 1, duration: 0.6, ease: 'power2.out' }
      )

      gsap.fromTo([metaLeftRef.current, metaRightRef.current, eyebrowRef.current].filter(Boolean),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
      )

      gsap.fromTo([titleLine1Ref.current, titleLine2Ref.current].filter(Boolean),
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )

      gsap.fromTo(imageFrameRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      )

      // ─── 2. HERO PARALLAX SCROLL ───────────────────────────────────────────
      gsap.to(bgLettersRef.current, {
        y: '-12%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      gsap.to(imageFrameRef.current, {
        y: '-5%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // ─── 3. VERTICAL PROGRESS RAIL SCRUB ──────────────────────────────────
      if (progressRailRef.current && bodyContainerRef.current) {
        gsap.to(progressRailRef.current, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: bodyContainerRef.current,
            start: 'top 35%',
            end: 'bottom 65%',
            scrub: true
          }
        })
      }

      // ─── 4. SECTION-BY-SECTION CONTENT REVEALS & MARKERS ───────────────────
      const activeSections = sectionsRef.current.filter(Boolean)
      activeSections.forEach((sec, idx) => {
        const title = sec.querySelector('.section-title')
        const line = sec.querySelector('.section-line')
        const sentences = sec.querySelectorAll('.sec-sentence')
        const sweeps = sec.querySelectorAll('.highlight-sweep')

        // a) Dot Marker Lighting Highlight (scroll spy style)
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => {
            const dot = sec.querySelector('.section-dot')
            if (dot) {
              if (self.isActive) {
                dot.classList.add('bg-[#1e90ff]', 'scale-125')
                dot.classList.remove('bg-neutral-800')
              } else {
                dot.classList.add('bg-neutral-800')
                dot.classList.remove('bg-[#1e90ff]', 'scale-125')
              }
            }
          }
        })

        // b) Reversible Content Reveal Timeline (scrubbed to scroll progress)
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top 75%', // Starts fading in when section top is at 75% of viewport
            end: 'top 45%',   // Fully visible when section top reaches 45% (as the blue line reaches it)
            scrub: true
          }
        })

        // Initial state setups
        if (sweeps.length > 0) {
          gsap.set(sweeps, { scaleX: 0 })
        }

        if (title) {
          revealTl.fromTo(title,
            { y: '102%' },
            { y: '0%', duration: 0.6, ease: 'power3.out' }
          )
        }

        if (line) {
          revealTl.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.35'
          )
        }

        if (sentences.length > 0) {
          revealTl.fromTo(sentences,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.1,
              ease: 'power2.out'
            },
            '-=0.3'
          )
        }

        if (sweeps.length > 0) {
          revealTl.to(sweeps, {
            scaleX: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out'
          }, '-=0.25')
        }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [slug, work])

  // Key event listeners for lightbox navigation (Left/Right/Esc)
  useEffect(() => {
    if (lightboxIndex === null || !work?.gallery) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % work.gallery.length)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + work.gallery.length) % work.gallery.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, work])

  // Touch Swipe Handlers for mobile devices
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !work?.gallery) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setLightboxIndex((prev) => (prev + 1) % work.gallery.length)
    } else if (isRightSwipe) {
      setLightboxIndex((prev) => (prev - 1 + work.gallery.length) % work.gallery.length)
    }
  }

  // Mouse Move Tilt Effect on framed image (Desktop only)
  const handleMouseMove = (e) => {
    if (!imageWrapperRef.current || window.matchMedia('(hover: none)').matches) return
    const card = imageWrapperRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Max 5 degrees rotation
    const rX = -(y / (rect.height / 2)) * 5
    const rY = (x / (rect.width / 2)) * 5

    gsap.to(card, {
      rotateX: rX,
      rotateY: rY,
      transformPerspective: 800,
      ease: 'power1.out',
      duration: 0.35,
      overwrite: 'auto'
    })
  }

  const handleMouseLeave = () => {
    if (!imageWrapperRef.current) return
    gsap.to(imageWrapperRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.5,
      overwrite: 'auto'
    })
  }

  if (!work) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-bebas text-6xl text-white tracking-widest mb-4">404</h1>
        <p className="text-neutral-400 font-mono text-sm uppercase tracking-wider mb-8">
          Project Not Found
        </p>
        <Link
          to="/works"
          className="px-6 py-2.5 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
        >
          BACK TO WORKS
        </Link>
      </div>
    )
  }

  // Get index parameters for Next Project link
  const currentIndex = works.findIndex((w) => w.slug === slug)
  const nextProject = works[(currentIndex + 1) % works.length]

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const currentUrl = `${siteUrl}/works/${work.slug}`

  // Map categories to short url filters
  let categoryUrl = '/works'
  if (work.category.includes('BRAND') || work.category.includes('REBRAND')) categoryUrl = '/works?category=branding'
  else if (work.category.includes('EDITORIAL') || work.category.includes('PUBLISH')) categoryUrl = '/works?category=editorial'
  else if (work.category.includes('SOCIAL') || work.category.includes('CAMPAIGN')) categoryUrl = '/works?category=digital'
  else if (work.category.includes('PACKAGING')) categoryUrl = '/works?category=packaging'

  // Headline lines split for masked line-by-line reveal
  const taglineWords = work.tagline ? work.tagline.split(' ') : ['THE', 'PROJECT', 'SHOWCASE.']
  const lineCount = Math.ceil(taglineWords.length / 2)
  const line1Text = taglineWords.slice(0, lineCount).join(' ')
  const line2Text = taglineWords.slice(lineCount).join(' ')

  // Renders paragraph text with animated sweep highlights
  const renderSentenceText = (text, highlights) => {
    if (!highlights || highlights.length === 0) return text

    // Sort highlights by length descending to match longest terms first and avoid partial splits
    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length)
    const escaped = sortedHighlights.map(h => h.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi')

    const parts = text.split(regex)
    return parts.map((part, index) => {
      const isMatch = sortedHighlights.some(h => h.toLowerCase() === part.toLowerCase())
      if (isMatch) {
        return (
          <span key={index} className="relative inline-block px-1.5 py-0.5 mx-0.5 text-white font-semibold rounded overflow-hidden select-none">
            {/* Background color sweep indicator */}
            <span className="highlight-sweep absolute inset-0 bg-[#ff6b35] origin-left scale-x-0" style={{ willChange: 'transform' }} />
            <span className="relative z-10">{part}</span>
          </span>
        )
      }
      return part
    })
  }

  // Split long paragraph strings into sentence chunks for staggered reveals
  const getSentences = (pText) => {
    return pText.split(/(?<=[.?!])\s+/)
  }

  const addSectionToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <article className="relative bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 selection:bg-[#1e90ff] selection:text-black">
      <SEO
        title={`${work.title} — Case Study`}
        description={work.subtitle}
        image={work.image}
        type="article"
        url={currentUrl}
      />

      {/* Back button positioned in top-left corner */}
      <Link
        to="/works"
        className="absolute left-6 top-[72px] sm:left-10 lg:left-14 group flex items-center gap-2 text-[13px] font-mono font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer z-20"
      >
        <span className="group-hover:-translate-x-1 transition-transform text-sm">←</span>
        BACK TO WORKS
      </Link>

      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── CASE STUDY HERO INTRO BLOCK ─────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-[50vh] flex flex-col justify-center py-8 border-b border-neutral-900 overflow-hidden"
        >
          {/* Background Layer: Giant low-opacity letters with parallax drift */}
          <div
            ref={bgLettersRef}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-8"
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="font-bebas text-[35vw] text-neutral-800/20 tracking-tighter uppercase leading-none select-none">
              {work.bgWord || work.client.split(' ')[0]}
            </span>
          </div>

          {/* Top Info Bar (Index + Category Tag) */}
          <div className="relative z-10 flex items-center justify-between w-full pb-6 border-b border-neutral-900/50 mb-10">
            <span ref={metaLeftRef} className="font-bebas text-2xl text-[#ff6b35] tracking-widest block font-bold">
              {work.index}
            </span>
            <a
              ref={metaRightRef}
              href={categoryUrl}
              className="font-mono text-xs text-neutral-400 hover:text-[#1e90ff] tracking-[0.2em] uppercase transition-colors"
            >
              {work.tag || 'CASE STUDY'}
            </a>
          </div>

          {/* Split Content Grid (Tagline vs Framed Mockup Image) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Mid-Left Block: Eyebrow + Masked Headline Title */}
            <div className="lg:col-span-7 space-y-6">
              <p
                ref={eyebrowRef}
                className="font-mono text-[10px] sm:text-xs text-[#ff6b35] tracking-[0.2em] uppercase"
              >
                {work.index} — {work.category}
              </p>

              <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-none">
                {/* Line 1 Mask Container */}
                <span className="block overflow-hidden relative h-[1.1em]">
                  <span ref={titleLine1Ref} className="inline-block origin-left">
                    {line1Text}
                  </span>
                </span>
                
                {/* Line 2 Mask Container */}
                <span className="block overflow-hidden relative h-[1.1em] mt-2">
                  <span ref={titleLine2Ref} className="inline-block origin-left text-neutral-400/90">
                    {line2Text}
                  </span>
                </span>
              </h1>
            </div>

            {/* Right Block: Framed Deliverable Product Photo with mouse tilt */}
            <div ref={imageFrameRef} className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                ref={imageWrapperRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.85)] border border-neutral-850/80 cursor-pointer"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <img
                  src={work.image}
                  alt={`${work.title} presentation`}
                  className="w-full h-full object-cover rounded-2xl pointer-events-none select-none"
                  style={{ transform: 'translateZ(20px)' }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── PROJECT METADATA GRID ───────────────────────────────────────── */}
        <header className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-neutral-900 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase">[ CLIENT ]</span>
              <span className="text-white font-bold block text-[13px]">{work.client}</span>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase">[ YEAR ]</span>
              <span className="text-white font-bold block text-[13px]">{work.year}</span>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase">[ ROLE / SERVICES ]</span>
              <span className="text-white font-bold block text-[13px] leading-relaxed">
                {work.services.join(', ')}
              </span>
            </div>
          </div>
        </header>

        {/* ── ANIMATED CASE STUDY BODY (PROGRESS RAIL + LINE REVEAL GRID) ─── */}
        {work.sections && work.sections.length > 0 && (
          <div ref={bodyContainerRef} className="relative pl-0 sm:pl-16 md:pl-20 py-8">
            
            {/* Scroll-Progress Rail (Hidden below 640px viewport width) */}
            <div className="absolute left-[2px] top-4 bottom-4 w-[1px] bg-neutral-900/60 overflow-hidden hidden sm:block">
              <div
                ref={progressRailRef}
                className="w-full bg-[#1e90ff] origin-top h-0 shadow-[0_0_8px_rgba(30,144,255,0.7)]"
                style={{ willChange: 'height' }}
              />
            </div>

            {/* Content Sections */}
            <div className="space-y-16 sm:space-y-24">
              {work.sections.map((sec, index) => (
                <section
                  key={index}
                  ref={addSectionToRefs}
                  className="relative space-y-4 max-w-3xl"
                >
                  {/* Progress dot marker (Lights up dynamically when section enters viewport) */}
                  <div className="absolute left-[-24px] top-[14px] w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center z-10 hidden sm:flex">
                    <div className="section-dot w-1.5 h-1.5 rounded-full bg-neutral-800 transition-all duration-300" />
                  </div>

                  {/* Heading line reveal */}
                  <div className="overflow-hidden mb-1">
                    <h2 className="section-title font-bebas text-2xl sm:text-3xl text-white tracking-wider leading-none">
                      {sec.heading}
                    </h2>
                  </div>
                  
                  {/* Sliding border line */}
                  <div className="section-line w-full h-[1px] bg-neutral-900 origin-left" />

                  {/* Paragraph text structure */}
                  <div className="pt-2 space-y-5 font-sans text-neutral-300 text-base sm:text-[17px] leading-relaxed">
                    {sec.paragraphs.map((p, pIdx) => {
                      const sentences = getSentences(p.text)
                      return (
                        <p key={pIdx} className="overflow-hidden flex flex-wrap gap-x-1.5">
                          {sentences.map((sent, sentIdx) => (
                            <span
                              key={sentIdx}
                              className="sec-sentence inline-block transition-all duration-500 opacity-0 transform translate-y-[12px]"
                            >
                              {renderSentenceText(sent, p.highlights)}
                            </span>
                          ))}
                        </p>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

          </div>
        )}

        {/* ── IMAGE GALLERY SHOWCASE (GRID + LIGHTBOX CAPABILITY) ─────────── */}
        {work.gallery && work.gallery.length > 0 && (
          <section className="space-y-8 mt-16 pt-10 border-t border-neutral-900">
            <h3 className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase">
              [ GALLERY &amp; SPECIFICATIONS ]
            </h3>
            
            {/* Smaller, clean gallery grid (2 cols mobile, 3 cols desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {work.gallery.map((item, idx) => (
                <figure
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group cursor-zoom-in relative"
                >
                  <div className="overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10] relative">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                    {/* Subtle contrast mask reveal on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── NEXT PROJECT NAVIGATION ────────────────────────────────────── */}
        <section className="mt-20 pt-12 border-t border-neutral-900 flex justify-between items-center">
          <div className="space-y-1 text-left">
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
              [ CURRENT LAYOUT INDEX ]
            </span>
            <span className="font-bebas text-lg text-white block">
              {work.index} / {works.length.toString().padStart(2, '0')}
            </span>
          </div>

          <Link
            to={`/works/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1.5 cursor-pointer text-right"
          >
            <span className="font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase">
              NEXT PROJECT →
            </span>
            <span className="font-bebas text-2xl sm:text-3xl text-neutral-300 group-hover:text-white transition-colors tracking-wide leading-none uppercase">
              {nextProject.title}
            </span>
          </Link>
        </section>

      </div>

      {/* ─── ENLARGED LIGHTBOX MODAL VIEWBOX ─────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && work.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/96 backdrop-blur-[8px] flex flex-col items-center justify-center"
          >
            {/* Close trigger overlay background click */}
            <div
              className="absolute inset-0 z-0 cursor-zoom-out"
              onClick={() => setLightboxIndex(null)}
            />

            {/* Top Bar (Counter + Close button) */}
            <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
              <span className="font-mono text-xs text-neutral-400 font-bold uppercase select-none">
                VIEW: {(lightboxIndex + 1).toString().padStart(2, '0')} / {work.gallery.length.toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors pointer-events-auto cursor-pointer"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </div>

            {/* Central Slider zone (Enlarged viewport size) */}
            <div className="relative z-10 w-full max-w-[95vw] flex items-center justify-between px-2 sm:px-6">
              
              {/* Prev Button */}
              {work.gallery.length > 1 && (
                <button
                  onClick={() => setLightboxIndex((prev) => (prev - 1 + work.gallery.length) % work.gallery.length)}
                  className="w-11 h-11 rounded-full bg-neutral-900/75 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer select-none"
                  aria-label="Previous slide"
                >
                  ←
                </button>
              )}

              {/* Display slide content - Static outer layout with absolute cross-fade on images */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="flex-1 flex flex-col items-center max-w-[88vw] sm:max-w-[80vw] relative cursor-grab active:cursor-grabbing"
              >
                {/* Image holder with fixed heights to prevent layout shifting */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={lightboxIndex}
                      src={work.gallery[lightboxIndex].url}
                      alt="Enlarged gallery showcase"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="max-h-[72vh] sm:max-h-[76vh] object-contain rounded-lg border border-neutral-850 shadow-[0_30px_70px_rgba(0,0,0,0.98)] select-none pointer-events-none"
                    />
                  </AnimatePresence>
                </div>

                {/* Animated Pagination Circles (if gallery contains multiple images) */}
                {work.gallery.length > 1 && (
                  <div className="flex items-center justify-center gap-2.5 mt-6 pointer-events-auto">
                    {work.gallery.map((_, idx) => {
                      const isActive = lightboxIndex === idx
                      return (
                        <button
                          key={idx}
                          onClick={() => setLightboxIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'w-6 bg-[#1e90ff] shadow-[0_0_8px_rgba(30,144,255,0.8)]'
                              : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Next Button */}
              {work.gallery.length > 1 && (
                <button
                  onClick={() => setLightboxIndex((prev) => (prev + 1) % work.gallery.length)}
                  className="w-11 h-11 rounded-full bg-neutral-900/75 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer select-none"
                  aria-label="Next slide"
                >
                  →
                </button>
              )}

            </div>

            {/* Keyboard Shortcuts Hint */}
            {work.gallery.length > 1 && (
              <div className="absolute bottom-6 z-10 pointer-events-none select-none">
                <span className="font-mono text-[9px] text-neutral-500 tracking-[0.2em] uppercase">
                  USE ← / → ARROWS TO SWITCH · ESC TO CLOSE
                </span>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
