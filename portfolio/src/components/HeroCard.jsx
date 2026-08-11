import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

import psTool from '../assets/tools/photoshop.jpg'
import aiTool from '../assets/tools/illustrator.jpg'
import prTool from '../assets/tools/premiere.jpg'
import paletteTool from '../assets/tools/palette.jpg'

export default function HeroCard({ timeline }) {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  cardRefs.current = []

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  // Cards in sequential order 01 -> 02 -> 03 -> 04
  const [cards, setCards] = useState([
    { id: 1, number: '01', title: 'Adobe Photoshop', subtitle: 'Photo & Digital Art', img: psTool },
    { id: 2, number: '02', title: 'Adobe Illustrator', subtitle: 'Vector & Branding', img: aiTool },
    { id: 3, number: '03', title: 'Premiere Video Editor', subtitle: 'Motion & Video Cuts', img: prTool },
    { id: 4, number: '04', title: 'Color & Studio Palette', subtitle: 'Visual Identity System', img: paletteTool },
  ])

  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  // Resting transform positions for 4 stacked cards (0 = top/front, 3 = bottom/back)
  const getCardTransform = (index) => {
    switch (index) {
      case 0: return { rotate: 14, y: 0, x: 0, scale: 1.0, zIndex: 4 }
      case 1: return { rotate: 5, y: -10, x: 10, scale: 0.97, zIndex: 3 }
      case 2: return { rotate: -6, y: -18, x: 20, scale: 0.94, zIndex: 2 }
      case 3: return { rotate: -15, y: -26, x: 28, scale: 0.91, zIndex: 1 }
      default: return { rotate: 0, y: 0, x: 0, scale: 1.0, zIndex: 0 }
    }
  }

  // Entrance GSAP animation & Idle breathing
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = cardRefs.current.filter(Boolean)

    if (elements.length === 0) return

    if (prefersReducedMotion) {
      elements.forEach((el, i) => {
        const t = getCardTransform(i)
        gsap.set(el, { opacity: 1, x: t.x, y: t.y, rotate: t.rotate, scale: t.scale })
      })
      setHasEntered(true)
      return
    }

    const ctx = gsap.context(() => {
      // Set initial off-screen positions for 3D depth entrance
      elements.forEach((el, index) => {
        const initialX = 60 + (3 - index) * 12
        const initialY = -40 - (3 - index) * 12
        const initialRotate = 25 + (3 - index) * 5

        gsap.set(el, {
          x: initialX,
          y: initialY,
          rotate: initialRotate,
          opacity: 0,
          scale: 0.85
        })
      })

      let idleTweens = []

      const stopIdleBreathing = () => {
        idleTweens.forEach((t) => t && t.kill())
        idleTweens = []
      }

      const startIdleBreathing = () => {
        stopIdleBreathing()
        if (elements[0]) {
          idleTweens.push(
            gsap.to(elements[0], {
              y: '+=8',
              duration: 4.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
          )
        }
        elements.slice(1).forEach((el, idx) => {
          idleTweens.push(
            gsap.to(el, {
              y: '+=4',
              duration: 5,
              delay: (idx + 1) * 0.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
          )
        })
      }

      // Entrance animation: back card first (index 3), front card last (index 0)
      const targetTl = timeline || gsap.timeline({ delay: 0.35 })
      const reversedElements = [...elements].reverse()

      targetTl.to(
        reversedElements,
        {
          x: (idx, target) => {
            const originalIdx = elements.indexOf(target)
            return getCardTransform(originalIdx).x
          },
          y: (idx, target) => {
            const originalIdx = elements.indexOf(target)
            return getCardTransform(originalIdx).y
          },
          rotate: (idx, target) => {
            const originalIdx = elements.indexOf(target)
            return getCardTransform(originalIdx).rotate
          },
          scale: (idx, target) => {
            const originalIdx = elements.indexOf(target)
            return getCardTransform(originalIdx).scale
          },
          opacity: 1,
          duration: 0.7,
          stagger: 0.13,
          ease: 'back.out(1.4)',
          onStart: () => {
            stopIdleBreathing()
          },
          onComplete: () => {
            setHasEntered(true)
            startIdleBreathing()
          },
        },
        0.35
      )
    }, containerRef)

    return () => ctx.revert()
  }, [timeline])

  // Cycle top card to bottom of deck
  const cycleNextCard = () => {
    if (isAnimating) return
    setIsAnimating(true)

    setCards((prevCards) => {
      const newCards = [...prevCards]
      const first = newCards.shift()
      newCards.push(first)
      return newCards
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-cycle every 4 seconds after entrance
  useEffect(() => {
    if (!hasEntered) return
    const timer = setInterval(() => {
      cycleNextCard()
    }, 4000)
    return () => clearInterval(timer)
  }, [cards, isAnimating, hasEntered])

  return (
    <div ref={containerRef} className="flex flex-col items-center lg:items-end justify-center py-6 select-none">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={cycleNextCard}
        className="relative w-[280px] sm:w-[320px] h-[340px] flex items-center justify-center group cursor-pointer"
      >
        {/* Glow backlight behind deck */}
        <div className="absolute inset-0 bg-brand/20 rounded-full blur-3xl group-hover:bg-brand/40 transition-colors duration-500 pointer-events-none" />

        {/* STACKED CARDS */}
        {cards.map((card, index) => {
          const transform = getCardTransform(index)
          const isTopCard = index === 0

          return (
            <div
              key={card.id}
              ref={addToRefs}
              style={{ zIndex: transform.zIndex }}
              className={`absolute w-[220px] sm:w-[250px] aspect-square rounded-2xl bg-[#080808] border overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-transform duration-300 ${
                isTopCard
                  ? 'border-brand shadow-[0_0_30px_rgba(30,144,255,0.45)] hover:scale-[1.04]'
                  : 'border-neutral-800/90'
              }`}
            >
              {/* Tool image */}
              <div className="w-full h-full relative">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-brand font-bold uppercase">
                      TOOL {card.number}
                    </span>

                    {/* ONLY SHOW "CLICK TO REVEAL" TEXT ON TOP CARD WHEN HOVERED */}
                    {isTopCard && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.85 }}
                        transition={{ duration: 0.2 }}
                        className="text-[9px] px-2.5 py-1 rounded bg-brand text-black font-bold uppercase tracking-wider shadow-md"
                      >
                        CLICK TO REVEAL
                      </motion.span>
                    )}
                  </div>

                  <h4 className="font-bebas text-xl text-white tracking-wider leading-tight mt-1.5">
                    {card.title}
                  </h4>
                  <p className="text-[9.5px] text-neutral-400 font-mono tracking-tight">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
