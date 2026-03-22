import React from 'react'

function ImageCard({ work }) {
  if (!work) return null;

  const imageSrc = work.imageURL
    ? work.imageURL.startsWith('http')
      ? work.imageURL
      : `${import.meta.env.VITE_API_URL}${work.imageURL}`
    : '';

  const description = work.description || '';
  const tags = work.tags || [];

  return (
    <div className="group relative w-full bg-[#0a0a1a] rounded-[24px] overflow-hidden shadow-2xl border border-slate-800/40 hover:border-slate-700 transition-colors duration-300 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-900 isolation-auto">
        <img
          src={imageSrc}
          alt={work.title || 'Work image'}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* View Project Button (bottom-left like screenshot) */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 z-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
             <circle cx="11" cy="11" r="8"></circle>
             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="text-sm font-bold text-white tracking-wide drop-shadow-md">View Project</span>
        </div>
        
        {/* Clickable Link Wrapper over image */}
        {work.link && (
          <a href={work.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-20">
            <span className="sr-only">View Project</span>
          </a>
        )}
      </div>

      {/* Content Section */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-xl text-slate-100 font-bold tracking-tight">{work.title}</h3>
        
        {description && (
          <p className="text-slate-400 text-[13px] mt-3 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="mt-8 pt-2 flex flex-wrap gap-2 auto-rows-max">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="rounded-full bg-slate-800/50 border border-slate-700/60 px-3 py-1.5 text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded-full bg-slate-800/50 border border-slate-700/60 px-3 py-1.5 text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageCard;
