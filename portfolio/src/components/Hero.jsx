import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeroTitle from './HeroTitle'
import HeroCard from './HeroCard'
import HeroFooter from './HeroFooter'

import psTool from '../assets/tools/photoshop.jpg'
import aiTool from '../assets/tools/illustrator.jpg'
import prTool from '../assets/tools/premiere.jpg'
import paletteTool from '../assets/tools/palette.jpg'

gsap.registerPlugin(ScrollTrigger)

// Mobile card deck data
const MOBILE_DECK = [
  {
    id: 1,
    number: '01',
    title: 'Color & Studio Palette',
    subtitle: 'Visual Identity System',
    img: paletteTool,
  },
  {
    id: 2,
    number: '02',
    title: 'Typography Systems',
    subtitle: 'Geometric Scaling',
    img: aiTool,
  },
  {
    id: 3,
    number: '03',
    title: 'Brand Identity',
    subtitle: 'Adaptive Logo Systems',
    img: psTool,
  },
  {
    id: 4,
    number: '04',
    title: 'Digital Interfaces',
    subtitle: 'Responsive Products',
    img: prTool,
  }
]

// Reusable card inner renderer
function CardInner({ card, isTopCard }) {
  return (
    <div className="w-full h-full relative">
      <img
        src={card.img}
        alt={card.title}
        className="w-full h-full object-cover rounded-2xl"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-4">
        <span className="text-[10px] font-mono tracking-widest text-[#1e90ff] font-bold uppercase">
          TOOL {card.number}
        </span>
        <h4 className="font-bebas text-lg sm:text-xl text-white tracking-wider leading-tight mt-1">
          {card.title}
        </h4>
        <p className="text-[9.5px] text-neutral-400 font-mono tracking-tight">
          {card.subtitle}
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  const mobileContainerRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)
  const card4Ref = useRef(null)

  useEffect(() => {
    // Media query check: only run GSAP ScrollTrigger card pinning on screens < 768px
    const isMobile = window.matchMedia('(max-w: 767px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isMobile || prefersReducedMotion || !mobileContainerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Set initial offset positions for mobile stacked cards
      gsap.set(card1Ref.current, { rotate: 5, scale: 1.0, x: 0, opacity: 1 })
      gsap.set(card2Ref.current, { rotate: -4, scale: 0.96, x: 5, opacity: 1 })
      gsap.set(card3Ref.current, { rotate: 8, scale: 0.92, x: 10, opacity: 1 })
      gsap.set(card4Ref.current, { rotate: -12, scale: 0.88, x: 15, opacity: 1 })

      // 2. ScrollTrigger Timeline: Pins mobile hero and shuffles cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileContainerRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 1, // Smooth scrolling scrub binding
        }
      })

      // Card 1 rotates and slides out left, Card 2 straightens
      tl.to(card1Ref.current, {
        x: '-130%',
        rotate: -15,
        opacity: 0,
        ease: 'power1.inOut'
      }, 'stage1')
      tl.to(card2Ref.current, {
        rotate: 0,
        scale: 1,
        x: 0,
        ease: 'power1.inOut'
      }, 'stage1')

      // Card 2 rotates and slides out right, Card 3 straightens
      tl.to(card2Ref.current, {
        x: '130%',
        rotate: 15,
        opacity: 0,
        ease: 'power1.inOut'
      }, 'stage2')
      tl.to(card3Ref.current, {
        rotate: 0,
        scale: 1,
        x: 0,
        ease: 'power1.inOut'
      }, 'stage2')

      // Card 3 rotates and slides out left, Card 4 straightens
      tl.to(card3Ref.current, {
        x: '-130%',
        rotate: -15,
        opacity: 0,
        ease: 'power1.inOut'
      }, 'stage3')
      tl.to(card4Ref.current, {
        rotate: 0,
        scale: 1,
        x: 0,
        ease: 'power1.inOut'
      }, 'stage3')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative min-h-screen bg-[#050505]">
      
      {/* ══ DESKTOP HERO VIEW (768px and above) ════════════════════════ */}
      <div className="hidden md:flex min-h-screen flex-col justify-between px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
        {/* Center Main Stage */}
        <div className="relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-3 sm:py-6">
          <div className="lg:col-span-7">
            <HeroTitle />
          </div>
          <div className="lg:col-span-5">
            <HeroCard />
          </div>
        </div>
        <HeroFooter />
      </div>

      {/* ══ MOBILE HERO VIEW (Below 768px Breakpoint Switch) ════════════ */}
      <div
        ref={mobileContainerRef}
        className="md:hidden flex flex-col justify-between min-h-screen pt-[88px] pb-4 px-4 bg-[#050505] overflow-hidden"
      >
        {/* Enlarged Name block with offset positioning */}
        <div className="w-full text-left pl-2 mb-2">
          <h1 className="font-bebas tracking-tighter leading-[0.76] flex flex-col">
            <span className="text-[25vw] sm:text-[21vw] text-white">PRATIK</span>
            <span className="text-[25vw] sm:text-[21vw] text-neutral-400/90 pl-[12vw] sm:pl-[10vw]">BHUSAL</span>
          </h1>
        </div>

        {/* Card stack zone centered vertically - reduces empty bottom space */}
        <div className="flex-1 flex flex-col items-center justify-center my-4">
          
          {/* Card deck wrapper - enlarged card size */}
          <div className="relative w-[270px] sm:w-[315px] aspect-square flex items-center justify-center">
            
            {/* Backlight glow */}
            <div className="absolute inset-0 bg-[#1e90ff]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Card 4 (Bottom) */}
            <div
              ref={card4Ref}
              className="absolute inset-0 rounded-2xl bg-[#080808] border border-neutral-850 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)]"
              style={{ transform: 'rotate(-12deg) scale(0.88)' }}
            >
              <CardInner card={MOBILE_DECK[3]} />
            </div>

            {/* Card 3 */}
            <div
              ref={card3Ref}
              className="absolute inset-0 rounded-2xl bg-[#080808] border border-neutral-850 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)]"
              style={{ transform: 'rotate(8deg) scale(0.92)' }}
            >
              <CardInner card={MOBILE_DECK[2]} />
            </div>

            {/* Card 2 */}
            <div
              ref={card2Ref}
              className="absolute inset-0 rounded-2xl bg-[#080808] border border-neutral-850 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)]"
              style={{ transform: 'rotate(-4deg) scale(0.96)' }}
            >
              <CardInner card={MOBILE_DECK[1]} />
            </div>

            {/* Card 1 (Front) - Highlighted glowing blue border */}
            <div
              ref={card1Ref}
              className="absolute inset-0 rounded-2xl bg-[#080808] border border-[#1e90ff] overflow-hidden shadow-[0_0_20px_rgba(30,144,255,0.35)]"
              style={{ transform: 'rotate(5deg) scale(1)' }}
            >
              <CardInner card={MOBILE_DECK[0]} />
            </div>

          </div>

          {/* Repositioned Caption acting directly below card stack - comfortable mt-5 */}
          <div className="mt-5 text-center">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#ff6b35] font-bold uppercase">
              GRAPHIC DESIGNER / ART WORKER
            </span>
          </div>
        </div>

        {/* Scroll hint at the bottom */}
        <div className="w-full flex justify-center pb-2 mt-auto">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-neutral-500 uppercase animate-pulse">
            SCROLL TO ROTATE ↓
          </span>
        </div>

      </div>

    </section>
  )
}
