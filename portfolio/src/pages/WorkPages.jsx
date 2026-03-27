import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api, { assetUrl } from "../lib/api";

// ─── Work details modal ──────────────────────────────────────────────────────────
function WorkDetailsModal({ work, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = work.galleryImages && work.galleryImages.length > 0 
    ? work.galleryImages 
    : [work.imageURL];
    
  const parsedImages = images.map(img => {
    if (!img) return "";
    return assetUrl(img);
  });

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !selectedImage) onClose();
      if (e.key === "Escape" && selectedImage) setSelectedImage(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, selectedImage]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "#0d131f",
          display: "flex",
          flexDirection: "column",
          overflowY: selectedImage ? "hidden" : "auto",
        }}
        className="custom-scrollbar"
      >
        {/* Content */}
        <div className="max-w-6xl w-full mx-auto px-4 py-8 md:py-12 md:px-8 flex-1 text-left relative">
          
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 mb-10"
          >
            ← Back to Works
          </button>
          {/* Top section: Category & Title */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-4">
              {work.category}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
              {work.title}
            </h1>
            
            <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>

          {/* Project Gallery */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-xl md:text-2xl font-bold text-white">Project Gallery</h2>
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {parsedImages.map((src, idx) => (
                <div 
                  key={idx} 
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-square cursor-pointer border border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg"
                  onClick={() => setSelectedImage(src)}
                >
                  <img 
                    src={src} 
                    alt={`Gallery image ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 border border-white/20">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fullscreen Image Overlay */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[1000] bg-[#0d131f]/95 backdrop-blur-xl flex flex-col p-4 md:p-8"
              style={{ paddingBottom: parsedImages.length > 1 ? "120px" : "32px" }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[1010]"
              >
                ✕
              </button>

              {/* Prev Button */}
              {parsedImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = parsedImages.indexOf(selectedImage);
                    const prevIndex = (currentIndex - 1 + parsedImages.length) % parsedImages.length;
                    setSelectedImage(parsedImages[prevIndex]);
                  }}
                  className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-300 z-[1010]"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
              )}

              {/* Next Button */}
              {parsedImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = parsedImages.indexOf(selectedImage);
                    const nextIndex = (currentIndex + 1) % parsedImages.length;
                    setSelectedImage(parsedImages[nextIndex]);
                  }}
                  className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-300 z-[1010]"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              )}

              {/* Main Image Area */}
              <div 
                className="flex-1 min-h-0 relative flex items-center justify-center w-full max-w-7xl mx-auto px-12"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    src={selectedImage}
                    alt="Fullscreen View"
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnail Strip */}
              {parsedImages.length > 1 && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-28 flex items-center justify-center gap-3 overflow-x-auto px-4 z-[1010] py-4 bg-gradient-to-t from-[#0d131f] to-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2 md:gap-3 overflow-x-auto px-4 max-w-full pb-2 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {parsedImages.map((src, idx) => {
                      const isActive = src === selectedImage;
                      return (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(src);
                          }}
                          className={`relative h-14 w-14 md:h-16 md:w-16 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 transform ${isActive ? 'ring-2 ring-white scale-110 opacity-100 z-10' : 'opacity-40 hover:opacity-80 scale-95'}`}
                        >
                          <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Work Card  (matches reference: image top, title, description, tags) ──────
const ACCENT = ["#06b6d4", "#a855f7", "#10b981", "#f97316", "#6366f1"];

function WorkCard({ work, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT[index % ACCENT.length];

  const src = assetUrl(work.imageURL);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "transform .25s ease",
      }}
    >
      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          background: "#0c1525",
          border: `1px solid ${hovered ? accent + "50" : "rgba(51,65,85,.3)"}`,
          boxShadow: hovered
            ? `0 12px 36px rgba(0,0,0,.45), 0 0 20px ${accent}18`
            : "0 2px 10px rgba(0,0,0,.25)",
          transition: "border-color .22s, box-shadow .22s",
        }}
      >
        {/* Image */}
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            overflow: "hidden",
            background: "#080f1e",
            position: "relative",
          }}
        >
          <img
            src={src}
            alt={work.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform .45s ease",
            }}
          />
          {/* hover overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity .22s",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "14px 16px 16px" }}>
          <h3
            style={{
              fontSize: 14.5,
              fontWeight: 700,
              color: "#f1f5f9",
              margin: "0 0 6px",
              lineHeight: 1.3,
            }}
          >
            {work.title}
          </h3>
          {work.description && (
            <p
              style={{
                fontSize: 12.5,
                color: "#64748b",
                lineHeight: 1.55,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {work.description}
            </p>
          )}
          {work.tags?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                marginTop: 10,
              }}
            >
              {work.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: 999,
                    border: `1px solid ${accent}40`,
                    color: accent,
                    background: `${accent}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
              {work.tags.length > 4 && (
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 999,
                    border: "1px solid rgba(100,116,139,.3)",
                    color: "#64748b",
                  }}
                >
                  +{work.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function WorkPages() {
  const { category } = useParams();
  const [works, setWorks] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    api.get('/api/categories')
      .then(({ data }) => {
        if (Array.isArray(data))
          setCategoryInfo(data.find((c) => c.slug === category) || null);
      })
      .catch(() => {});
  }, [category]);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/works/${category}`)
      .then(({ data }) => setWorks(Array.isArray(data) ? data : []))
      .catch(() => setWorks([]))
      .finally(() => setLoading(false));
  }, [category]);

  // Collect unique tags across all works
  const allTags = React.useMemo(() => {
    const set = new Set();
    works.forEach((w) => w.tags?.forEach((t) => set.add(t.toUpperCase())));
    return ["All", ...Array.from(set)];
  }, [works]);

  const filtered =
    activeTag === "All"
      ? works
      : works.filter((w) => w.tags?.some((t) => t.toUpperCase() === activeTag));

  const displayName = categoryInfo?.name || category;
  const displayDesc = categoryInfo?.description || "";

  return (
    <div
      className="min-h-screen pt-24 pb-16 relative"
      style={{
        width: "100%",
        background: "#020617",
        color: "#e2e8f0",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div className="px-6 pt-2">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200"
        >
          ← Back to Portfolio
        </Link>
      </div>

      <div
        className="max-w-[1700px] mx-auto px-6 mt-4"
      >

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <div>
            <h1
              className="text-4xl font-black text-slate-100 sm:text-5xl lg:text-6xl tracking-tight mb-2"
            >
              {displayName}
            </h1>
            {displayDesc && (
              <p
                className="text-xs uppercase tracking-[0.25em] text-cyan-500/80 font-bold max-w-2xl"
              >
                {displayDesc}
              </p>
            )}
          </div>

          {allTags.length > 1 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                marginTop: 4,
              }}
            >
              {allTags.map((tag) => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    style={{
                      padding: "5px 13px",
                      borderRadius: 999,
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      border: "none",
                      background: active
                        ? "linear-gradient(135deg,#7c3aed,#6366f1)"
                        : "rgba(51,65,85,.35)",
                      color: active ? "#fff" : "#64748b",
                      boxShadow: active
                        ? "0 2px 12px rgba(124,58,237,.4)"
                        : "none",
                      transition: "all .18s",
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div
            style={{ textAlign: "center", padding: "70px 0", color: "#475569" }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{ display: "inline-block", fontSize: 20 }}
            >
              ⟳
            </motion.span>
            <p
              style={{
                marginTop: 8,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Loading…
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "70px 0" }}>
            <p style={{ color: "#475569", fontSize: 14 }}>
              {search
                ? "No works match your search."
                : "No works in this category yet."}
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 22,
            }}
          >
            {filtered.map((work, i) => (
              <WorkCard
                key={work._id || i}
                work={work}
                index={i}
                onClick={() => setSelected(work)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <WorkDetailsModal work={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default WorkPages;
