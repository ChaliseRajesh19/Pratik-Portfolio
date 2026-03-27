import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

/* ── Nav items ──────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#service" },
  { label: "Portfolio", hash: "#portfolio" },
  { label: "Blogs", hash: "blogs" },
  { label: "Contact", hash: "#contact" },
];

/* ── Classic 3-Line Hamburger ────────────────────────────────── */
function HamburgerIcon({ open }) {
  return (
    <div className="relative w-6 h-[18px] flex flex-col justify-center items-center">
      <motion.span
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        className="absolute top-0 right-0 w-full h-[2px] bg-slate-200 rounded-full origin-center"
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        className="absolute top-1/2 -translate-y-1/2 right-0 w-full h-[2px] bg-slate-200 rounded-full origin-center"
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        className="absolute bottom-0 right-0 w-full h-[2px] bg-slate-200 rounded-full origin-center"
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomeRoute = location.pathname === "/";
  const sectionIds = useMemo(
    () =>
      NAV_ITEMS.filter((n) => n.hash.startsWith("#")).map((n) =>
        n.hash.slice(1)
      ),
    []
  );

  const [activeHash, setActiveHash] = useState("#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomeRoute) return;
    setActiveHash(location.hash || "#home");
  }, [isHomeRoute, location.hash]);

  useEffect(() => {
    if (!isHomeRoute) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 250) { setActiveHash("#home"); return; }
      if (scrollY + windowHeight >= documentHeight - 150) { setActiveHash("#footer"); return; }

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      let currentActive = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY + 300) {
          currentActive = `#${sections[i].id}`;
          break;
        }
      }
      if (currentActive) setActiveHash(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomeRoute, sectionIds]);

  useEffect(() => setIsMenuOpen(false), [location.pathname, location.hash]);

  const isActive = (hash) => {
    if (!hash.startsWith("#")) {
      if (hash === "blogs")
        return location.pathname === "/blogs" || location.pathname.startsWith("/blog/");
      return location.pathname === `/${hash}`;
    }
    if (hash === "#portfolio")
      return (isHomeRoute && activeHash === "#portfolio") || location.pathname.startsWith("/portfolio");
    return isHomeRoute && (activeHash === hash || (!activeHash && hash === "#home"));
  };

  const smoothEase = [0.22, 1, 0.36, 1];

  /* ── Shared scroll handler ── */
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (!isHomeRoute) {
      navigate("/", { state: { scrollTo: hash.slice(1) } });
      return;
    }
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ════════════════════════════════════════
          HEADER
      ════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="w-full fixed top-0 left-0 z-50 transition-all duration-500"
        style={{
          /* Only add bg/blur once scrolled — completely invisible at top */
          background: scrolled
            ? "rgba(2, 6, 23, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(99,179,237,0.08)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-4 flex items-center gap-4 relative"
          style={{ height: "4.5rem" }}
        >
          {/* ── Logo ── */}
          <motion.div
            className="min-w-fit flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (isHomeRoute) window.scrollTo({ top: 0, behavior: "smooth" });
              else window.location.href = "/";
            }}
          >
            <Logo />
          </motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="flex-1 hidden md:block">
            <ul className="flex items-center justify-center gap-2 text-[13px] font-semibold tracking-wide capitalize">
              {NAV_ITEMS.map(({ label, hash }) => {
                const active = isActive(hash);
                const NavContent = () => (
                  <>
                    <span className="relative z-10 transition-colors duration-300">{label}</span>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-cyan-400 transition-all duration-300 rounded-full group-hover:w-[calc(100%-2.5rem)]" />
                    {active && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-x-0 inset-y-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)] z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
                      />
                    )}
                  </>
                );

                return (
                  <motion.li
                    key={hash}
                    style={{ perspective: 1000 }}
                    whileHover={{ scale: 1.05, y: -2, rotateX: 25 }}
                    whileTap={{ scale: 0.95, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative origin-bottom"
                  >
                    {hash.startsWith("#") ? (
                      <button
                        onClick={(e) => handleNavClick(e, hash)}
                        className={`group relative block px-5 py-2.5 rounded-full transition-colors duration-300 bg-transparent border-none cursor-pointer ${
                          active ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
                        }`}
                      >
                        <NavContent />
                      </button>
                    ) : (
                      <NavLink
                        to={`/${hash}`}
                        className={`group relative block px-5 py-2.5 rounded-full transition-colors duration-300 ${
                          active ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
                        }`}
                      >
                        <NavContent />
                      </NavLink>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center ml-auto">
            {localStorage.getItem("adminToken") && (
              <NavLink
                to="/admin/dashboard"
                className="ml-2 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 mr-2"
              >
                Admin
              </NavLink>
            )}
            <motion.a
              href="mailto:mail@creativepratik.com"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(37,99,235,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group border border-blue-500/30"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(30,64,175,0.3))",
                color: "#ffffff",
                boxShadow: "0 0 15px rgba(37,99,235,0.2)",
              }}
            >
              <div className="absolute inset-0 w-full h-full bg-blue-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10">Hire Me</span>
            </motion.a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="ml-auto md:hidden flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className="flex items-center justify-center w-10 h-10 z-[60] bg-transparent border-none outline-none"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              <HamburgerIcon open={isMenuOpen} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ════════════════════════════════════════
          MOBILE SIDEBAR DRAWER
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              key="mobile-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[78vw] max-w-[320px] z-[100] flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(4,10,35,0.98) 0%, rgba(2,6,23,0.99) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                boxShadow: "-24px 0 60px rgba(0,0,0,0.7)",
                borderLeft: "1px solid rgba(99,179,237,0.08)",
              }}
            >
              {/* ── Decorative top glow ── */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />
              {/* ── Decorative bottom glow ── */}
              <div
                className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
                  transform: "translate(-30%, 30%)",
                }}
              />

              {/* ── Close Button ── */}
              <div className="flex items-center justify-between px-6 relative z-10" style={{ height: "4.5rem" }}>
                {/* Mini logo text */}
                <span
                  className="text-xs font-black uppercase tracking-[0.25em] text-slate-500"
                  style={{ letterSpacing: "0.3em" }}
                >
                  Menu
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-700/60 bg-slate-800/50 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-300" />
                  </svg>
                </motion.button>
              </div>

              {/* ── Divider ── */}
              <div className="mx-6 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

              {/* ── Nav Links ── */}
              <nav className="flex-1 flex flex-col px-6 gap-1 relative z-10 pt-8">
                {NAV_ITEMS.map(({ label, hash }, i) => {
                  const active = isActive(hash);
                  const commonClass = `group flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl transition-all duration-250 relative overflow-hidden`;
                  const activeStyle = active
                    ? "text-cyan-400 bg-cyan-500/8"
                    : "text-slate-400 hover:text-white hover:bg-white/5";

                  const Inner = () => (
                    <>
                      {/* Active left bar */}
                      {active && (
                        <motion.span
                          layoutId="mobile-active-bar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-cyan-400"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {/* Index number */}
                      <span className={`text-[10px] font-black tabular-nums transition-colors duration-200 ${active ? "text-cyan-500" : "text-slate-600 group-hover:text-slate-500"}`}>
                        0{i + 1}
                      </span>
                      <span className="text-[15px] font-bold tracking-wide">{label}</span>
                      {/* Arrow on hover */}
                      <motion.svg
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        animate={active ? { opacity: 1, x: 0 } : {}}
                      >
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </>
                  );

                  return (
                    <motion.div
                      key={hash}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 300, damping: 28 }}
                    >
                      {hash.startsWith("#") ? (
                        <button onClick={(e) => handleNavClick(e, hash)} className={`${commonClass} ${activeStyle}`}>
                          <Inner />
                        </button>
                      ) : (
                        <NavLink to={`/${hash}`} onClick={() => setIsMenuOpen(false)} className={`${commonClass} ${activeStyle}`}>
                          <Inner />
                        </NavLink>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* ── Bottom CTA area ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ease: smoothEase }}
                className="relative z-10 px-6 pb-8 pt-4"
              >
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-5" />

                {localStorage.getItem("adminToken") && (
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-400 border border-cyan-500/25 bg-cyan-500/5 hover:bg-cyan-500/12 transition-all duration-200"
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                    Admin Dashboard
                  </NavLink>
                )}

                <motion.a
                  href="mailto:mail@creativepratik.com"
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.18em] text-white relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.35) 0%, rgba(30,64,175,0.55) 100%)",
                    border: "1px solid rgba(99,179,237,0.2)",
                    boxShadow: "0 0 20px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Shine sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="relative z-10">
                    <path d="M1.5 3.5l5 3.5 5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="1.5" y="2.5" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  <span className="relative z-10">Hire Me</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;