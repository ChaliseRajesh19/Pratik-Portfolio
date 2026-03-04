import React from 'react'
import { Link } from 'react-router-dom'

function WorkCard({ title, description, imageURL ,pagename}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="p-6 sm:p-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette w-7 h-7 text-white">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
          </svg>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{description}</p>
        <Link to={`/portfolio/${pagename}`}>
        <button
          className="flex items-center text-primary font-bold gap-2 text-sm uppercase tracking-widest hover:text-cyan-400 transition-colors group-hover:text-cyan-400"
        >
          Explore Works
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 group-hover:translate-x-2 transition-transform duration-300">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
        </Link>
      </div>
    </div>
  )
}

export default WorkCard;