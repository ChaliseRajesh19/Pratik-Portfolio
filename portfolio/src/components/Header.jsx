import { useEffect, useMemo, useState, useRef } from "react";
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
        n.hash.slice(1),
      ),
    [],
  );

  const [activeHash, setActiveHash] = useState("#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // has user scrolled?

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialize
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

      // Clear highlight at the very top (Hero section)
      if (scrollY < 250) {
        setActiveHash("#home");
        return;
      }

      // Clear highlight at the very bottom (Footer section)
      if (scrollY + windowHeight >= documentHeight - 150) {
        setActiveHash("#footer");
        return;
      }

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      let currentActive = null;
      // Loop backwards to find the deepest section that has passed the scroll threshold
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollY + 300) {
          currentActive = `#${section.id}`;
          break;
        }
      }

      if (currentActive) {
        setActiveHash(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomeRoute, sectionIds]);

  useEffect(() => setIsMenuOpen(false), [location.pathname, location.hash]);

  const isActive = (hash) => {
    if (!hash.startsWith("#")) return location.pathname === `/${hash}`;
    return (
      isHomeRoute && (activeHash === hash || (!activeHash && hash === "#home"))
    );
  };

  // Modern easing curve for ultra-premium feel
  const smoothEase = [0.22, 1, 0.36, 1];

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl" : "backdrop-blur-none"
        }`}
        style={{
          background: scrolled ? "rgba(2, 6, 23, 0.92)" : "rgba(2, 6, 23, 0)",
          borderBottom: scrolled
            ? "1px solid rgba(59, 130, 246, 0.15)"
            : "1px solid rgba(59, 130, 246, 0)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.05)"
            : "none",
        }}
      >
        <motion.div
          animate={{ height: scrolled ? "4.5rem" : "6rem" }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="max-w-6xl mx-auto px-4 flex items-center gap-4 relative"
        >
          {/* ── Logo ── */}
          <motion.div
            className="min-w-fit flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (isHomeRoute) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.location.href = "/";
              }
            }}
          >
            <Logo />
          </motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="flex-1 hidden md:block">
            <ul className="flex items-center justify-center gap-2 text-[13px] font-semibold tracking-wide uppercase">
              {NAV_ITEMS.map(({ label, hash }) => {
                const active = isActive(hash);

                const NavContent = () => (
                  <>
                    <span className="relative z-10 transition-colors duration-300">
                      {label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] z-0"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                          mass: 0.8,
                        }}
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
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isHomeRoute) {
                            navigate("/", {
                              state: { scrollTo: hash.slice(1) },
                            });
                            return;
                          }
                          const el = document.getElementById(hash.slice(1));
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`relative block px-5 py-2.5 rounded-full transition-colors duration-300 bg-transparent border-none cursor-pointer ${
                          active
                            ? "text-blue-400"
                            : "text-slate-300 hover:text-slate-100"
                        }`}
                      >
                        <NavContent />
                      </button>
                    ) : (
                      <NavLink
                        to={`/${hash}`}
                        className={`relative block px-5 py-2.5 rounded-full transition-colors duration-300 ${
                          active
                            ? "text-blue-400"
                            : "text-slate-300 hover:text-slate-100"
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

          {/* ── Actions (desktop) ── */}
          <div className="hidden md:flex items-center ml-auto">
            <motion.a
              href="mailto:rajeshchalise19@gmail.com"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(37, 99, 235, 0.6)",
              }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group border border-blue-500/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(30, 64, 175, 0.3))",
                color: "#ffffff",
                boxShadow: "0 0 15px rgba(37, 99, 235, 0.2)",
              }}
            >
              <div className="absolute inset-0 w-full h-full bg-blue-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10">Hire Me</span>
            </motion.a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="ml-auto md:hidden flex items-center justify-center relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className="flex items-center justify-center w-10 h-10 relative z-[60] bg-transparent border-none outline-none"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              <HamburgerIcon open={isMenuOpen} />
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Mobile Sidebar Drawer ── */}
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
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              key="mobile-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm z-[100] border-l border-blue-900/40 flex flex-col pt-24 pb-12 px-8 overflow-y-auto"
              style={{
                background: "rgba(2, 6, 23, 0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "-20px 0 40px rgba(0,0,0,0.6)",
              }}
            >
              {/* Close Button inside Sidebar */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-5 right-4 flex items-center justify-center w-10 h-10 bg-transparent border-none outline-none transition-opacity hover:opacity-70"
              >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <span className="absolute w-6 h-[2px] bg-slate-200 rounded-full origin-center rotate-45" />
                  <span className="absolute w-6 h-[2px] bg-slate-200 rounded-full origin-center -rotate-45" />
                </div>
              </button>

              <div className="flex-1 flex flex-col gap-6 mt-4">
                {NAV_ITEMS.map(({ label, hash }, i) => {
                  const active = isActive(hash);
                  return (
                    <motion.div
                      key={hash}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {hash.startsWith("#") ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen(false);
                            if (!isHomeRoute) {
                              navigate("/", {
                                state: { scrollTo: hash.slice(1) },
                              });
                              return;
                            }
                            const el = document.getElementById(hash.slice(1));
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`group flex items-center w-full text-left transition-all duration-300 ${
                            active
                              ? "text-blue-400"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          <span
                            className={`text-2xl font-black uppercase tracking-widest transition-transform duration-300 ${active ? "translate-x-4" : "group-hover:translate-x-2"}`}
                          >
                            {label}
                          </span>
                        </button>
                      ) : (
                        <NavLink
                          to={`/${hash}`}
                          onClick={() => setIsMenuOpen(false)}
                          className={`group flex items-center w-full text-left transition-all duration-300 ${
                            active
                              ? "text-blue-400"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          <span
                            className={`text-2xl font-black uppercase tracking-widest transition-transform duration-300 ${active ? "translate-x-4" : "group-hover:translate-x-2"}`}
                          >
                            {label}
                          </span>
                        </NavLink>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto border-t border-blue-900/40 pt-8"
              >
                <a
                  href="mailto:pratikbhusal02@gmail.com"
                  className="flex justify-center w-full px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(30, 64, 175, 0.4))",
                  }}
                >
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
