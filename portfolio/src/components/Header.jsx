import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTwitter,FaFacebook} from 'react-icons/fa';
import Logo from './Logo';

function Header() {
  const location= useLocation();
  const isHomeRoute = location.pathname === '/';
  const sectionIds = useMemo(
    () => ['home', 'about', 'skills', 'service', 'portfolio', 'blog', 'contact'],
    []
  )
  const [activeHash, setActiveHash] = useState('#home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isHomeRoute) return

    const hash = location.hash || '#home'
    setActiveHash(hash)
  }, [isHomeRoute, location.hash])

  useEffect(() => {
    if (!isHomeRoute) return

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveHash(`#${visible[0].target.id}`)
        }
      },
      {
        root: null,
        threshold: [0.35, 0.6],
        rootMargin: '-30% 0px -50% 0px'
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [isHomeRoute, sectionIds])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname, location.hash])

  const isHashActive = (hash) => isHomeRoute && (activeHash === hash || (!activeHash && hash === '#home'));
  const hashLinkClass = (hash) =>
    isHashActive(hash)
      ? 'text-cyan-400'
      : 'text-slate-300 hover:text-cyan-400 transition-colors';

  const blogLinkClass = ({ isActive }) =>
    isActive
      ? 'text-cyan-400'
      : 'text-slate-300 hover:text-cyan-400 transition-colors';

  return (
    <header className="w-full bg-slate-950 text-slate-100 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
        {/* Left: Logo */}
        <div className="min-w-[160px] flex items-center">
          <Logo />
        </div>

        {/* Center: Nav */}
        <nav className="flex-1">
          <ul className="hidden md:flex items-center justify-center gap-6 text-sm font-medium">
            <li>
              <NavLink
                to="/#home"
                className={hashLinkClass('#home')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#about"
                className={hashLinkClass('#about')}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#skills"
                className={hashLinkClass('#skills')}
              >
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#service"
                className={hashLinkClass('#service')}
              >
                Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#portfolio"
                className={hashLinkClass('#portfolio')}
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#blog"
                className={hashLinkClass('#blog')}
              >
                Blog
              </NavLink>
            </li>


            <li>
              <NavLink
                to="/#contact"
                className={hashLinkClass('#contact')}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right: Social */}
        <div className="min-w-[160px] hidden md:flex items-center justify-end gap-3 text-slate-300">
          <a
            href="https://facebook.com/creativepratik16"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook size={18} />
          </a>
          <a
            href="https://linkedin.com/in/creativepratik22/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://twitter.com/creativepratik_"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="https://instagram.com/creativepratik22"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95">
          <nav className="max-w-6xl mx-auto px-4 py-4">
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li>
                <NavLink to="/#home" className={hashLinkClass('#home')}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/#about" className={hashLinkClass('#about')}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/#skills" className={hashLinkClass('#skills')}>
                  Skills
                </NavLink>
              </li>
              <li>
                <NavLink to="/#service" className={hashLinkClass('#service')}>
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/#portfolio" className={hashLinkClass('#portfolio')}>
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink to="/#blog" className={hashLinkClass('#blog')}>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/#contact" className={hashLinkClass('#contact')}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={blogLinkClass}>
                  All Blog Posts
                </NavLink>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-4 text-slate-300">
              <a
                href="https://facebook.com/creativepratik16"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://linkedin.com/in/creativepratik22/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://twitter.com/creativepratik_"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://instagram.com/creativepratik22"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Header;