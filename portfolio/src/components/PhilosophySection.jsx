import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophySection() {
  const sectionRef = useRef(null)
  const lineA = useRef(null)
  const lineB = useRef(null)
  const observeRef = useRef(null)
  const questionRef = useRef(null)
  const distortRef = useRef(null)
  const refineRef = useRef(null)
  const createRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const keywords = [
        observeRef.current,
        questionRef.current,
        distortRef.current,
        refineRef.current,
        createRef.current,
      ].filter(Boolean)

      // 1. In-place Opacity Line-by-Line Reveal with Reverse on Scroll Up
      if (keywords.length > 0) {
        gsap.fromTo(
          keywords,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // 2. Intersecting Architectural Lines Draw-In
      if (lineA.current && lineB.current) {
        gsap.fromTo(
          [lineA.current, lineB.current],
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.4,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
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
      id="philosophy"
      className="relative min-h-[90vh] sm:min-h-screen bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 selection:bg-[#1e90ff] selection:text-black select-none flex flex-col justify-between overflow-hidden"
    >
      {/* 1. TOP BAR HEADER */}
      <div className="flex items-center justify-between w-full pb-6 border-b border-neutral-900 relative z-20">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">
          06
        </span>

        <span className="font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase">
          PHILOSOPHY
        </span>
      </div>

      {/* 2. INTERSECTING DIAGONAL ARCHITECTURAL LINES */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        {/* Line A: Red/Orange Diagonal Line */}
        <div
          ref={lineA}
          className="absolute w-[120%] h-[1px] bg-gradient-to-r from-[#ff6b35]/80 via-[#ff6b35] to-[#ff6b35]/20 origin-center -rotate-[16deg] opacity-0"
        />

        {/* Line B: Dark Gray Diagonal Line */}
        <div
          ref={lineB}
          className="absolute w-[120%] h-[1px] bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 origin-center rotate-[22deg] opacity-0"
        />
      </div>

      {/* 3. KINETIC TYPOGRAPHY MATRIX STAGE */}
      <div className="relative z-10 my-auto py-8 sm:py-16 w-full max-w-6xl mx-auto min-h-[340px] sm:min-h-[460px] flex flex-col justify-between">
        {/* TOP ROW: OBSERVE & QUESTION */}
        <div className="flex justify-between items-start w-full px-4 sm:px-12">
          {/* OBSERVE */}
          <motion.div
            ref={observeRef}
            whileHover={{ scale: 1.08, color: '#ffffff', textShadow: '0 0 25px rgba(30,144,255,0.7)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="font-bebas text-6xl sm:text-8xl lg:text-9xl text-white tracking-wider leading-none -rotate-[12deg] cursor-pointer opacity-0"
          >
            OBSERVE.
          </motion.div>

          {/* QUESTION */}
          <motion.div
            ref={questionRef}
            whileHover={{ scale: 1.08, color: '#ffffff', textShadow: '0 0 25px rgba(30,144,255,0.7)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-neutral-400 tracking-wider leading-none -rotate-[8deg] cursor-pointer opacity-0 pt-8 sm:pt-12"
          >
            QUESTION.
          </motion.div>
        </div>

        {/* CENTER ROW: DISTORT & REFINE */}
        <div className="flex justify-between items-center w-full px-2 sm:px-8 py-8 sm:py-12">
          {/* DISTORT */}
          <motion.div
            ref={distortRef}
            whileHover={{ scale: 1.1, textShadow: '0 0 30px rgba(255,107,53,0.9)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="font-bebas text-7xl sm:text-9xl lg:text-[10rem] text-[#ff6b35] font-bold tracking-wider leading-none rotate-[14deg] cursor-pointer opacity-0 drop-shadow-[0_15px_35px_rgba(255,107,53,0.3)]"
          >
            DISTORT.
          </motion.div>

          {/* REFINE */}
          <motion.div
            ref={refineRef}
            whileHover={{ scale: 1.08, color: '#ffffff', textShadow: '0 0 25px rgba(30,144,255,0.7)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-neutral-300 tracking-wider leading-none -rotate-[10deg] cursor-pointer opacity-0 pt-12"
          >
            REFINE.
          </motion.div>
        </div>

        {/* BOTTOM ROW: CREATE */}
        <div className="flex justify-center items-center w-full pt-6">
          <motion.div
            ref={createRef}
            whileHover={{ scale: 1.08, color: '#ffffff', textShadow: '0 0 30px rgba(30,144,255,0.85)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="font-bebas text-6xl sm:text-8xl lg:text-9xl text-white tracking-wider leading-none cursor-pointer opacity-0"
          >
            CREATE.
          </motion.div>
        </div>
      </div>
    </section>
  )
}
