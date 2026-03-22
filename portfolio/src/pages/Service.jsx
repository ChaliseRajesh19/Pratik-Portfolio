import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import { SectionHeader } from '../components/SectionHeader'
import { GridConnections } from '../components/GridConnections'
import { apiUrl, assetUrl } from '../lib/api'

function Service({ withTopOffset = true }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(apiUrl('/api/services'))
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch services:", err)
        setLoading(false)
      })
  }, [])

  return (
    <section className={`relative w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-12 md:py-20 overflow-hidden ${withTopOffset ? 'mt-16' : 'mt-0'}`}>
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Capabilities"
          title="My Services"
          subtitle="Delivering high-quality visual solutions tailored to elevate your brand and engage your audience."
        />

        <div className="relative">
          {/* Animated SVG background connections */}
          <GridConnections />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 relative z-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-10">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const iconSrc = assetUrl(service.imageURL)
                return (
                  <ServiceCard 
                    key={service._id} 
                    index={index} 
                    title={service.title} 
                    description={service.description} 
                    icon={iconSrc} 
                  />
                )
              })
            ) : (
              <p className="col-span-full text-center text-slate-400">No services currently available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Service
