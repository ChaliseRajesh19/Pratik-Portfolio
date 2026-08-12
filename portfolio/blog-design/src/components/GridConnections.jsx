import React from 'react';
import { motion } from 'framer-motion';

/**
 * Renders continuous glowing energy lines that originate from the center 
 * and connect to the approximate centers of the 6 service cards.
 */
export function GridConnections() {
  // We use percentages so it scales responsively behind the CSS Grid
  // There are 3 columns, 2 rows. 
  // Centers are roughly:
  // Top row: (16.6%, 25%), (50%, 25%), (83.3%, 25%)
  // Bottom row: (16.6%, 75%), (50%, 75%), (83.3%, 75%)
  
  const nodes = [
    { x: '16.6%', y: '25%' }, // top-left
    { x: '50%', y: '25%' },   // top-center
    { x: '83.3%', y: '25%' }, // top-right
    { x: '16.6%', y: '75%' }, // bottom-left
    { x: '50%', y: '75%' },   // bottom-center
    { x: '83.3%', y: '75%' }, // bottom-right
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {/* Central Core Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-[ping_3s_ease-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-cyan-500/30 animate-[spin_4s_linear_infinite] border-t-cyan-300" />
      </div>

      <svg className="w-full h-full opacity-60">
        <defs>
          <linearGradient id="energyBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map((node, i) => (
          <g key={i}>
            {/* The faint static track/cable */}
            <line
              x1="50%"
              y1="50%"
              x2={node.x}
              y2={node.y}
              stroke="rgba(30, 58, 138, 0.4)" // Dark blue faint track
              strokeWidth="2"
            />
            
            {/* The moving energy pulse */}
            <motion.line
              x1="50%"
              y1="50%"
              x2={node.x}
              y2={node.y}
              stroke="url(#energyBeam)"
              strokeWidth="2"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: -100 }}
              transition={{
                duration: 2 + (i % 3) * 0.5, // slightly varied speeds
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2 // offset starts
              }}
            />

            {/* Glowing endpoint behind each card */}
            <circle cx={node.x} cy={node.y} r="60" fill="url(#nodeGlow)" />
            <circle cx={node.x} cy={node.y} r="4" fill="#0891b2" className="animate-pulse" />
          </g>
        ))}
      </svg>
    </div>
  );
}
