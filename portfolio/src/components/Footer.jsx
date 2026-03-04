import { Link, NavLink } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 items-start">

        {/* Brand / About */}
        <div>
          <h3 className="text-lg font-semibold text-white">Pratik Bhusal</h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Building clean, modern web experiences with a focus on performance,
            accessibility, and user-centered design.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
            Quick Links
          </h4>
          <div className="mt-3 flex flex-col gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-400'
                  : 'text-slate-300 hover:text-cyan-400 transition-colors'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-400'
                  : 'text-slate-300 hover:text-cyan-400 transition-colors'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-400'
                  : 'text-slate-300 hover:text-cyan-400 transition-colors'
              }
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-400'
                  : 'text-slate-300 hover:text-cyan-400 transition-colors'
              }
            >
              Contact
            </NavLink>
          </div>
        </div>

        {/* Contact / Social */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
            Contact
          </h4>
          <p className="mt-3 text-sm text-slate-400">
            Email: <a href="mailto:hello@pratikbhusal.com" className="hover:text-cyan-400">hello@pratikbhusal.com</a>
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="https://instagram.com/creativepratik22"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com/in/creativepratik22/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com/creativepratik_"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Pratik Bhusal. All rights reserved.</span>
          <Link
          to="https://www.linkedin.com/in/chaliserajes19/"
          className="opacity-70 hover:opacity-100 transition-opacity duration-300 text-white"
          >
            Designed By Rajesh Chalise
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
