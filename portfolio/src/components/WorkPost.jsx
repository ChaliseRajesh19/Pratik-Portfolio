import React, { useEffect, useRef, useState } from 'react'
import { worksData } from '../data/worksData'
import SEO from './SEO'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function WorkPost({ slug, onNavigate }) {
  const work = worksData.find((w) => w.slug === slug)

  const [lightboxIndex, setLightboxIndex] = useState(null)
  
  const heroRef = useRef(null)
  const bgLettersRef = useRef(null)
  const metaLeftRef = useRef(null)
  const metaRightRef = useRef(null)
  const eyebrowRef = useRef(null)
  const imageFrameRef = useRef(null)
  const imageWrapperRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)

  // Scroll to top on slug navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setLightboxIndex(null) // Reset lightbox when swapping projects
  }, [slug])

  // GSAP animations for intro & parallax scroll
  useEffect(() => {
    if (!work) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([bgLettersRef.current, metaLeftRef.current, metaRightRef.current, eyebrowRef.current, imageFrameRef.current], { opacity: 1 })
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // 1. Set initial hidden states
      gsap.set(bgLettersRef.current, { opacity: 0, scale: 0.94 })
      gsap.set([metaLeftRef.current, metaRightRef.current, eyebrowRef.current], { opacity: 0, y: 15 })
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: '102%', opacity: 1 })
      gsap.set(imageFrameRef.current, { opacity: 0, scale: 0.94 })

      // 2. Sequenced Entrance Timeline
      const tl = gsap.timeline({ delay: 0.15 })

      tl.to(bgLettersRef.current, {
        opacity: 0.08,
        scale: 1,
        duration: 1.1,
        ease: 'power2.out'
      })
      .to([metaLeftRef.current, metaRightRef.current, eyebrowRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.7')
      .to([titleLine1Ref.current, titleLine2Ref.current].filter(Boolean), {
        y: '0%',
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      }, '-=0.45')
      .to(imageFrameRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: 'power2.out'
      }, '-=0.55')

      // 3. Scroll-linked Parallax drift (scrub: true)
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
        <button
          onClick={() => onNavigate('/works')}
          className="px-6 py-2.5 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
        >
          BACK TO WORKS
        </button>
      </div>
    )
  }

  // Get index parameters for Next Project link
  const currentIndex = worksData.findIndex((w) => w.slug === slug)
  const nextProject = worksData[(currentIndex + 1) % worksData.length]
  const relatedProjects = worksData.filter((w) => w.slug !== slug).slice(0, 2)

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
      <button
        onClick={() => onNavigate('/works')}
        className="absolute left-6 top-[88px] sm:left-10 lg:left-14 group flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors cursor-pointer z-20"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        BACK TO WORKS
      </button>

      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── CASE STUDY HERO INTRO BLOCK (z-index wrapper) ───────────────── */}
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-neutral-900 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase">[ CLIENT ]</span>
              <span className="text-white font-bold block">{work.client}</span>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase">[ YEAR ]</span>
              <span className="text-white font-bold block">{work.year}</span>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase">[ ROLE / SERVICES ]</span>
              <span className="text-white font-bold block leading-relaxed">
                {work.services.join(', ')}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 block uppercase">[ ACTION ]</span>
              <button
                onClick={() => window.open('mailto:pratikbhusal12345@gmail.com', '_blank')}
                className="text-[#1e90ff] hover:text-[#ff6b35] transition-colors font-bold block cursor-pointer text-left"
              >
                REQUEST WORK DETAILS
              </button>
            </div>
          </div>
        </header>

        {/* ── CASE STUDY DETAILS ─────────────────────────────────────────── */}
        <div className="space-y-12 max-w-2xl mx-auto font-sans text-neutral-300 text-base sm:text-[17px] leading-relaxed py-6">
          
          {/* Challenge */}
          <div className="space-y-3">
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider border-b border-neutral-900 pb-2">
              THE CHALLENGE / BRIEF
            </h2>
            <p>{work.challenge}</p>
          </div>

          {/* Approach */}
          <div className="space-y-3">
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider border-b border-neutral-900 pb-2">
              THE APPROACH &amp; DEVELOPMENT
            </h2>
            <p>{work.approach}</p>
          </div>

          {/* Solution */}
          <div className="space-y-3">
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider border-b border-neutral-900 pb-2">
              THE SOLUTION
            </h2>
            <p>{work.solution}</p>
          </div>

          {/* Results */}
          <div className="space-y-3">
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider border-b border-neutral-900 pb-2">
              THE OUTCOME &amp; RESULT
            </h2>
            <p>{work.results}</p>
          </div>

        </div>

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
                  className="group cursor-pointer space-y-2 flex flex-col"
                >
                  <div className="overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10] relative">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                    {/* Hover detail indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-black/75 border border-neutral-800 text-[10px] font-mono tracking-widest text-[#1e90ff] uppercase shadow-lg">
                        ENLARGE VIEW
                      </span>
                    </div>
                  </div>
                  <figcaption className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider text-center sm:text-left truncate mt-1">
                    — {item.caption}
                  </figcaption>
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
              {work.index} / {worksData.length.toString().padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => onNavigate(`/works/${nextProject.slug}`)}
            className="group flex flex-col items-end gap-1.5 cursor-pointer text-right"
          >
            <span className="font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase">
              NEXT PROJECT →
            </span>
            <span className="font-bebas text-2xl sm:text-3xl text-neutral-300 group-hover:text-white transition-colors tracking-wide leading-none uppercase">
              {nextProject.title}
            </span>
          </button>
        </section>

        {/* ── RELATED WORKS GRID ─────────────────────────────────────────── */}
        <section className="mt-20 pt-10 border-t border-neutral-900">
          <h3 className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase mb-8">
            [ RELATED WORKS ]
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedProjects.map((related) => (
              <article
                key={related.slug}
                onClick={() => onNavigate(`/works/${related.slug}`)}
                className="group cursor-pointer flex flex-col space-y-3"
              >
                <div className="overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10]">
                  <img
                    src={related.image}
                    alt={`${related.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#ff6b35] font-semibold tracking-wider">
                  <span>{related.category}</span>
                  <span>·</span>
                  <span className="text-neutral-500">{related.year}</span>
                </div>
                <h4 className="font-bebas text-xl text-white group-hover:text-[#1e90ff] transition-colors leading-snug tracking-wide">
                  {related.title}
                </h4>
              </article>
            ))}
          </div>
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-[8px] flex flex-col items-center justify-center"
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

            {/* Central Slider zone */}
            <div className="relative z-10 w-full max-w-5xl flex items-center justify-between px-4 sm:px-8">
              
              {/* Prev Button */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev - 1 + work.gallery.length) % work.gallery.length)}
                className="w-11 h-11 rounded-full bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer select-none"
                aria-label="Previous slide"
              >
                ←
              </button>

              {/* Display slide content */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex-1 flex flex-col items-center max-w-[80vw] sm:max-w-[70vw] relative"
              >
                <img
                  src={work.gallery[lightboxIndex].url}
                  alt={work.gallery[lightboxIndex].caption}
                  className="max-h-[70vh] object-contain rounded-lg border border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                />
                
                {/* Slide Caption underneath */}
                <div className="mt-4 text-center">
                  <p className="font-mono text-xs text-[#ff6b35] tracking-widest uppercase block select-none">
                    — {work.gallery[lightboxIndex].caption}
                  </p>
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev + 1) % work.gallery.length)}
                className="w-11 h-11 rounded-full bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer select-none"
                aria-label="Next slide"
              >
                →
              </button>

            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="absolute bottom-6 z-10 pointer-events-none select-none">
              <span className="font-mono text-[9px] text-neutral-500 tracking-[0.2em] uppercase">
                USE ← / → ARROWS TO SWITCH · ESC TO CLOSE
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
