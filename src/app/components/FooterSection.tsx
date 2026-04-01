import { Mail, MapPin, ArrowUpRight, Linkedin, Instagram, Facebook } from "lucide-react";
import { motion } from "motion/react";
import logoImg from "../../imports/STICKY-LOGO3.png";

const ACCENT = "#66F2DF";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function TikTokIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.12 8.12 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/denanisrl/posts/?feedView=all",
    icon: <Linkedin size={16} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/denanisrl/",
    icon: <Instagram size={16} />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/DENANISRL",
    icon: <Facebook size={16} />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@denanisrl",
    icon: <TikTokIcon size={16} />,
  },
];

export function FooterSection() {
  return (
    <footer
      style={{ background: "#000000", fontFamily: "'Roboto', sans-serif" }}
      className="relative overflow-hidden"
    >
      {/* Tech grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(102,242,223,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(102,242,223,0.7) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          zIndex: 0,
        }}
      />
      {/* CTA Band */}
      <div
        className="relative z-10 py-20 px-6"
        style={{ borderTop: "1px solid rgba(102, 242, 223, 0.1)" }}
      >
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span
            variants={fadeUp}
            className="text-xs tracking-widest uppercase mb-4 block"
            style={{ color: ACCENT }}
          >
            Inizia Ora
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              color: "#FFFFFF",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "1.5rem",
            }}
          >
            Pronto a dare valore al tuo{" "}
            <span style={{ color: ACCENT }}>asset digitale?</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              color: "rgb(219, 219, 219)",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "1rem",
              maxWidth: "500px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.6,
            }}
          >
            Contattaci per ricevere un preventivo personalizzato. Il tuo sito merita il meglio.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <motion.a
              href="/?brochure=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded"
              style={{
                border: "1px solid rgba(102,242,223,0.45)",
                color: ACCENT,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                letterSpacing: "0.03em",
              }}
              whileHover={{ scale: 1.04, borderColor: ACCENT, backgroundColor: "rgba(102,242,223,0.07)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Scarica Brochure
              <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="mailto:support@denani.it"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded"
              style={{
                background: ACCENT,
                color: "#000000",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                letterSpacing: "0.03em",
                display: "inline-flex",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(102,242,223,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Contattaci
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer bottom */}
      <div
        className="relative z-10 py-12 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Brand + Social */}
          <motion.div variants={fadeUp}>
            <div className="mb-5">
              <img
                src={logoImg}
                alt="DeNani S.r.l."
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                color: "rgb(219, 219, 219)",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Digitalizza<br />
              La tua immagine<br />
              La tua comunicazione<br />
              La tua produzione
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded"
                  style={{
                    border: "1px solid rgba(102,242,223,0.25)",
                    color: "#66F2DF",
                    textDecoration: "none",
                  }}
                  whileHover={{
                    borderColor: ACCENT,
                    color: ACCENT,
                    scale: 1.1,
                    backgroundColor: "rgba(102,242,223,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Servizi */}
          <motion.div variants={fadeUp}>
            <h4
              className="mb-4"
              style={{
                color: ACCENT,
                fontFamily: "'Roboto', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Servizi
            </h4>
            <ul className="space-y-2.5">
              {[
                "Manutenzione Tecnica",
                "Supporto & Assistenza",
                "Formazione Operativa",
                "Evoluzione & Restyling",
                "Gestione Infrastruttura",
              ].map((s) => (
                <li key={s}>
                  <span
                    style={{
                      color: "rgb(219, 219, 219)",
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.83rem",
                    }}
                  >
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sedi */}
          <motion.div variants={fadeUp}>
            <h4
              className="mb-4"
              style={{
                color: ACCENT,
                fontFamily: "'Roboto', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Sedi
            </h4>
            <div className="space-y-4">
              <div>
                <p
                  style={{
                    color: "#66F2DF",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Sede Legale
                </p>
                <div className="flex items-start gap-2">
                  <MapPin size={13} color={ACCENT} style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span
                    style={{
                      color: "rgb(219, 219, 219)",
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Via Camozzi 1/C – 24027 Nembro (BG)
                  </span>
                </div>
              </div>
              <div>
                <p
                  style={{
                    color: "#66F2DF",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Sede Operativa
                </p>
                <div className="flex items-start gap-2">
                  <MapPin size={13} color={ACCENT} style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span
                    style={{
                      color: "rgb(219, 219, 219)",
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Via Galimberti 6A – 24124 Bergamo
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Azienda + Contatti */}
          <motion.div variants={fadeUp}>
            <h4
              className="mb-4"
              style={{
                color: ACCENT,
                fontFamily: "'Roboto', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Info Azienda
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Mail size={13} color={ACCENT} style={{ flexShrink: 0 }} />
                <a
                  href="mailto:support@denani.it"
                  style={{
                    color: "rgb(219, 219, 219)",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                  }}
                >
                  support@denani.it
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#66F2DF", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}>PEC</span>
                <span style={{ color: "rgb(219, 219, 219)", fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem" }}>
                  denani@pec.it
                </span>
              </li>
            </ul>

            <div
              className="mt-5 pt-5 space-y-2"
              style={{ borderTop: "1px solid rgba(102,242,223,0.08)" }}
            >
              {[
                { label: "P.I/CF", value: "04432260166" },
                { label: "REA", value: "BG-462479" },
                { label: "Cap. Sociale", value: "€ 12.500,00 i.v." },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <span
                    style={{
                      color: "#66F2DF",
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: "rgb(219, 219, 219)",
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.78rem",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="max-w-6xl mx-auto mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            style={{
              color: "rgb(219, 219, 219)",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "0.75rem",
            }}
          >
            © 2026 DeNani S.r.l. — Tutti i diritti riservati.
          </span>
          <span
            style={{
              color: "#66F2DF",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
            }}
          >
            P.IVA IT04432260166
          </span>
        </div>
      </div>
    </footer>
  );
}
