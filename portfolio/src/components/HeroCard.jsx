import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroCard() {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Continuous Floating Animation Loop (GSAP)
      gsap.to(cardRef.current, {
        y: -14,
        rotate: '-12deg',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // 2. Pulse Glow Animation (GSAP)
      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'easeInOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex justify-center lg:justify-end items-center py-6">
      <div
        ref={cardRef}
        className="relative w-full max-w-[420px] aspect-[1.75] rotate-[-14deg] hover:rotate-[-4deg] hover:scale-105 transition-all duration-500 cursor-pointer group shadow-[0_30px_70px_rgba(0,0,0,0.8)] rounded-lg border border-neutral-800/90 bg-[#080808] overflow-hidden"
      >
        {/* Crosshatch / diagonal grid pattern texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

        {/* Diagonal stylized bold text banner inside card */}
        <div className="absolute inset-0 flex items-center justify-center rotate-[28deg] scale-130 pointer-events-none">
          <div className="w-full bg-[#050505]/95 border-y-2 border-brand/60 py-3 text-center shadow-2xl">
            <span className="font-bebas text-4xl sm:text-5xl tracking-widest text-white uppercase group-hover:text-brand transition-colors">
              TFRVIE
            </span>
          </div>
        </div>

        {/* Glow accent in brand color #1e90ff */}
        <div
          ref={glowRef}
          className="absolute -top-10 -right-10 w-36 h-36 bg-brand/20 rounded-full blur-2xl group-hover:bg-brand/40 transition-colors"
        />
      </div>
    </div>
  )
}
