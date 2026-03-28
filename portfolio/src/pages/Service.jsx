import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import { SectionHeader } from "../components/SectionHeader";
import { GridConnections } from "../components/GridConnections";
import { SectionMotionShell } from "../components/motion/SectionMotionShell";
import { useServices } from "../hooks/useServices";

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


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 relative z-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-10">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => (
                  <ServiceCard
                    key={service._id}
                    index={index}
                    title={service.title}
                    description={service.description}
                    icon={service.imageURL}
                  />
                ))
            ) : (
              <p className="col-span-full text-center text-slate-400">
                No services currently available.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </SectionMotionShell>
  );
}

export default Service;
