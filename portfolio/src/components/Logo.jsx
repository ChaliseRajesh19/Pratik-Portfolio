import logoimg from '../assets/favicon.png';

function Logo({ className = '' }) {
  return (
    <div className={`group relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-slate-900/50 to-slate-950/60 blur-sm opacity-70 transition-opacity duration-300 group-hover:opacity-100"></span>
      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 ring-1 ring-cyan-400/30 shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105">
        <img
          src={logoimg}
          alt="Logo"
          className="h-8 w-8 object-contain drop-shadow"
        />
      </span>
    </div>
  );
}

export default Logo;