import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import ProjectCards3D from "../components/three/ProjectCards3D";
import { SectionHeader } from "../components/SectionHeader";
import { SectionMotionShell } from "../components/motion/SectionMotionShell";
import { useCategories } from "../hooks/useCategories";

const marqueeItems = [
  "selected work",
  "visual worlds",
  "category vault",
  "campaign stacks",
];

function Portfolio({ withTopOffset = true, limit = null, showViewAll = false }) {
  const location = useLocation();
  const containerClass = withTopOffset ? "min-h-screen mt-16" : "mt-0";
  const isStandalonePage = location.pathname === "/portfolio" && limit === null;

  const [works, setWorks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const sectionRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -90]);
  const cardsRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 4]);
  const cardsScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.98]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.15, 0.8, 0.5, 0.2]);

  const { categories, loading: categoriesLoading } = useCategories();
  
  React.useEffect(() => {
    if (categories?.length > 0) {
      setWorks(
        categories.map((cat, i) => ({
          id: cat._id || i,
          title: cat.name,
          description: cat.description || "",
          pagename: cat.slug,
          icon: cat.icon || "Art",
        }))
      );
    } else {
      setWorks([]);
    }
    if (!categoriesLoading) {
      setLoading(false);
    }
  }, [categories, categoriesLoading]);

  return (
    <SectionMotionShell
      variant="violet"
      ghostLabel="portfolio"
      className={`pt-6 pb-10 md:pb-16 ${containerClass}`}
    >
      <div className="absolute inset-x-0 top-14 overflow-hidden opacity-60">
        <div className="motion-marquee gap-8 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.45em] text-violet-200/20">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="px-6">
              {item}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[34%] h-48 w-[74%] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(59,130,246,0.12) 42%, transparent 72%)",
        }}
      />

      <div className="text-center mb-12 px-4 relative z-10">
        <SectionHeader
          label="My Work"
          title="My Portfolio"
          subtitle={
            isStandalonePage
              ? "Explore every category in a full-page portfolio grid."
              : "Pixel-perfect visuals crafted with purpose and staged with extra motion depth."
          }
        />
      </div>

      <div ref={sectionRef} className="relative z-10">
        {loading ? (
          <div className="text-center text-slate-500 py-20 text-sm tracking-widest uppercase">
            Loading categories...
          </div>
        ) : works.length === 0 ? (
          <div className="text-center text-slate-600 py-20 text-sm">
            No categories found.
          </div>
        ) : (
          <motion.div
            style={{
              y: cardsY,
              rotateX: cardsRotate,
              scale: cardsScale,
              transformPerspective: 1600,
            }}
            className="relative"
          >
            <ProjectCards3D
              works={works}
              limit={limit}
              showViewAll={showViewAll}
              layout={isStandalonePage ? "grid" : "rail"}
            />
          </motion.div>
        )}
      </div>
    </SectionMotionShell>
  );
}

export default Portfolio;
