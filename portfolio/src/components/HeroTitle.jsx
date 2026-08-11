import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const WORD1 = 'PRATIK'.split('')
const WORD2 = 'BHUSAL'.split('')

export default function HeroTitle({ timeline }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pratikChars = containerRef.current?.querySelectorAll('.char-pratik')
    const bhusalChars = containerRef.current?.querySelectorAll('.char-bhusal')

    if (!pratikChars || !bhusalChars) return

    if (prefersReducedMotion) {
      gsap.set([pratikChars, bhusalChars], { y: '0%', rotate: 0, skewY: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set([pratikChars, bhusalChars], {
        y: '115%',
        rotate: 10,
        skewY: 6,
        opacity: 0,
      })

      const targetTimeline = timeline || gsap.timeline({ delay: 0.1 })

      targetTimeline.to(pratikChars, {
        y: '0%',
        rotate: 0,
        skewY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power4.out',
      }, 0)

      targetTimeline.to(bhusalChars, {
        y: '0%',
        rotate: 0,
        skewY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power4.out',
      }, 0.15) // Overlaps 150ms after PRATIK starts
    }, containerRef)

    return () => ctx.revert()
  }, [timeline])

  return (
    <div ref={containerRef} className="select-none flex flex-col justify-center py-4 overflow-visible">
      <h1 className="font-bebas tracking-tighter leading-[0.88] flex flex-col">
        {/* Line 1: PRATIK */}
        <span className="inline-flex overflow-visible pt-4 pb-2 -mt-4">
          {WORD1.map((char, index) => (
            <span key={`p-${index}`} className="inline-block overflow-hidden pt-4 pb-2 -mt-4">
              <span className="char-pratik inline-block text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[150px] xl:text-[185px] text-white transition-colors duration-300 hover:text-brand cursor-default will-change-transform leading-none">
                {char}
              </span>
            </span>
          ))}
        </span>

        {/* Line 2: BHUSAL */}
        <span className="inline-flex overflow-visible pt-4 pb-2 -mt-4">
          {WORD2.map((char, index) => (
            <span key={`b-${index}`} className="inline-block overflow-hidden pt-4 pb-2 -mt-4">
              <span className="char-bhusal inline-block text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[150px] xl:text-[185px] text-neutral-400/90 transition-colors duration-300 hover:text-white cursor-default will-change-transform leading-none">
                {char}
              </span>
            </span>
          ))}
        </span>
      </h1>
    </div>
  )
}
