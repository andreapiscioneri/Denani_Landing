import { motion } from "motion/react";
import logoImg from "../../imports/STICKY-LOGO3.png";
import { ArrowLeft } from "lucide-react";

const A = "#66F2DF";
const F = "'Roboto', sans-serif";
const GRID = `linear-gradient(rgba(102,242,223,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(102,242,223,0.05) 1px,transparent 1px)`;

export function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      backgroundImage: GRID, backgroundSize: "80px 80px",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: F, textAlign: "center", padding: "40px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "400px", background: `radial-gradient(ellipse, ${A}, transparent 68%)`, opacity: 0.06, pointerEvents: "none" }} />

      {/* Logo */}
      <motion.a href="/" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ display: "block", marginBottom: "48px", textDecoration: "none" }}>
        <img src={logoImg} alt="DeNani" style={{ height: "28px", width: "auto", opacity: 0.7 }} />
      </motion.a>

      {/* 404 */}
      <motion.p
        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ color: A, fontFamily: F, fontSize: "clamp(5rem, 18vw, 10rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "8px" }}
      >
        404
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ color: "#fff", fontFamily: F, fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 700, marginBottom: "16px", letterSpacing: "-0.01em" }}
      >
        Pagina non trovata
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28 }}
        style={{ color: "rgb(219,219,219)", fontFamily: F, fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "420px", marginBottom: "40px" }}
      >
        L'indirizzo che hai cercato non esiste o è stato spostato.
      </motion.p>

      <motion.a
        href="/"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.36 }}
        whileHover={{ scale: 1.04, boxShadow: `0 0 28px rgba(102,242,223,0.25)` }}
        whileTap={{ scale: 0.97 }}
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: A, color: "#000", fontFamily: F, fontSize: "0.9rem", fontWeight: 700, padding: "13px 28px", borderRadius: "8px", textDecoration: "none" }}
      >
        <ArrowLeft size={16} /> Torna alla home
      </motion.a>
    </div>
  );
}
