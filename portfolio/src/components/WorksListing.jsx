import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { worksData } from '../data/worksData'
import SEO from './SEO'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function WorksListing({ initialWorks }) {
  const navigate = useNavigate()
  const works = initialWorks && initialWorks.length > 0 ? initialWorks : worksData

  const [selectedCat, setSelectedCat] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('category')
      if (catParam) {
        const cat = catParam.toLowerCase()
        if (cat === 'branding') return 'Branding'
        if (cat === 'editorial') return 'Editorial'
        if (cat === 'digital') return 'Digital'
        if (cat === 'packaging') return 'Packaging'
      }
    }
    return 'All'
  })
  
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const cardsRef = useRef([])
  cardsRef.current = []

  const categories = ['All', 'Branding', 'Editorial', 'Digital', 'Packaging']

  // Click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  // Filter logic
  const filteredWorks = works.filter((work) => {
    if (selectedCat === 'All') return true
    if (selectedCat === 'Branding') return work.category.includes('BRAND') || work.category.includes('REBRAND')
    if (selectedCat === 'Editorial') return work.category.includes('EDITORIAL') || work.category.includes('PUBLISH')
    if (selectedCat === 'Digital') return work.category.includes('SOCIAL') || work.category.includes('CAMPAIGN')
    if (selectedCat === 'Packaging') return work.category.includes('PACKAGING')
    return true
  })

  // Stagger entry layout transition on category filter change with ScrollTrigger reverse scroll
  useEffect(() => {
    const targets = cardsRef.current.filter(Boolean)
    if (targets.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    // Reset targets to hidden initially
    gsap.set(targets, { opacity: 0, y: 30 })

    const triggers = []

    targets.forEach((card) => {
      const t = ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' })
        },
        onLeave: () => {
          gsap.to(card, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' })
        },
        onEnterBack: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          gsap.to(card, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.in' })
        }
      })
      triggers.push(t)
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [selectedCat])

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 select-none selection:bg-[#1e90ff] selection:text-black">
      <SEO
        title="Works & Case Studies — Pratik Bhusal"
        description="Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium minimal packaging case studies."
        url={`${siteUrl}/works`}
        type="website"
      />

      <div className="max-w-6xl mx-auto flex flex-col justify-between">
        
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <header className="border-b border-neutral-900 pb-8 mb-10">
          <p className="font-mono text-xs text-[#ff6b35] tracking-[0.25em] uppercase mb-3">
            [ PORTFOLIO / CASE STUDIES ]
          </p>
          <h1 className="font-bebas text-6xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none">
            WORKS
          </h1>
        </header>

        {/* ── PREMIUM CUSTOM DROPDOWN FILTER ───────────────────────────────── */}
        <div ref={dropdownRef} className="relative w-full max-w-[260px] mb-12 z-30">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2.5">
            [ FILTER CATEGORY ]
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#0c0c0c] border border-neutral-800/80 text-left font-mono text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer shadow-lg"
          >
            <span className="font-bold tracking-wider">{selectedCat.toUpperCase()}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {/* Animated Dropdown List */}
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 4, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 right-0 rounded-lg bg-[#0e0e0e] border border-neutral-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.95)] overflow-hidden"
              >
                {categories.map((cat) => {
                  const isSelected = selectedCat === cat
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          setSelectedCat(cat)
                          setIsOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 font-mono text-xs tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1e90ff] text-black font-bold border-l-4 border-black'
                            : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-white'
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* ── WORKS CARD GRID ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredWorks.map((work) => (
            <Link
              key={work.slug}
              to={`/works/${work.slug}`}
              ref={addToRefs}
              className="group cursor-pointer flex flex-col space-y-4 border-b border-neutral-900/50 pb-8 block"
            >
              {/* Image Frame with spring scale-up zoom hover */}
              <div className="overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10] relative">
                <motion.img
                  src={work.image}
                  alt={`${work.title} mockup`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  loading="lazy"
                />
                
                {/* Overlay detail on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                  <span className="text-[10px] font-mono text-[#ff6b35] tracking-widest uppercase mb-1">
                    {work.category}
                  </span>
                  <span className="text-white text-xs font-mono">
                    YEAR: {work.year}
                  </span>
                </div>
              </div>

              {/* Text Meta info */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase">
                  {work.client ? work.client.toUpperCase() : ''}
                </span>
                <span className="font-mono text-[10px] text-neutral-500 font-bold">
                  {work.year}
                </span>
              </div>

              <h2 className="font-bebas text-2xl sm:text-3xl text-white group-hover:text-[#1e90ff] transition-colors leading-snug tracking-wide">
                {work.title}
              </h2>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
