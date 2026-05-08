import { Linkedin, Instagram, Facebook } from "lucide-react";
import { motion } from "motion/react";
import logoImg from "../../imports/STICKY-LOGO3.png";

const ACCENT = "#66F2DF";
const T = "rgb(219,219,219)";
const F = "'Roboto', sans-serif";

function TikTokIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.12 8.12 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialLinks = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/denanisrl/posts/?feedView=all", icon: <Linkedin size={16} /> },
  { label: "Instagram", href: "https://www.instagram.com/denanisrl/",                            icon: <Instagram size={16} /> },
  { label: "Facebook",  href: "https://www.facebook.com/DENANISRL",                              icon: <Facebook size={16} /> },
  { label: "TikTok",    href: "https://www.tiktok.com/@denanisrl",                               icon: <TikTokIcon size={16} /> },
];

const contacts = [
  { v: "support@denani.it", href: "mailto:support@denani.it" },
  { v: "denani@pec.it",     href: "mailto:denani@pec.it" },
  { v: "denani.odoo.com",   href: "https://denani.odoo.com" },
];

export function FooterSection() {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid rgba(102,242,223,0.1)", fontFamily: F }}>
      <style>{`
        .fs-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px clamp(20px,5vw,60px) 28px;
        }
        /* Desktop: single row */
        .fs-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .fs-bottom {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(102,242,223,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        /* Mobile: stack */
        @media (max-width: 680px) {
          .fs-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 24px;
          }
          .fs-contacts {
            align-items: center !important;
          }
          .fs-bottom {
            flex-direction: column;
            align-items: center;
            gap: 6px;
            text-align: center;
          }
        }
      `}</style>

      <motion.div
        className="fs-wrap"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="fs-row">

          {/* Logo */}
          <img src={logoImg} alt="DeNani S.r.l." style={{ height: "24px", width: "auto", objectFit: "contain", flexShrink: 0 }} />

          {/* Contatti */}
          <div className="fs-contacts" style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
            {contacts.map(c => (
              <a key={c.v} href={c.href} target="_blank" rel="noopener noreferrer"
                style={{ color: T, fontFamily: F, fontSize: "0.78rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = T)}>
                {c.v}
              </a>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: "8px" }}>
            {socialLinks.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid rgba(102,242,223,0.2)", color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                whileHover={{ borderColor: ACCENT, backgroundColor: "rgba(102,242,223,0.08)", scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="fs-bottom">
          <span style={{ color: T, fontFamily: F, fontSize: "0.72rem", opacity: 0.5 }}>© 2026 DeNani S.r.l. — Tutti i diritti riservati.</span>
          <span style={{ color: ACCENT, fontFamily: F, fontSize: "0.72rem", letterSpacing: "0.04em" }}>P.IVA IT04432260166</span>
        </div>
      </motion.div>
    </footer>
  );
}
