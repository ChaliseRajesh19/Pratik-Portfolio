import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../assets/logo.png'
import faviconImg from '../assets/favicon.png'

export default function Navbar() {
  const [activeNav, setActiveNav] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Blog']

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-40 w-full py-2 sm:py-4"
    >
      {/* ─────────────────────────────────────────────────────────────
         DESKTOP NAVBAR (MD AND UP)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center justify-between w-full bg-[#0a0a0a]/90 backdrop-blur-md border border-neutral-800/80 rounded-xl px-6 py-2.5 shadow-2xl">
        
        {/* LEFT: LOGO WITH FAVICON/LOGO IMAGE */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand/10 border border-brand/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(30,144,255,0.3)]">
            <img src={logoImg || faviconImg} alt="Creative Pratik Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bebas text-2xl tracking-wider text-white">
            CREATIVE PRATIK
          </span>
        </motion.div>

        {/* CENTER: NAV ITEMS WITH ANIMATED ACTIVE PILL */}
        <nav className="flex items-center gap-1 bg-[#121212] border border-neutral-800/60 rounded-lg p-1 relative">
          {navItems.map((item) => {
            const isActive = activeNav === item
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`relative px-4 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-brand font-bold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white rounded-md shadow-md"
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            )
          })}
        </nav>

        {/* RIGHT SIDE: HIRE ME & GET IN TOUCH */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://wa.me/9779762519961', '_blank')}
            className="text-xs font-medium text-neutral-300 hover:text-white px-3 py-2 rounded-lg hover:bg-neutral-800/50 transition-colors cursor-pointer"
          >
            Hire Me
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.open('mailto:pratikbhusal12345@gmail.com', '_blank')}
            className="group flex items-center bg-white hover:bg-neutral-100 transition-all rounded-md p-1 pl-3 font-medium text-xs text-brand cursor-pointer shadow-lg"
          >
            <span className="font-semibold mr-2 text-neutral-900 group-hover:text-brand transition-colors">
              Get in Touch
            </span>
            <span className="w-6 h-6 rounded bg-brand flex items-center justify-center text-white transition-colors shadow-sm">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                whileHover={{ x: 2, y: -2 }}
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </motion.svg>
            </span>
          </motion.button>
        </div>

      </div>


      {/* ─────────────────────────────────────────────────────────────
         MOBILE NAVBAR WITH LOGO IMAGE
      ───────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex items-center justify-between w-full bg-brand rounded-t-xl rounded-b-md px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2 select-none">
          <div className="w-7 h-7 rounded bg-white p-1 flex items-center justify-center shadow-sm">
            <img src={logoImg || faviconImg} alt="Creative Pratik Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bebas text-xl tracking-wider text-white">
            CREATIVE PRATIK
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span>Menu</span>
          <div className="grid grid-cols-2 gap-[2px] w-4 h-4 p-[1px]">
            <span className="bg-white rounded-[1px]" />
            <span className="bg-white rounded-[1px]" />
            <span className="bg-white rounded-[1px]" />
            <span className="bg-white rounded-[1px]" />
          </div>
        </button>
      </div>


      {/* ─────────────────────────────────────────────────────────────
         MOBILE MENU OVERLAY DRAWER
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-brand p-1 flex items-center justify-center">
                  <img src={logoImg || faviconImg} alt="Creative Pratik Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bebas text-xl tracking-wider text-white">
                  CREATIVE PRATIK
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white p-2 text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-6 my-auto items-center">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  onClick={() => {
                    setActiveNav(item)
                    setMobileMenuOpen(false)
                  }}
                  className={`font-bebas text-4xl tracking-wider uppercase transition-colors ${
                    activeNav === item ? 'text-brand' : 'text-white hover:text-neutral-300'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.open('https://wa.me/9779762519961', '_blank')
                }}
                className="w-full py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-medium text-sm text-center"
              >
                Hire Me
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.open('mailto:pratikbhusal12345@gmail.com', '_blank')
                }}
                className="w-full py-3 rounded-lg bg-brand text-black font-bold text-sm text-center"
              >
                Get in Touch ↗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
