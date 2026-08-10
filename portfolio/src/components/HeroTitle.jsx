import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroTitle() {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for PRATIK and BHUSAL
      gsap.fromTo(
        line1Ref.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out', delay: 0.2 }
      )

      gsap.fromTo(
        line2Ref.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out', delay: 0.4 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="select-none flex flex-col justify-center overflow-hidden py-4">
      <h1 className="font-bebas tracking-tighter leading-[0.80] flex flex-col">
        <span
          ref={line1Ref}
          className="inline-block text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[150px] xl:text-[185px] text-white transition-all duration-300 hover:text-brand hover:tracking-normal cursor-default"
        >
          PRATIK
        </span>
        <span
          ref={line2Ref}
          className="inline-block text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[150px] xl:text-[185px] text-neutral-400/90 transition-all duration-300 hover:text-white cursor-default"
        >
          BHUSAL
        </span>
      </h1>
    </div>
  )
}
