import React from 'react'

function ServiceCard({icon, title, description}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-cyan-500 rounded text-2xl mb-4">
        <img src={icon} alt={title} className="w-12 h-12 rounded-full" />
      </div>
      
      <h3 className="text-xl text-cyan-400 font-bold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  )
}

export default ServiceCard