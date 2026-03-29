import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWorks } from "../hooks/useWorks";
import { useCategories } from "../hooks/useCategories";
import { useSEO } from "../hooks/useSEO";

function WorkDetailsModal({ work, categoryDisplayName, onClose }) {
  const [selectedMedia, setSelectedMedia] = useState(null); // { type: 'image' | 'video', url }

  const images =
    work.galleryImages && work.galleryImages.length > 0
      ? [work.imageURL, ...work.galleryImages]
      : [work.imageURL];

  const parsedImages = images.map((img) => img || "");
  const headline = work.headline || work.title || "Portfolio Image";

  // Helper to convert YT/Vimeo to embed
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    return url;
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !selectedMedia) onClose();
      if (e.key === "Escape" && selectedMedia) setSelectedMedia(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, selectedMedia]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-[#0d131f] flex flex-col"
      >
        <div className="max-w-6xl w-full mx-auto px-4 py-8 md:py-12 md:px-8 flex-1 text-left relative overflow-y-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 text-xs text-slate-500 font-medium">
            <button onClick={onClose} className="transition-colors hover:text-cyan-400">Home</button>
            <span className="opacity-50">›</span>
            <button onClick={onClose} className="transition-colors hover:text-cyan-400">Portfolio</button>
            <span className="opacity-50">›</span>
            <button onClick={onClose} className="transition-colors hover:text-cyan-400">{categoryDisplayName}</button>
            <span className="opacity-50">›</span>
            <span className="text-slate-300 truncate max-w-[150px] sm:max-w-[300px]">{headline}</span>
          </nav>

          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-4">
              {work.category}
            </div>
            {work.headline ? (
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
                {headline}
              </h1>
            ) : null}
            <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!work.videoURL && parsedImages.map((src, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-square cursor-pointer border border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg"
                onClick={() => setSelectedMedia({ type: 'image', url: src })}
              >
                <img
                  src={src}
                  alt={`${headline} ${idx + 1}`}
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

            {/* Video Tile placed at the end */}
            {work.videoURL && (
              <div
                className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-square cursor-pointer border border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                onClick={() => setSelectedMedia({ type: 'video', url: work.videoURL })}
              >
                {/* Use the main image as a background thumbnail with a strong overlay */}
                {parsedImages[0] && (
                  <img src={parsedImages[0]} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-xl group-hover:scale-110 transition-transform duration-300 ease-out">
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <span className="text-white font-bold tracking-wide text-sm drop-shadow-md">Short Video</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="fixed inset-0 z-[1000] flex flex-col p-4 md:p-8 overflow-hidden bg-[#0d131f]/80"
            >
              {/* Dynamic Blurred Glass Backdrop */}
              {parsedImages[0] && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img src={parsedImages[0]} alt="backdrop" className="w-full h-full object-cover opacity-40 blur-[80px] scale-125 saturate-[1.5]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
                </div>
              )}

              {/* Context Header */}
              <div className="relative z-10 w-full max-w-7xl mx-auto pointer-events-auto mt-2 px-2 md:px-8">
                <nav aria-label="Lightbox Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
                  <Link to="/" onClick={onClose} className="transition-colors hover:text-violet-400">Home</Link>
                  <span>›</span>
                  <Link to="/portfolio" onClick={onClose} className="transition-colors hover:text-violet-400">Portfolio</Link>
                  <span>›</span>
                  <button onClick={() => setSelectedMedia(null)} className="transition-colors hover:text-violet-400">{categoryDisplayName}</button>
                  <span>›</span>
                  <span className="text-slate-200 truncate max-w-[120px] sm:max-w-[300px]">{headline}</span>
                </nav>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMedia(null);
                }}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-[1010] backdrop-blur-md border border-white/10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>

              <div
                className="flex-1 min-h-0 relative flex items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-12"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  {selectedMedia.type === 'video' ? (
                    <motion.div
                      key={selectedMedia.url}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="h-[80vh] min-h-[400px] max-h-full max-w-full aspect-[9/16] rounded-[24px] overflow-hidden shadow-[0_0_80px_-15px_rgba(168,85,247,0.3)] bg-black shrink-0 relative"
                    >
                      <iframe 
                        src={getEmbedUrl(selectedMedia.url)} 
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </motion.div>
                  ) : (
                    <motion.img
                      key={selectedMedia.url}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      src={selectedMedia.url}
                      alt="Fullscreen View"
                      className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function WorkCard({ work, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const src = work.imageURL;
  const headline = work.headline || work.title || "Portfolio Image";
  const imageCount = (work.galleryImages?.length || 0) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{ transform: hovered ? "translateY(-4px)" : "none", transition: "transform .22s ease" }}
    >
      <div className="overflow-hidden rounded-[20px] border border-slate-800/60 bg-[#0c1525] transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_14px_40px_rgba(0,0,0,0.4)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
          <img
            src={src}
            alt={headline}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-85" />
          
          {work.videoURL && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-100 backdrop-blur-md">
            {work.category}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {work.headline ? (
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {headline}
              </h3>
            ) : null}
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
              {work.videoURL ? "1 Video" : `${imageCount} Image${imageCount > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorkPages() {
  const { category } = useParams();
  const { categories } = useCategories();
  const { works, loading } = useWorks({ category });
  const [selected, setSelected] = useState(null);

  const categoryInfo = categories.find(c => c.slug === category) || null;
  const displayName = categoryInfo?.name || category;
  const displayDesc = categoryInfo?.description || "";

  useSEO({
    title: `${displayName} Portfolio — Pratik Bhusal`,
    description: displayDesc || `Explore Pratik Bhusal's portfolio of ${displayName} projects and creative works.`,
    canonicalPath: `/portfolio/${category}`,
    keywords: [displayName.toLowerCase(), 'portfolio', 'pratik bhusal', 'creative work', 'design showcase'],
  });

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
      <nav
        aria-label="Breadcrumb"
        className="relative z-10 flex items-center gap-2 px-6 pt-4 mb-4 text-xs text-slate-500"
      >
        <Link to="/" className="transition-colors hover:text-violet-400">
          Home
        </Link>
        <span>›</span>
        <Link to="/portfolio" className="transition-colors hover:text-violet-400">
          Portfolio
        </Link>
        <span>›</span>
        <span className="text-slate-400">{displayName}</span>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 pt-2">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-100 sm:text-5xl lg:text-6xl tracking-tight mb-2">
            {displayName}
          </h1>
          {displayDesc ? (
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-500/80 font-bold max-w-2xl">
              {displayDesc}
            </p>
          ) : null}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "70px 0", color: "#475569" }}>
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

        {!loading && works.length === 0 && (
          <div style={{ textAlign: "center", padding: "70px 0" }}>
            <p style={{ color: "#475569", fontSize: 14 }}>
              No images in this category yet.
            </p>
          </div>
        )}

        {!loading && works.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {works.map((work, i) => (
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
        <WorkDetailsModal work={selected} categoryDisplayName={displayName} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default WorkPages;
