import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 border-t border-neutral-900/60 mt-auto select-none">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Left: Tagline */}
        <span className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase text-center md:text-left">
          VISUAL DESIGN · BRANDING · EDITORIAL
        </span>

        {/* Center: Credit */}
        <a
          href="https://nirajjoshi.com.np/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer text-center group"
        >
          DESIGNED &amp; BUILT BY{' '}
          <span className="text-[#1e90ff] group-hover:text-[#ff6b35] transition-colors duration-300">
            NIRAJ
          </span>
        </a>

        {/* Right: Copyright */}
        <span className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase text-center md:text-right">
          PRATIK BHUSAL © 2026. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  )
}
