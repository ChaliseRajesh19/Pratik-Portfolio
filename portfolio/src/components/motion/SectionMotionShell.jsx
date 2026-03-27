import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PALETTES = {
  blue: {
    aura: "rgba(59, 130, 246, 0.24)",
    auraSecondary: "rgba(99, 102, 241, 0.2)",
    beam: "rgba(96, 165, 250, 0.75)",
    grid: "rgba(59, 130, 246, 0.16)",
  },
  cyan: {
    aura: "rgba(34, 211, 238, 0.24)",
    auraSecondary: "rgba(59, 130, 246, 0.18)",
    beam: "rgba(34, 211, 238, 0.78)",
    grid: "rgba(34, 211, 238, 0.16)",
  },
  violet: {
    aura: "rgba(168, 85, 247, 0.22)",
    auraSecondary: "rgba(59, 130, 246, 0.18)",
    beam: "rgba(196, 181, 253, 0.72)",
    grid: "rgba(168, 85, 247, 0.14)",
  },
  indigo: {
    aura: "rgba(99, 102, 241, 0.24)",
    auraSecondary: "rgba(14, 165, 233, 0.18)",
    beam: "rgba(129, 140, 248, 0.76)",
    grid: "rgba(99, 102, 241, 0.15)",
  },
};

export function SectionMotionShell({
  children,
  className = "",
  variant = "blue",
  ghostLabel = "",
}) {
  const ref = useRef(null);
  const palette = PALETTES[variant] || PALETTES.blue;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftAuraY = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const rightAuraY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const rightAuraX = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -70]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [-80, 90]);
  const ghostRotate = useTransform(scrollYProgress, [0, 1], [-9, 8]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const beamScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.45]);

  return (
    <section ref={ref} className={`relative isolate overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,1))]" />

      <motion.div
        aria-hidden="true"
        className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full blur-[120px]"
        style={{
          y: leftAuraY,
          background: `radial-gradient(circle, ${palette.aura} 0%, transparent 68%)`,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -right-28 bottom-0 h-[34rem] w-[34rem] rounded-full blur-[140px]"
        style={{
          x: rightAuraX,
          y: rightAuraY,
          background: `radial-gradient(circle, ${palette.auraSecondary} 0%, transparent 70%)`,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="section-grid absolute inset-0 opacity-60"
        style={{
          y: gridY,
          backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
          backgroundSize: "140px 140px",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0.15) 72%, transparent 100%)",
        }}
      />

      <div className="section-noise absolute inset-0 opacity-30" aria-hidden="true" />

      {ghostLabel ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-10 text-[4.25rem] font-black uppercase tracking-[0.35em] text-white/[0.03] md:right-8 md:top-6 md:text-[10rem]"
          style={{ x: ghostX, rotate: ghostRotate }}
        >
          {ghostLabel}
        </motion.div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-px"
        style={{
          scaleX: beamScale,
          background: `linear-gradient(90deg, transparent, ${palette.beam}, transparent)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default SectionMotionShell;
