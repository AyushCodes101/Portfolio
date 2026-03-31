import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/60 backdrop-blur-xl">
      <motion.div
        className="h-0.5 origin-left bg-gradient-to-r from-brand-400 via-sky-400 to-brand-300"
        style={{ scaleX }}
      />
      <nav className="section-shell flex h-20 items-center justify-between">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="font-display text-xl font-bold tracking-wide text-slate-100"
        >
          Ayush<span className="text-brand-400">.dev</span>
        </NavLink>

        <button
          className="inline-flex rounded-lg border border-slate-700 p-2 text-slate-200 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-500 text-slate-950 shadow-[0_0_0_1px_rgba(36,220,247,0.45)]"
                      : "text-slate-200 hover:bg-slate-800/70 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-slate-800/80 bg-slate-950/95 md:hidden"
        >
          <ul className="section-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-brand-500 text-slate-950"
                        : "text-slate-200 hover:bg-slate-800/70 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </header>
  );
}
