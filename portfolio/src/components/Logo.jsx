import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoimg from '../assets/favicon.png';

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`group relative inline-flex items-center justify-center cursor-pointer ${className}`}>
      {/* Outer ambient glow */}
      <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-indigo-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 3D Glass Box */}
      <motion.span
        whileHover={{ scale: 1.05, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)] group-hover:border-cyan-400/50 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300"
      >
        <img
          src={logoimg}
          alt="Home"
          className="h-7 w-7 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        />
      </motion.span>
    </Link>
  );
}

export default Logo;
