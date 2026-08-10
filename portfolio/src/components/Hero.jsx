import React from 'react'
import Navbar from './Navbar'
import HeroTitle from './HeroTitle'
import HeroCard from './HeroCard'
import HeroFooter from './HeroFooter'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b border-neutral-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Center Main Stage */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center my-auto py-8">
        <div className="lg:col-span-7">
          <HeroTitle />
        </div>
        <div className="lg:col-span-5">
          <HeroCard />
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <HeroFooter />
    </section>
  )
}
