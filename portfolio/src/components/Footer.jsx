import { Link, NavLink } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-[#020617] text-slate-200 overflow-hidden border-t border-blue-900/30">
      
      {/* Background ambient glow matching the 3D vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[100px] bg-blue-600/10 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-4 items-start relative z-10">

        {/* Brand / About */}
        <div className="md:col-span-2">
          <Link to="/" className="inline-block text-2xl font-black tracking-tight text-white mb-4 hover:opacity-80 transition-opacity">
            CREATIVE PRATIK
          </Link>
          <p className="max-w-md text-sm text-slate-400 leading-relaxed mb-8">
            A creative Graphic Designer & Video Editor building clean, modern, and high-impact visual experiences 
            with a focus on aesthetic perfection and strategic brand alignment. 
          </p>
          
          <div className="flex gap-3">
            {[
              { Icon: FaFacebook, href: 'https://facebook.com/creativepratik16' },
              { Icon: FaLinkedin, href: 'https://linkedin.com/in/creativepratik22/' },
              { Icon: FaInstagram, href: 'https://instagram.com/creativepratik22' },
              { Icon: FaTwitter, href: 'https://twitter.com/creativepratik_' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#061230] border border-blue-900/50 text-slate-400 hover:text-blue-500 hover:border-blue-600 hover:shadow-[0_0_12px_rgba(37,99,235,0.4)] transition-all duration-300"
              >
                <social.Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6 border-l-2 border-blue-600 pl-3">
            Navigation
          </h4>
          <nav className="flex flex-col gap-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/#about' },
              { name: 'Portfolio', path: '/#portfolio' },
              { name: 'Contact', path: '/#contact' }
            ].map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="w-fit text-sm text-slate-400 hover:text-blue-500 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Contact info shortcut */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6 border-l-2 border-blue-600 pl-3">
            Get in touch
          </h4>
          <div className="flex flex-col gap-3">
            <a href="mailto:pratikbhusal02@gmail.com" className="w-fit text-sm text-slate-400 hover:text-blue-500 transition-colors relative group">
              pratikbhusal02@gmail.com
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
            <span className="w-fit text-sm text-slate-400">
              Chandrauta, Nepal
            </span>
            <a 
              href="https://wa.me/9779800722127" 
              target="_blank" 
              rel="noreferrer"
              className="w-fit text-sm text-slate-400 hover:text-blue-500 transition-colors relative group"
            >
              Chat on WhatsApp
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal / Credits Bar */}
      <div className="border-t border-blue-900/30 bg-[#020617] relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-widest font-semibold text-slate-500">
          <span>&copy; {new Date().getFullYear()} Pratik Bhusal. All rights reserved.</span>
          
          <div className="flex items-center gap-1">
            <span>Designed By</span>
            <Link
              to="https://nirajjoshi.com.np/"
              target="_blank"
              className="text-slate-300 hover:text-blue-500 transition-colors"
            >
              JsByte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
