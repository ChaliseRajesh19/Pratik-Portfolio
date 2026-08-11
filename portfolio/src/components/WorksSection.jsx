import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { worksData } from '../data/worksData'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// REUSABLE LETTER-BY-LETTER GLOWING HOVER TEXT COMPONENT
// ─────────────────────────────────────────────────────────────
function GlowingHoverText({ text, className }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer select-none ${className}`}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          animate={{
            opacity: isHovered ? 1 : 0.85,
            color: isHovered ? '#ffffff' : '#f3f4f6',
            textShadow: isHovered ? '0 0 20px rgba(30,144,255,0.85)' : 'none',
          }}
          transition={{
            duration: 0.2,
            delay: isHovered ? index * 0.02 : (text.length - index) * 0.01,
            ease: 'easeOut',
          }}
          className="inline-block transition-colors"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// INTERACTIVE DRAGGABLE 3-CARD COMPONENT FOR WORK 01 (PATHAO)
// ─────────────────────────────────────────────────────────────
function DraggableCardGroupW1({ images }) {
  const [order, setOrder] = useState([0, 1, 2])

  const bringToFront = (clickedIdx) => {
    setOrder((prev) => {
      const filtered = prev.filter((i) => i !== clickedIdx)
      return [...filtered, clickedIdx]
    })
  }

  const basePositions = [
    { left: 'left-0', top: 'top-0', size: 'w-44 sm:w-56 aspect-[3/4]', rotate: -4 },
    { left: 'left-28 sm:left-44', top: 'top-8 sm:top-12', size: 'w-56 sm:w-72 aspect-square', rotate: 5 },
    { left: 'left-16 sm:left-24', top: 'top-28 sm:top-36', size: 'w-36 sm:w-48 aspect-[3/4]', rotate: 0 },
  ]

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center lg:justify-start">
      {order.map((imgIdx, stackPos) => {
        const pos = basePositions[imgIdx]

        return (
          <motion.div
            key={imgIdx}
            layout
            drag
            dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.08, zIndex: 50, cursor: 'grabbing' }}
            onDragStart={() => bringToFront(imgIdx)}
            onClick={() => bringToFront(imgIdx)}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ layout: { type: 'spring', stiffness: 280, damping: 24 } }}
            className={`pkg-card-w1 absolute ${pos.left} ${pos.top} ${pos.size} rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing`}
            style={{ zIndex: (stackPos + 1) * 10 }}
          >
            <img src={images[imgIdx]} alt={`Pathao ${imgIdx + 1}`} className="w-full h-full object-cover pointer-events-none select-none" />
          </motion.div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// INTERACTIVE DRAGGABLE 3-CARD COMPONENT FOR WORK 05 (SOCIAL MEDIA)
// ─────────────────────────────────────────────────────────────
function DraggableCardGroupW5({ images }) {
  const [order, setOrder] = useState([0, 1, 2])

  const bringToFront = (clickedIdx) => {
    setOrder((prev) => {
      const filtered = prev.filter((i) => i !== clickedIdx)
      return [...filtered, clickedIdx]
    })
  }

  const basePositions = [
    { right: 'right-0', top: 'top-3 sm:top-5', size: 'w-52 sm:w-64 aspect-[4/3]', rotate: 0 },
    { right: 'right-32 sm:right-48', top: 'top-12 sm:top-16', size: 'w-48 sm:w-60 aspect-[4/3]', rotate: -6 },
    { right: 'right-16 sm:right-24', top: 'top-32 sm:top-40', size: 'w-44 sm:w-56 aspect-[4/3]', rotate: 4 },
  ]

  return (
    <div className="relative w-full min-h-[420px] sm:min-h-[480px] flex items-start justify-center lg:justify-end pt-2 sm:pt-4">
      {order.map((imgIdx, stackPos) => {
        const pos = basePositions[imgIdx]

        return (
          <motion.div
            key={imgIdx}
            layout
            drag
            dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.08, zIndex: 50, cursor: 'grabbing' }}
            onDragStart={() => bringToFront(imgIdx)}
            onClick={() => bringToFront(imgIdx)}
            whileHover={{ y: -8, scale: 1.04 }}
            transition={{ layout: { type: 'spring', stiffness: 280, damping: 24 } }}
            className={`w5-card absolute ${pos.right} ${pos.top} ${pos.size} rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing`}
            style={{ zIndex: (stackPos + 1) * 10 }}
          >
            <img src={images[imgIdx]} alt={`Social ${imgIdx + 1}`} className="w-full h-full object-cover pointer-events-none select-none" />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function WorksSection({ initialWorks }) {
  const works = initialWorks && initialWorks.length > 0 ? initialWorks : worksData
  const containerRef = useRef(null)
  const [w4Hovered, setW4Hovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────
      // 1. WORK 01: IN-PLACE LINE-BY-LINE OPACITY FADE REVEAL (NO SLIDING)
      // ─────────────────────────────────────────────────────────────
      const w1 = containerRef.current?.querySelector('.work-1')
      if (w1) {
        gsap.fromTo(
          w1.querySelectorAll('.w1-text-el'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w1,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
        gsap.fromTo(
          w1.querySelectorAll('.pkg-card-w1'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w1,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // ─────────────────────────────────────────────────────────────
      // 2. WORK 02: IN-PLACE LINE-BY-LINE OPACITY FADE REVEAL
      // ─────────────────────────────────────────────────────────────
      const w2 = containerRef.current?.querySelector('.work-2')
      if (w2) {
        gsap.fromTo(
          w2.querySelectorAll('.w2-text-el'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w2,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
        gsap.fromTo(
          w2.querySelector('.w2-img'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w2,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // ─────────────────────────────────────────────────────────────
      // 3. WORK 03: IN-PLACE LINE-BY-LINE OPACITY FADE REVEAL
      // ─────────────────────────────────────────────────────────────
      const w3 = containerRef.current?.querySelector('.work-3')
      if (w3) {
        gsap.fromTo(
          w3.querySelectorAll('.w3-text-el'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w3,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
        gsap.fromTo(
          w3.querySelector('.w3-img'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w3,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // ─────────────────────────────────────────────────────────────
      // 4. WORK 04: IN-PLACE LINE-BY-LINE OPACITY FADE REVEAL
      // ─────────────────────────────────────────────────────────────
      const w4 = containerRef.current?.querySelector('.work-4')
      if (w4) {
        gsap.fromTo(
          w4.querySelector('.w4-img'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w4,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )

        gsap.fromTo(
          w4.querySelectorAll('.w4-text > *'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w4,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // ─────────────────────────────────────────────────────────────
      // 5. WORK 05: IN-PLACE LINE-BY-LINE OPACITY FADE REVEAL
      // ─────────────────────────────────────────────────────────────
      const w5 = containerRef.current?.querySelector('.work-5')
      if (w5) {
        gsap.fromTo(
          w5.querySelectorAll('.w5-text > *'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w5,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )

        gsap.fromTo(
          w5.querySelectorAll('.w5-card'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w5,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // ─────────────────────────────────────────────────────────────
      // 6. WORK 06: IN-PLACE LINE-BY-LINE OPACITY FADE REVEAL
      // ─────────────────────────────────────────────────────────────
      const w6 = containerRef.current?.querySelector('.work-6')
      if (w6) {
        gsap.fromTo(
          w6.querySelectorAll('.w6-text-el'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w6,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
        gsap.fromTo(
          w6.querySelector('.w6-img'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: w6,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="relative min-h-screen bg-[#050505] text-white py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 overflow-hidden selection:bg-[#1e90ff] selection:text-black select-none"
    >
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between w-full pb-6 sm:pb-10 lg:pb-12">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">
          03
        </span>

        <span className="font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase">
          SELECTED WORK
        </span>
      </div>

      {/* DYNAMICALLY MAP OVER WORKS DATA */}
      <div className="space-y-16 sm:space-y-24 lg:space-y-32">
        {works.map((work) => {
          // ─────────────────────────────────────────────────────────────
          // WORK 01: PATHAO 3-CARD INTERACTIVE DRAGGABLE LAYOUT
          // ─────────────────────────────────────────────────────────────
          if (work.layout === 'skincare-packaging') {
            const imgList = work.images || [work.image, work.image, work.image]

            return (
              <div key={work.id} className="work-1 grid lg:grid-cols-12 gap-10 items-center py-6">
                <div className="lg:col-span-7">
                  <DraggableCardGroupW1 images={imgList} />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <span className="w1-text-el text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block">
                    {work.index} &nbsp;/&nbsp; {work.category}
                  </span>

                  <Link to={`/works/${work.slug}`} className="w1-text-el block group">
                    <GlowingHoverText
                      text={work.title}
                      className="font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-wider leading-none"
                    />
                  </Link>

                  <p className="w1-text-el text-sm text-neutral-400 font-sans leading-relaxed max-w-lg">
                    {work.subtitle}
                  </p>
                </div>
              </div>
            )
          }

          // ─────────────────────────────────────────────────────────────
          // WORK 02: EDITORIAL PUBLISHING
          // ─────────────────────────────────────────────────────────────
          if (work.layout === 'editorial-publishing') {
            return (
              <div key={work.id} className="work-2 grid lg:grid-cols-12 gap-10 items-center py-6">
                <div className="lg:col-span-6 space-y-6">
                  <span className="w2-text-el text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block">
                    {work.index} &nbsp;/&nbsp; {work.category}
                  </span>

                  <Link to={`/works/${work.slug}`} className="block group">
                    <h3 className="w2-text-el font-bebas text-4xl sm:text-5xl lg:text-6xl text-white group-hover:text-[#1e90ff] transition-colors tracking-wider leading-none">
                      {work.title}
                    </h3>
                  </Link>

                  <p className="w2-text-el text-sm text-neutral-400 font-sans leading-relaxed max-w-lg">
                    {work.description}
                  </p>

                  {work.quote && (
                    <blockquote className="w2-text-el font-bebas text-2xl sm:text-3xl text-white tracking-wider pt-4 border-t border-neutral-800/80">
                      {work.quote}
                    </blockquote>
                  )}
                </div>

                <div className="w2-img lg:col-span-6 flex justify-center lg:justify-end">
                  <Link to={`/works/${work.slug}`} className="w-full max-w-lg">
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                    >
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                  </Link>
                </div>
              </div>
            )
          }

          // ─────────────────────────────────────────────────────────────
          // WORK 03: MOTION BANNER
          // ─────────────────────────────────────────────────────────────
          if (work.layout === 'motion-banner') {
            return (
              <div key={work.id} className="work-3 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w3-text-el text-xs font-mono text-neutral-400 tracking-widest uppercase">
                    {work.index} &nbsp;/&nbsp; {work.category}
                  </span>
                  <Link to={`/works/${work.slug}`}>
                    <h3 className="w3-text-el font-bebas text-2xl sm:text-3xl text-white hover:text-[#1e90ff] transition-colors tracking-wider">
                      {work.title}
                    </h3>
                  </Link>
                </div>

                <Link to={`/works/${work.slug}`} className="block">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w3-img relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 flex items-end p-8 sm:p-12 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none">
                      <h2 className="w3-distort font-bebas text-6xl sm:text-8xl lg:text-9xl text-white tracking-wider leading-none drop-shadow-2xl">
                        {work.overlayTitle || 'DISTORTION'}
                      </h2>
                    </div>
                  </motion.div>
                </Link>
              </div>
            )
          }

          // ─────────────────────────────────────────────────────────────
          // WORK 04: PACKAGING REVERSED
          // ─────────────────────────────────────────────────────────────
          if (work.layout === 'packaging-reversed') {
            return (
              <div key={work.id} className="work-4 grid lg:grid-cols-12 gap-10 items-center py-6">
                <div className="w4-img lg:col-span-6 flex justify-center lg:justify-start">
                  <Link to={`/works/${work.slug}`} className="w-full max-w-lg">
                    <motion.div
                      onMouseEnter={() => setW4Hovered(true)}
                      onMouseLeave={() => setW4Hovered(false)}
                      whileHover={{ scale: 1.04, y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.9)] group cursor-pointer"
                    >
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                  </Link>
                </div>

                <div className="w4-text lg:col-span-6 space-y-6">
                  <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block">
                    {work.index} &nbsp;/&nbsp; {work.category}
                  </span>

                  <Link to={`/works/${work.slug}`} className="block">
                    <motion.h3
                      animate={{
                        color: w4Hovered ? '#ffffff' : '#f3f4f6',
                        textShadow: w4Hovered ? '0 0 22px rgba(30,144,255,0.6)' : 'none',
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-wider leading-none transition-all hover:text-[#1e90ff]"
                    >
                      {work.title}
                    </motion.h3>
                  </Link>

                  <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-lg">
                    {work.description}
                  </p>
                </div>
              </div>
            )
          }

          // ─────────────────────────────────────────────────────────────
          // WORK 05: REVERSED 3-CARD INTERACTIVE DRAGGABLE LAYOUT
          // ─────────────────────────────────────────────────────────────
          if (work.layout === 'social-media-3card-reversed') {
            const imgList = work.images || [work.image, work.image, work.image]

            return (
              <div key={work.id} className="work-5 grid lg:grid-cols-12 gap-10 items-start py-6">
                <div className="w5-text lg:col-span-5 space-y-6 pt-1">
                  <span className="text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block">
                    {work.index} &nbsp;/&nbsp; {work.category}
                  </span>

                  <Link to={`/works/${work.slug}`} className="block">
                    <h3 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white hover:text-[#1e90ff] transition-colors tracking-wider leading-none">
                      {work.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-lg">
                    {work.description}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <DraggableCardGroupW5 images={imgList} />
                </div>
              </div>
            )
          }

          // ─────────────────────────────────────────────────────────────
          // WORK 06: HERO LANDSCAPE
          // ─────────────────────────────────────────────────────────────
          if (work.layout === 'hero-landscape') {
            return (
              <div key={work.id} className="work-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w6-text-el text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold">
                    {work.index} &nbsp;/&nbsp; {work.category}
                  </span>
                  <Link to={`/works/${work.slug}`}>
                    <h3 className="w6-text-el font-bebas text-2xl sm:text-3xl text-white hover:text-[#1e90ff] transition-colors tracking-wider">
                      {work.title}
                    </h3>
                  </Link>
                </div>

                <Link to={`/works/${work.slug}`} className="block">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w6-img relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </motion.div>
                </Link>
              </div>
            )
          }

          return null
        })}
      </div>
    </section>
  )
}
