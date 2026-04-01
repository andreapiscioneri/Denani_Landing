import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../imports/STICKY-LOGO3.png";

const ACCENT = "#66F2DF";

const navLinks = [
  { label: "Premessa", href: "#premessa" },
  { label: "Servizi", href: "#servizi" },
  { label: "Pacchetti", href: "#pacchetti" },
  { label: "Moduli", href: "#moduli" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "'Roboto', sans-serif" }}
      animate={{
        background: scrolled ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        borderBottom: scrolled ? "1px solid rgba(102,242,223,0.08)" : "1px solid rgba(102,242,223,0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5"
          style={{ textDecoration: "none" }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.03 }}
        >
          <img
            src={logoImg}
            alt="DeNani S.r.l."
            style={{ height: "34px", width: "auto", objectFit: "contain" }}
          />
        </motion.a>

        {/* Desktop Links */}
        <motion.div
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.a
                key={link.href}
                href={link.href}
                style={{
                  color: isActive ? ACCENT : "rgb(219, 219, 219)",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  position: "relative",
                }}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                whileHover={{ color: "#FFFFFF", y: -1 }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: ACCENT,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
          <motion.a
            href="mailto:support@denani.it"
            className="px-5 py-2 rounded text-xs"
            style={{
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            whileHover={{
              backgroundColor: "rgba(102,242,223,0.12)",
              boxShadow: "0 0 16px rgba(102,242,223,0.2)",
              scale: 1.04,
            }}
            whileTap={{ scale: 0.97 }}
          >
            Contattaci
          </motion.a>
        </motion.div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden p-2"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMobileOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} color={ACCENT} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} color="rgba(255,255,255,0.8)" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{
              background: "rgba(0,0,0,0.96)",
              borderTop: "1px solid rgba(102,242,223,0.08)",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                style={{
                  color: "rgb(219, 219, 219)",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  paddingTop: "0.5rem",
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
                whileHover={{ color: "#fff", x: 4 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:support@denani.it"
              className="px-5 py-2.5 rounded text-center text-xs mt-2"
              style={{
                border: `1px solid ${ACCENT}`,
                color: ACCENT,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
                textDecoration: "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              onClick={() => setMobileOpen(false)}
              whileTap={{ scale: 0.97 }}
            >
              Contattaci
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
