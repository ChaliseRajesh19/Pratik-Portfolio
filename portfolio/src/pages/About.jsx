import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProfileImage from "../assets/Profile.png";
import { SectionMotionShell } from "../components/motion/SectionMotionShell";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const orbitBadges = [
  { label: "Brand Systems", top: "7%", left: "4%", delay: 0 },
  { label: "Motion Cuts", top: "16%", right: "2%", delay: 0.6 },
  { label: "Visual Identity", bottom: "17%", left: "0%", delay: 1.1 },
  { label: "Campaign Design", bottom: "10%", right: "4%", delay: 1.7 },
];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

function ScrollRevealTextContainer({ paragraphs }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  return (
    <div ref={containerRef} className="space-y-8 mt-10">
      {paragraphs.map((text, pi) => {
        const paraStart = pi / paragraphs.length;
        const paraEnd = (pi + 1) / paragraphs.length;
        const words = text.split(" ");

        return (
          <p
            key={pi}
            className="text-slate-300 text-base leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1"
          >
            {words.map((word, i) => {
              const wordLocalStart = i / words.length;
              const wordLocalEnd = wordLocalStart + 1 / words.length;
              const globalStart =
                paraStart + wordLocalStart * (paraEnd - paraStart);
              const globalEnd =
                paraStart + wordLocalEnd * (paraEnd - paraStart);

              return (
                <Word key={i} progress={scrollYProgress} range={[globalStart, globalEnd]}>
                  {word}
                </Word>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

function About({ withTopOffset = true }) {
  const stageRef = useRef(null);

  const sectionClassName = `min-h-screen px-4 py-10 md:py-24 ${
    withTopOffset ? "mt-16" : "mt-0"
  }`;

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  const stageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-18, 22]);
  const counterRingRotate = useTransform(ringRotate, (value) => value * -1.4);
  const badgeY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.04, 0.98]);

  const paragraphs = [
    "I am a Graphics Designer and Video Editor with 3+ years of experience delivering impactful visual content for brands worldwide. My work balances creative vision with strategic thinking to help businesses build strong visual identities, engage their audiences, and communicate their message through high-quality design and video.",
    "From branding and social media creatives to marketing visuals, professional video editing, and motion-based content, I deliver modern, results-driven solutions tailored to each client's goals. Every project is handled with attention to detail, thoughtful storytelling, and a commitment to quality.",
    "My mission is to transform ideas into compelling visuals and videos that elevate brands, strengthen online presence, and leave a lasting impression.",
  ];

  return (
    <SectionMotionShell
      variant="blue"
      ghostLabel="about"
      className={sectionClassName}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h2
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-black mb-6"
            >
              About Me
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-8 rounded-full"
            />

           

            <ScrollRevealTextContainer paragraphs={paragraphs} />
          </div>

          <div ref={stageRef} className="flex items-center justify-center h-full">
            <motion.div
              style={{ y: stageY }}
              className="relative max-w-lg w-full aspect-[0.92] flex items-center justify-center"
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-[10%] rounded-full border border-blue-400/20"
                style={{ rotate: ringRotate }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-[4%] rounded-full border border-white/10"
                style={{ rotate: counterRingRotate }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-[14%] rounded-full border border-cyan-300/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-[12%] rounded-[38%] bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_62%)] blur-3xl"
                style={{ scale: imageScale }}
              />

              {orbitBadges.map(({ label, delay, ...position }) => (
                <motion.div
                  key={label}
                  className="orbit-float absolute rounded-full border border-blue-400/20 bg-slate-950/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-200 shadow-[0_14px_30px_rgba(2,6,23,0.45)] backdrop-blur-xl"
                  style={{ ...position, y: badgeY }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.72, 1, 0.72],
                  }}
                  transition={{
                    duration: 5.5,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {label}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, rotate: -1.5 }}
                className="relative z-10 w-[78%] max-w-md group cursor-default"
              >
                <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_65%)] opacity-70 blur-2xl" />
                <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-transparent to-cyan-300/15"
                  animate={{ opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.img
                  src={ProfileImage}
                  alt="Pratik Bhusal"
                  className="relative w-full h-auto rounded-[2rem] object-cover border border-white/8"
                  style={{
                    scale: imageScale,
                    filter: "drop-shadow(0 28px 46px rgba(0, 0, 0, 0.42))",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionMotionShell>
  );
}

export default About;
