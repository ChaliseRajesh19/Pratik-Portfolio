import React from 'react'
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
    description:
      "Eye-catching visuals for social media, marketing materials, and digital platforms that capture attention and drive engagement.",
  },
  {
    icon: logoIcon,
    title: "Logo Design",
    description:
      "Memorable and timeless logos that represent your brand's essence and leave a lasting impression on your audience.",
  },
  {
    icon: brandIcon,
    title: "Brand Identity",
    description:
      "Complete brand packages including color palettes, typography, and design systems that tell your unique story.",
    link: "#",
  },
  {
    icon: uiIcon,
    title: "UI/UX Design",
    description:
      "User-centered interface designs that are both beautiful and functional, ensuring seamless digital experiences.",
  },
  {
    icon: videoIcon,
    title: "Video Editing",
    description:
      "Professional video editing and motion graphics that bring your content to life with cinematic quality.",
  },
  {
    icon: creativeIcon,
    title: "Creative Direction",
    description:
      "Strategic creative guidance to elevate your brand's visual presence across all touchpoints.",
  },
];

function Service({ withTopOffset = true }) {
  return (
    <section className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-6 ${withTopOffset ? 'mt-16' : 'mt-0'}`}>
    <h1 className='text-4xl font-bold text-center mb-6'>My <span className="text-cyan-500">Services</span></h1><br/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6 mt-4">
        {services.map((service,index) => (
            <ServiceCard key={index} {...service} />
        ))}
      
    </div>
    </section>
  )
}

export default Service