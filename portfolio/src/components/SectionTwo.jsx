import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../context/ContentContext'

import section2Img from '../assets/section2.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function SectionTwo() {
  const { settings } = useContent()
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const topTextRef = useRef(null)
  const bottomTextRef = useRef(null)

  const topWatermark = settings?.sectionTwoTopWatermark || 'NORDIC'
  const bottomWatermark = settings?.sectionTwoBottomWatermark || 'STUDIO'
  const subtitle = settings?.sectionTwoSubtitle || '01 — NORDIC BRAND IDENTITY'
  const headline = settings?.sectionTwoHeadline || 'THE GEOMETRY OF COLD LIGHT.'

  const topLetters = topWatermark.toUpperCase().split('')
  const bottomLetters = bottomWatermark.toUpperCase().split('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ScrollTrigger reveal for Headline & Metadata with EXACT REVERSE on scroll up
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -70 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )

      // 2. ScrollTrigger 3D Scale & Elevation for Mockup Image with EXACT REVERSE on scroll up
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 90, scale: 0.88, rotateX: 12 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )

      // 3. Parallax horizontal scroll-driven movement for Watermark Text
      gsap.to(topTextRef.current, {
        x: 80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(bottomTextRef.current, {
        x: -80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between p-4 sm:p-10 lg:p-14 border-t border-neutral-900 overflow-hidden selection:bg-[#1e90ff] selection:text-black select-none"
    >
      {/* 1. TOP HEADER BAR */}
      <div className="relative z-20 flex items-center justify-between w-full pt-1 pb-4">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">
          02
        </span>

        <span className="font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase">
          TRANSFORMATION
        </span>
      </div>

      {/* 2. PARALLAX SCROLLING WATERMARK TYPOGRAPHY (TOP ROW) */}
      <div
        ref={topTextRef}
        className="absolute top-12 inset-x-0 flex justify-between px-8 sm:px-16 pointer-events-none opacity-25 font-bebas text-[11vw] leading-none text-neutral-600 tracking-widest select-none"
      >
        {topLetters.map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>

      {/* 3. CENTER CONTENT STAGE */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-6 sm:py-12">
        {/* LEFT: METADATA & HEADLINE */}
        <div ref={titleRef} className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ff6b35] font-semibold">
            {subtitle}
          </div>

          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider leading-[0.95]">
            {headline}
          </h2>
        </div>

        {/* RIGHT: FEATURED BRAND MOCKUP IMAGE CARD WITH SCROLLTRIGGER */}
        <div ref={imageRef} className="lg:col-span-6 flex justify-center lg:justify-end">
          <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-xl aspect-[1.6] rounded-2xl overflow-hidden border border-neutral-800/90 bg-[#0a0a0a] shadow-[0_25px_60px_rgba(0,0,0,0.9)] group cursor-pointer"
          >
            <img
              src={section2Img}
              alt="Nordic Brand Identity Mockup"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>
      </div>

      {/* 4. PARALLAX SCROLLING WATERMARK TYPOGRAPHY (BOTTOM ROW) */}
      <div
        ref={bottomTextRef}
        className="absolute bottom-6 inset-x-0 flex justify-between px-8 sm:px-16 pointer-events-none opacity-20 font-bebas text-[11vw] leading-none text-neutral-600 tracking-widest select-none"
      >
        {bottomLetters.map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>
    </section>
  )
}
