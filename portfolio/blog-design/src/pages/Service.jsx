import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import ServiceModal from "../components/ServiceModal";
import { SectionHeader } from "../components/SectionHeader";
import { GridConnections } from "../components/GridConnections";
import { SectionMotionShell } from "../components/motion/SectionMotionShell";
import { useServices } from "../hooks/useServices";
import { useSEO } from "../hooks/useSEO";

const marqueeItems = [
  "brand identity",
  "motion systems",
  "video editing",
  "campaign design",
  "social visuals",
  "creative direction",
];

function Service({ withTopOffset = true }) {
  const { services, loading } = useServices()
  const stageRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  useSEO({
    title: 'Services — Graphic Design & Video Editing',
    description: 'Explore Pratik Bhusal’s services: Logo Design, Brand Identity, Social Media Creatives, Video Editing, Motion Graphics, and Campaign Design. Professional creative solutions.',
    canonicalPath: '/service',
    keywords: ['logo design', 'brand identity', 'video editing', 'social media design', 'motion graphics', 'campaign design', 'graphic design services Nepal'],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: {
        '@type': 'Person',
        name: 'Pratik Bhusal',
        url: 'https://creativepratik.com',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Creative Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logo Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Editing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motion Graphics' } },
        ],
      },
    },
  });

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  const stageY = useTransform(scrollYProgress, [0, 1], [90, -70]);
  const stageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.98]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.2, 0.8, 0.5, 0.2]);


  return (
    <SectionMotionShell
      variant="cyan"
      ghostLabel="services"
      className={`relative w-full py-12 md:py-20 ${
        withTopOffset ? "mt-16" : "mt-0"
      }`}
    >
      <div className="absolute inset-x-0 top-16 overflow-hidden opacity-70">
        <div className="motion-marquee gap-6 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.45em] text-cyan-200/20">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="px-6">
              {item}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[28%] h-32 w-[68%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          opacity: beamOpacity,
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.18), rgba(59,130,246,0.18), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Capabilities"
          title="My Services"
          subtitle="Delivering high-quality visual solutions tailored to elevate your brand and engage your audience."
        />

        <motion.div
          ref={stageRef}
          className="relative"
          style={{
            y: stageY,
            rotateX: stageRotate,
            scale: stageScale,
            transformPerspective: 1400,
          }}
        >
          <div className="absolute inset-x-[8%] top-0 h-full rounded-[2.5rem] border border-cyan-400/10 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5 shadow-[0_24px_80px_rgba(8,145,178,0.08)]" />

          <GridConnections />


          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10 relative z-10">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i} 
                  className="min-h-[290px] rounded-[1.8rem] border border-white/[0.03] bg-white/[0.01] p-8 animate-pulse flex flex-col pointer-events-none sticky sm:static"
                  style={{ top: `calc(80px + ${i * 12}px)`, zIndex: i }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] mb-8" />
                  <div className="h-6 w-1/2 bg-white/[0.04] rounded-lg mb-4" />
                  <div className="space-y-3 mb-auto mt-2">
                     <div className="h-3 w-full bg-white/[0.03] rounded-md" />
                     <div className="h-3 w-5/6 bg-white/[0.03] rounded-md" />
                     <div className="h-3 w-[70%] bg-white/[0.03] rounded-md" />
                  </div>
                  <div className="mt-8 pt-5 border-t border-white/[0.02]">
                     <div className="h-[2px] w-6 bg-white/[0.04] rounded-full" />
                  </div>
                </div>
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <div 
                  key={service._id} 
                  className="min-h-[240px] sticky sm:static"
                  style={{ top: `calc(80px + ${index * 12}px)`, zIndex: index }}
                >
                  <ServiceCard
                    index={index}
                    title={service.title}
                    description={service.description}
                    icon={service.imageURL}
                    onClick={() => setSelectedService({ ...service, icon: service.imageURL })}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-slate-400 py-10">
                No services currently available.
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </SectionMotionShell>
  );
}

export default Service;
