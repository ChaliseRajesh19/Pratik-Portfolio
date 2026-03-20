import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'

import graphicIcon from "../assets/tools/graphic.png"
import logoIcon from "../assets/tools/logo.png"
import brandIcon from "../assets/tools/brand.png"
import uiIcon from "../assets/tools/ui.png"
import videoIcon from "../assets/tools/video.png"
import creativeIcon from "../assets/tools/creative.jpg"

const services = [
  {
    icon: graphicIcon,
    title: "Graphic Design",
    description: "Eye-catching visuals for social media, marketing materials, and digital platforms that capture attention and drive engagement.",
  },
  {
    icon: logoIcon,
    title: "Logo Design",
    description: "Memorable and timeless logos that represent your brand's essence and leave a lasting impression on your audience.",
  },
  {
    icon: brandIcon,
    title: "Brand Identity",
    description: "Complete brand packages including color palettes, typography, and design systems that tell your unique story.",
  },
  {
    icon: uiIcon,
    title: "UI/UX Design",
    description: "User-centered interface designs that are both beautiful and functional, ensuring seamless digital experiences.",
  },
  {
    icon: videoIcon,
    title: "Video Editing",
    description: "Professional video editing and motion graphics that bring your content to life with cinematic quality.",
  },
  {
    icon: creativeIcon,
    title: "Creative Direction",
    description: "Strategic creative guidance to elevate your brand's visual presence across all touchpoints.",
  },
];

function Service({ withTopOffset = true }) {
  return (
    <section className={`relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-20 overflow-hidden ${withTopOffset ? 'mt-16' : 'mt-0'}`}>
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-2">Capabilities</p>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent'>
            My <span className="!bg-none text-cyan-500">Services</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            Delivering high-quality visual solutions tailored to elevate your brand and engage your audience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {services.map((service, index) => (
            <ServiceCard key={index} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service