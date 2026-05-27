import React, { useEffect, useRef, useState } from "react";
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
  const totalImages = parsedImages.length;
  const selectedImageIndex =
    selectedMedia?.type === "image"
      ? typeof selectedMedia.index === "number"
        ? selectedMedia.index
        : parsedImages.findIndex((img) => img === selectedMedia.url)
      : -1;

  const openImageAt = (index) => {
    const nextIndex = Math.max(0, Math.min(index, totalImages - 1));
    const nextUrl = parsedImages[nextIndex];
    if (!nextUrl) return;
    setSelectedMedia({ type: "image", url: nextUrl, index: nextIndex });
  };

  const goToAdjacentImage = (direction) => {
    if (selectedImageIndex < 0 || totalImages <= 1) return;
    const nextIndex = selectedImageIndex + direction;
    if (nextIndex < 0 || nextIndex >= totalImages) return;
    openImageAt(nextIndex);
  };

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
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !selectedMedia) onClose();
      if (e.key === "Escape" && selectedMedia) setSelectedMedia(null);
      if (selectedMedia?.type === "image" && e.key === "ArrowLeft") {
        e.preventDefault();
        goToAdjacentImage(-1);
      }
      if (selectedMedia?.type === "image" && e.key === "ArrowRight") {
        e.preventDefault();
        goToAdjacentImage(1);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goToAdjacentImage, onClose, selectedMedia]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] overflow-y-auto bg-[#0d131f] flex flex-col"
      >
        <div className="max-w-6xl w-full mx-auto px-4 py-8 md:py-12 md:px-8 text-left relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 text-xs text-slate-500 font-medium">
            <button onClick={onClose} className="transition-colors hover:text-cyan-400">Home</button>
            <span className="opacity-50">›</span>
            <button onClick={onClose} className="transition-colors hover:text-cyan-400">Portfolio</button>
            <span className="opacity-50">›</span>
            <button onClick={onClose} className="transition-colors hover:text-cyan-400">{categoryDisplayName}</button>
            <span className="opacity-50">›</span>
            <span className="text-slate-300 truncate max-w-[150px] sm:max-w-[300px]">{headline}</span>
          </nav>
          <nav aria-hidden="true" className="hidden">

            <span className="opacity-50">›</span>
            <Link to="/portfolio" onClick={onClose} className="transition-colors hover:text-cyan-400">Portfolio</Link>
            <span className="opacity-50">›</span>
            <span className="text-slate-400">{categoryDisplayName}</span>
            <span className="opacity-50">›</span>
            <span className="text-slate-300 truncate max-w-[150px] sm:max-w-[300px]">{headline}</span>
          </nav>
        </div>

        <div className="max-w-6xl w-full mx-auto px-4 py-8 md:py-12 md:px-8 text-left relative">
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
                onClick={() => openImageAt(idx)}
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
              {(selectedMedia.type === "image" ? selectedMedia.url : parsedImages[0]) && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img
                    src={selectedMedia.type === "image" ? selectedMedia.url : parsedImages[0]}
                    alt="backdrop"
                    className="w-full h-full object-cover opacity-40 blur-[80px] scale-125 saturate-[1.5]"
                  />
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
                className="flex-1 min-h-0 relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-12"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex-1 min-h-0 w-full flex items-center justify-center">
                  {selectedMedia.type === "image" && totalImages > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => goToAdjacentImage(-1)}
                        disabled={selectedImageIndex <= 0}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition disabled:cursor-not-allowed disabled:opacity-35 hover:bg-white/20"
                        aria-label="Previous image"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => goToAdjacentImage(1)}
                        disabled={selectedImageIndex >= totalImages - 1}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition disabled:cursor-not-allowed disabled:opacity-35 hover:bg-white/20"
                        aria-label="Next image"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  ) : null}

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
                        alt={`Fullscreen view ${selectedImageIndex + 1}`}
                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {selectedMedia.type === "image" && totalImages > 0 ? (
                  <div className="relative z-20 mt-5 w-full max-w-4xl">
                    <div className="mb-3 flex items-center justify-between gap-3 px-1">
                      <span className="text-xs font-medium tracking-[0.24em] text-slate-400 uppercase">
                        {selectedImageIndex + 1} / {totalImages}
                      </span>
                      {totalImages > 1 ? (
                        <span className="hidden md:inline text-xs text-slate-400">
                          Use keyboard left and right arrows to navigate
                        </span>
                      ) : null}
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {parsedImages.map((src, idx) => {
                        const isActive = idx === selectedImageIndex;
                        return (
                          <button
                            key={`${src}-${idx}`}
                            type="button"
                            onClick={() => openImageAt(idx)}
                            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border transition-all duration-200 sm:h-[72px] sm:w-[72px] ${
                              isActive
                                ? "border-violet-400 ring-2 ring-violet-400/40"
                                : "border-white/10 hover:border-white/30"
                            }`}
                            aria-label={`View image ${idx + 1}`}
                            aria-pressed={isActive}
                          >
                            <img
                              src={src}
                              alt={`${headline} thumbnail ${idx + 1}`}
                              className={`h-full w-full object-cover transition duration-200 ${
                                isActive ? "scale-100 opacity-100" : "scale-[1.02] opacity-75 hover:opacity-100"
                              }`}
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function DirectImageLightbox({ item, images, categoryDisplayName, onClose, onSelect }) {
  const currentIndex = images.findIndex((image) => image.id === item.id);
  const headline = item.work.headline || item.work.title || "Portfolio Image";
  const categoryLabel = categoryDisplayName || item.work.category;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < images.length - 1;

  const goToImage = React.useCallback(
    (nextIndex) => {
      if (nextIndex < 0 || nextIndex >= images.length) return;
      onSelect(images[nextIndex]);
    },
    [images, onSelect]
  );

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToImage(currentIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToImage(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, goToImage, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] flex flex-col overflow-hidden bg-[#020617]/95 p-4 md:p-8"
      >
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={item.imageUrl}
            alt=""
            className="h-full w-full scale-125 object-cover opacity-25 blur-[80px] saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/30" />
        </div>

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-300">
              {categoryLabel}
            </p>
            {headline ? (
              <h2 className="mt-2 max-w-3xl text-lg font-bold text-white md:text-2xl">
                {headline}
              </h2>
            ) : null}
            <p className="mt-2 text-xs text-slate-400">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Close image"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-5 md:px-16"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => goToImage(currentIndex - 1)}
            disabled={!canGoPrevious}
            className="hidden md:flex absolute left-0 top-1/2 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous image"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.img
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              src={item.imageUrl}
              alt={headline}
              className="max-h-full max-w-full object-contain drop-shadow-2xl"
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={() => goToImage(currentIndex + 1)}
            disabled={!canGoNext}
            className="hidden md:flex absolute right-0 top-1/2 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next image"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {images.length > 1 && (
          <div className="relative z-10 mx-auto flex max-w-5xl gap-3 overflow-x-auto pb-1">
            {images.map((image, index) => {
              const isActive = image.id === item.id;
              const imageHeadline = image.work.headline || image.work.title || `Image ${index + 1}`;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(image);
                  }}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition sm:h-[72px] sm:w-[72px] ${
                    isActive
                      ? "border-cyan-300 ring-2 ring-cyan-300/35"
                      : "border-white/10 opacity-70 hover:border-white/30 hover:opacity-100"
                  }`}
                  aria-label={`View ${imageHeadline}`}
                  aria-pressed={isActive}
                >
                  <img src={image.imageUrl} alt={imageHeadline} className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Individual image tile for a category gallery.
function FlatImageCard({ item, index, onClick, selectedCaption }) {
  const [hovered, setHovered] = useState(false);
  const headline = item.work.headline || item.work.title;

  const isMatch = selectedCaption && headline === selectedCaption;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{ transform: hovered ? "translateY(-4px)" : "none", transition: "transform .22s ease" }}
    >
      <div className={`overflow-hidden rounded-[20px] border transition-all duration-300 ${
        isMatch
          ? 'border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
          : 'border-slate-800/60 hover:border-purple-500/40'
      } bg-[#0c1525] hover:shadow-[0_14px_40px_rgba(0,0,0,0.4)]`}>
        <div className="relative aspect-square overflow-hidden bg-slate-900">
          <img
            src={item.imageUrl}
            alt={headline ? `${headline} - Image ${item.imageIndex + 1}` : `Portfolio Image ${item.imageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-100 backdrop-blur-md">
            {item.work.category}
          </div>
          {isMatch && (
            <div className="absolute right-3 top-3 rounded-full bg-purple-500/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-purple-100 backdrop-blur-md">
              Match
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Keep the old WorkCard for backward compatibility if needed
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
  const [selectedCaption, setSelectedCaption] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const orderedWorks = React.useMemo(() => {
    return [...works].sort((left, right) => {
      const orderDelta = (left.displayOrder || 0) - (right.displayOrder || 0);
      if (orderDelta !== 0) return orderDelta;
      return new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime();
    });
  }, [works]);

  // Flatten all images from all works into a single array
  const flattenedImages = React.useMemo(() => {
    const images = [];
    orderedWorks.forEach(work => {
      const workImages = work.galleryImages && work.galleryImages.length > 0
        ? [work.imageURL, ...work.galleryImages]
        : [work.imageURL];

      workImages.forEach((imageUrl, imgIndex) => {
        if (imageUrl) {
          images.push({
            id: `${work._id}-${imgIndex}`,
            imageUrl,
            work,
            imageIndex: imgIndex,
            totalImagesInWork: workImages.length
          });
        }
      });
    });
    return images;
  }, [orderedWorks]);

  const captionOptions = React.useMemo(() => {
    const seen = new Set();
    return orderedWorks.reduce((options, work) => {
      const caption = (work.headline || work.title || '').trim();
      if (!caption || seen.has(caption)) return options;
      seen.add(caption);
      options.push(caption);
      return options;
    }, []);
  }, [orderedWorks]);

  const captionImageCounts = React.useMemo(() => {
    return flattenedImages.reduce((counts, item) => {
      const caption = item.work.headline || item.work.title || '';
      if (!caption) return counts;
      counts[caption] = (counts[caption] || 0) + 1;
      return counts;
    }, {});
  }, [flattenedImages]);

  const categoryInfo = categories.find(c => c.slug === category) || null;
  const displayName = categoryInfo?.name || category;
  const displayDesc = categoryInfo?.description || "";
  const showCategoryFilter = categoryInfo ? categoryInfo.showFilter !== false : false;

  useEffect(() => {
    if (selectedCaption && !captionOptions.includes(selectedCaption)) {
      setSelectedCaption('');
      setSelected(null);
    }
  }, [captionOptions, selectedCaption]);

  useEffect(() => {
    if (!showCategoryFilter && selectedCaption) {
      setSelectedCaption('');
      setSelected(null);
    }
  }, [selectedCaption, showCategoryFilter]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setFilterOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter images by the selected work caption/title.
  const filteredImages = React.useMemo(() => {
    if (!selectedCaption) return flattenedImages;

    return flattenedImages.filter(item => {
      const caption = item.work.headline || item.work.title || '';
      return caption === selectedCaption;
    });
  }, [flattenedImages, selectedCaption]);

  useSEO({
    title: `${displayName} Portfolio — Pratik Bhusal`,
    description: displayDesc || `Explore Pratik Bhusal's portfolio of ${displayName} projects and creative works.`,
    canonicalPath: `/portfolio/${category}`,
    keywords: [displayName.toLowerCase(), 'portfolio', 'pratik bhusal', 'creative work', 'design showcase'],
  });

  return (
    <div
      className="min-h-screen pt-12 md:pt-14 pb-16 relative"
      style={{
        width: "100%",
        background: "#020617",
        color: "#e2e8f0",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div className="relative z-10 flex items-center px-6 mb-8">
        <Link
          to="/portfolio"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-4 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back
        </Link>
      </div>

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-black text-slate-100 sm:text-5xl lg:text-6xl tracking-tight mb-3">
                {displayName}
              </h1>
              {displayDesc ? (
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-500/80 font-bold max-w-3xl">
                  {displayDesc}
                </p>
              ) : null}
            </div>

            {showCategoryFilter && (
              <div ref={filterRef} className="relative w-full lg:w-[380px]">
                <button
                  type="button"
                  onClick={() => setFilterOpen((open) => !open)}
                  className={`group flex min-h-[58px] w-full items-center justify-between gap-3 rounded-[18px] border bg-slate-950/70 px-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 ${
                    filterOpen
                      ? 'border-cyan-400/60 ring-4 ring-cyan-400/10'
                      : 'border-slate-700/80 hover:border-cyan-400/45'
                  }`}
                  aria-expanded={filterOpen}
                  aria-haspopup="listbox"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 6h18"/>
                        <path d="M7 12h10"/>
                        <path d="M10 18h4"/>
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/80">Filter</span>
                      <span className="block truncate text-sm font-semibold text-slate-100">
                        {selectedCaption || 'All image titles'}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {selectedCaption && (
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-bold text-cyan-200">
                        {filteredImages.length}
                      </span>
                    )}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-slate-400 transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {filterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 z-30 mt-3 w-full overflow-hidden rounded-[18px] border border-slate-700/80 bg-[#0b1220]/95 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl"
                      role="listbox"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCaption('');
                          setSelected(null);
                          setFilterOpen(false);
                        }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition ${
                          !selectedCaption ? 'bg-cyan-400/15 text-cyan-100' : 'text-slate-200 hover:bg-slate-800/80'
                        }`}
                        role="option"
                        aria-selected={!selectedCaption}
                      >
                        <span className="font-semibold">All image titles</span>
                        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-300">
                          {flattenedImages.length}
                        </span>
                      </button>
                      <div className="max-h-[280px] overflow-y-auto py-1">
                        {captionOptions.map((caption) => (
                          <button
                            key={caption}
                            type="button"
                            onClick={() => {
                              setSelectedCaption(caption);
                              setSelected(null);
                              setFilterOpen(false);
                            }}
                            className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition ${
                              selectedCaption === caption
                                ? 'bg-cyan-400/15 text-cyan-100'
                                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            }`}
                            role="option"
                            aria-selected={selectedCaption === caption}
                          >
                            <span className="min-w-0 truncate font-medium">{caption}</span>
                            <span className="shrink-0 rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-300">
                              {captionImageCounts[caption] || 0}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Filter results counter */}
          {selectedCaption && (
            <div className="mb-6 text-sm text-slate-400">
              {filteredImages.length === 0 ? (
                <span>No images found for "{selectedCaption}"</span>
              ) : (
                <span>
                  Showing {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''} for "{selectedCaption}"
                </span>
              )}
            </div>
          )}
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

        {!loading && flattenedImages.length === 0 && (
          <div style={{ textAlign: "center", padding: "70px 0" }}>
            <p style={{ color: "#475569", fontSize: 14 }}>
              No images in this category yet.
            </p>
          </div>
        )}

        {!loading && flattenedImages.length > 0 && filteredImages.length === 0 && selectedCaption && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-40">🔍</div>
            <p className="text-slate-400 text-lg mb-2">No images found</p>
            <p className="text-slate-500 text-sm">Try a different title or{' '}
              <button
                onClick={() => setSelectedCaption('')}
                className="text-purple-400 hover:text-purple-300 underline"
              >
                clear the filter
              </button>
            </p>
          </div>
        )}

        {!loading && filteredImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((item, i) => (
              <FlatImageCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setSelected(item)}
                selectedCaption={selectedCaption}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <DirectImageLightbox
          item={selected}
          images={filteredImages}
          categoryDisplayName={displayName}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </div>
  );
}

export default WorkPages;
