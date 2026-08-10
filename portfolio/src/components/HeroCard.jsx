import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import psTool from '../assets/tools/photoshop.jpg'
import aiTool from '../assets/tools/illustrator.jpg'
import prTool from '../assets/tools/premiere.jpg'
import paletteTool from '../assets/tools/palette.jpg'

export default function HeroCard() {
  // Cards in sequential order 01 -> 02 -> 03 -> 04
  const [cards, setCards] = useState([
    {
      id: 1,
      number: '01',
      title: 'Adobe Photoshop',
      subtitle: 'Photo & Digital Art',
      img: psTool,
    },
    {
      id: 2,
      number: '02',
      title: 'Adobe Illustrator',
      subtitle: 'Vector & Branding',
      img: aiTool,
    },
    {
      id: 3,
      number: '03',
      title: 'Premiere Video Editor',
      subtitle: 'Motion & Video Cuts',
      img: prTool,
    },
    {
      id: 4,
      number: '04',
      title: 'Color & Studio Palette',
      subtitle: 'Visual Identity System',
      img: paletteTool,
    },
  ])

  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Position offsets for 4 stacked cards (0 = top card, 3 = bottom card)
  const getCardTransform = (index) => {
    switch (index) {
      case 0: // Top card
        return { rotate: 14, y: 0, x: 0, scale: 1.0, zIndex: 4 }
      case 1:
        return { rotate: 5, y: -10, x: 10, scale: 0.97, zIndex: 3 }
      case 2:
        return { rotate: -6, y: -18, x: 20, scale: 0.94, zIndex: 2 }
      case 3: // Bottom card
        return { rotate: -15, y: -26, x: 28, scale: 0.91, zIndex: 1 }
      default:
        return { rotate: 0, y: 0, x: 0, scale: 1.0, zIndex: 0 }
    }
  }

  // Cycle top card to bottom of deck (01 -> 02 -> 03 -> 04 -> 01)
  const cycleNextCard = () => {
    if (isAnimating) return
    setIsAnimating(true)

    setCards((prevCards) => {
      const newCards = [...prevCards]
      const first = newCards.shift() // Take card 01 off top
      newCards.push(first) // Put card 01 at bottom
      return newCards
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-cycle every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      cycleNextCard()
    }, 4000)
    return () => clearInterval(timer)
  }, [cards, isAnimating])

  return (
    <div className="flex flex-col items-center lg:items-end justify-center py-6 select-none">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={cycleNextCard}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-[280px] sm:w-[320px] h-[340px] flex items-center justify-center group cursor-pointer"
      >
        {/* Glow backlight behind deck */}
        <div className="absolute inset-0 bg-brand/20 rounded-full blur-3xl group-hover:bg-brand/40 transition-colors duration-500 pointer-events-none" />

        {/* STACKED CARDS WITH HARDWARE ACCELERATED GPU SPRINGS */}
        {cards.map((card, index) => {
          const transform = getCardTransform(index)
          const isTopCard = index === 0

          return (
            <motion.div
              key={card.id}
              layout
              initial={{ y: -380, opacity: 0, scale: 0.75, rotate: transform.rotate * 1.5 }}
              animate={{
                y: transform.y,
                x: transform.x,
                rotate: transform.rotate,
                scale: transform.scale,
                opacity: 1,
              }}
              transition={{
                layout: { type: 'spring', stiffness: 220, damping: 22 },
                y: { type: 'spring', stiffness: 140, damping: 16, delay: (4 - card.id) * 0.12 },
                opacity: { duration: 0.4 },
              }}
              style={{ zIndex: transform.zIndex }}
              className={`absolute w-[220px] sm:w-[250px] aspect-square rounded-2xl bg-[#080808] border overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${
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
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
