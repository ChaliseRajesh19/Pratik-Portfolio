import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import About from "./About";
import Service from "./Service";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Testimonials from "../components/Testimonials";
import { DesignOrb } from "../components/three/DesignOrb";
import { HeroScene } from "../components/three/HeroScene";

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.4, duration: 0.6, ease: "easeOut" },
  }),
};

function Home() {
  const headlineWords = ["Hi There,", "I am", "Pratik", "Bhusal"];
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  const handlehireClick = () => {
    window.location.href = "mailto:mail@creativepratik.com";
  };

  const handleportfolio = () => {
    const target = document.getElementById("portfolio");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = "/portfolio";
  };

  return (
    <main>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen bg-[#020617] text-slate-100 pt-12 md:pt-16 pb-12 md:pb-16 scroll-mt-24 overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-4 py-6 md:py-8 grid md:grid-cols-2 gap-12 items-center">
          {/* ── LEFT: Animated Typography + CTAs ── */}
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mt-3">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-3 bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-blue-600 pb-2 drop-shadow-sm"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-slate-400 max-w-xl text-lg md:text-xl leading-relaxed"
            >
              A{" "}
              <span className="font-bold text-blue-400">
                Graphic Designer & Editor
              </span>{" "}
              with <span className="font-bold text-blue-400">3+</span> years of
              experience delivering impactful, pixel-perfect visual experiences.
            </motion.p>

            {/* Stats */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-10"
            >
              {[
                { value: "3+", label: "Years Experience" },
                { value: "500+", label: "Projects Done" },
                { value: "100+", label: "Happy Clients" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-2 border-blue-500/30 pl-4"
                >
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Premium 3D CTA buttons */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-wrap gap-5"
            >
              <motion.button
                onClick={handlehireClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-[2px] font-bold tracking-[0.15em] uppercase text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 animate-[spin_3s_linear_infinite] opacity-80" />
                <span className="relative flex items-center gap-3 bg-[#020617] px-8 py-3.5 rounded-2xl transition-all duration-300 group-hover:bg-slate-900/40 backdrop-blur-sm">
                  Hire Me
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </motion.button>

              <motion.button
                onClick={handleportfolio}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-900/10 px-8 py-3.5 font-bold tracking-[0.15em] uppercase text-blue-200 backdrop-blur-md hover:border-blue-400 hover:text-white hover:bg-blue-800/20 shadow-lg transition-all duration-300"
              >
                <span className="relative z-10">View Work</span>
              </motion.button>
            </motion.div>
          </div>

          {/* ── RIGHT: Transferred 3D Planet Scene ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative h-[400px] md:h-[520px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Subtle blue ring glow beneath the 3D model */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 60%)",
              }}
            />
            <DesignOrb />
          </motion.div>
        </div>

        {/* Scroll-down caret */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs tracking-widest uppercase"
        >
          <span>Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ── REST OF PAGE SECTIONS ── */}
      <div id="about" className="scroll-mt-24">
        <About withTopOffset={false} />
      </div>
      <div id="service" className="scroll-mt-24">
        <Service withTopOffset={false} />
      </div>
      <div id="portfolio" className="scroll-mt-24">
        <Portfolio withTopOffset={false} limit={6} showViewAll={true} />
      </div>
      <div id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </div>
      <div id="contact" className="scroll-mt-24">
        <Contact withTopOffset={false} />
      </div>
    </main>
  );
}

export default Home;
