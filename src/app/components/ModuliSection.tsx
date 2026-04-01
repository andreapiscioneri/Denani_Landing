import { Clock, BookOpen, Paintbrush, Globe, ShoppingCart, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const ACCENT = "#66F2DF";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const moduli = [
  {
    icon: <Clock size={24} color={ACCENT} />,
    label: "A",
    titolo: "Pacchetti Ore Assistenza",
    prezzo: "[EURO]",
    descrizione:
      "Ore aggiuntive dedicabili a interventi migliorativi, sviluppo di nuove funzionalità o risoluzione di problematiche specifiche.",
    punti: ["Interventi migliorativi", "Nuove funzionalità", "Sviluppo custom"],
  },
  {
    icon: <BookOpen size={24} color={ACCENT} />,
    label: "B",
    titolo: "Pacchetti Formazione",
    prezzo: "[EURO]",
    descrizione:
      "Sessioni formative strutturate per l'utilizzo del CMS e dei tool interni, per raggiungere piena autonomia operativa.",
    punti: ["Utilizzo CMS avanzato", "Autonomia operativa", "Sessioni personalizzate"],
  },
  {
    icon: <Paintbrush size={24} color={ACCENT} />,
    label: "C",
    titolo: "Restyling Sito",
    prezzo: "[EURO]",
    descrizione:
      "Aggiornamento completo dell'immagine grafica, revisione dell'esperienza utente e adeguamento agli standard UX/UI attuali.",
    punti: ["Aggiornamento grafico", "Revisione UX/UI", "Design moderno"],
  },
  {
    icon: <Globe size={24} color={ACCENT} />,
    label: "D",
    titolo: "Gestione Hosting & Dominio",
    prezzo: "[EURO]",
    descrizione:
      "Ottimizzazione dell'infrastruttura tecnica, gestione del dominio e supporto specializzato su configurazioni server.",
    punti: ["Ottimizzazione infrastruttura", "Gestione dominio", "Supporto tecnico"],
  },
];

function buildMailto(selected: string[]): string {
  const names = selected.map((lbl) => {
    const m = moduli.find((x) => x.label === lbl)!;
    return `${m.titolo} (Modulo ${m.label})`;
  });
  const subject = encodeURIComponent(
    selected.length === 1
      ? `Richiesta preventivo – ${names[0]}`
      : `Richiesta preventivo – Moduli ${selected.join(", ")}`
  );
  const body = encodeURIComponent(
    `Buongiorno,\n\nSono interessato ai seguenti moduli aggiuntivi:\n${names.map((n) => `  • ${n}`).join("\n")}\n\nResto in attesa di un vostro preventivo personalizzato.\n\nGrazie.`
  );
  return `mailto:support@denani.it?subject=${subject}&body=${body}`;
}

export function ModuliSection() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(label: string) {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  }

  return (
    <section
      id="moduli"
      style={{ background: "#050505", fontFamily: "'Roboto', sans-serif" }}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(102,242,223,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(102,242,223,0.7) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="text-xs tracking-widest uppercase mb-3 block"
              style={{ color: ACCENT }}
            >
              Moduli Aggiuntivi
            </motion.span>
            <motion.h2
              variants={fadeUp}
              style={{ color: "#FFFFFF", fontFamily: "'Roboto', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, lineHeight: 1.3 }}
            >
              Espandi il tuo{" "}
              <span style={{ color: ACCENT }}>piano di servizio</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            style={{ color: "rgb(219, 219, 219)", fontFamily: "'Roboto', sans-serif", fontSize: "0.9rem", lineHeight: 1.6 }}
          >
            Seleziona uno o più moduli e richiedi un preventivo unico.
          </motion.p>
        </motion.div>

        {/* Grid 4 cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {moduli.map((m) => {
            const isSelected = selected.includes(m.label);
            return (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="flex flex-col p-6 rounded-lg cursor-pointer"
                style={
                  isSelected
                    ? { border: `2px solid ${ACCENT}`, background: "rgba(102,242,223,0.08)", boxShadow: "0 0 24px rgba(102,242,223,0.15)" }
                    : { border: "1px solid rgba(102, 242, 223, 0.15)", background: "rgba(102, 242, 223, 0.02)" }
                }
                onClick={() => toggle(m.label)}
                whileHover={{
                  borderColor: isSelected ? ACCENT : "rgba(102,242,223,0.45)",
                  backgroundColor: isSelected ? "rgba(102,242,223,0.08)" : "rgba(102,242,223,0.06)",
                  y: -6,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  {m.icon}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          style={{ width: "18px", height: "18px", borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <Check size={11} color="#000" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span
                      className="text-xs rounded-full px-2.5 py-0.5"
                      style={{
                        border: isSelected ? "none" : "1px solid rgba(102,242,223,0.3)",
                        background: isSelected ? "rgba(102,242,223,0.2)" : "transparent",
                        color: "#66F2DF",
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      Modulo {m.label}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-3" style={{ color: "#FFFFFF", fontFamily: "'Roboto', sans-serif", fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.3 }}>
                  {m.titolo}
                </h3>

                {/* Price */}
                <div className="mb-4 pb-4" style={{ borderBottom: "1px solid rgba(102, 242, 223, 0.1)" }}>
                  <span style={{ color: "rgb(219, 219, 219)", fontFamily: "'Roboto', sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                    A partire da
                  </span>
                  <span style={{ color: ACCENT, fontFamily: "'Roboto', sans-serif", fontSize: "1.1rem", fontWeight: 700, marginTop: "2px", display: "block" }}>
                    {m.prezzo}
                  </span>
                </div>

                {/* Description */}
                <p className="flex-1 mb-5" style={{ color: "rgb(219, 219, 219)", fontFamily: "'Roboto', sans-serif", fontSize: "0.8rem", lineHeight: 1.65 }}>
                  {m.descrizione}
                </p>

                {/* Points */}
                <ul className="space-y-2 mb-6">
                  {m.punti.map((punto, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: ACCENT }} />
                      <span style={{ color: "rgba(102,242,223,0.8)", fontFamily: "'Roboto', sans-serif", fontSize: "0.78rem" }}>
                        {punto}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Card CTA */}
                <div
                  className="w-full py-2.5 rounded text-xs text-center"
                  style={{
                    border: isSelected ? "none" : "1px solid rgba(102,242,223,0.3)",
                    background: isSelected ? ACCENT : "transparent",
                    color: isSelected ? "#000" : ACCENT,
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: isSelected ? 700 : 500,
                    letterSpacing: "0.05em",
                  }}
                >
                  {isSelected ? "Selezionato ✓" : "Aggiungi al piano →"}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Floating bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 left-1/2 z-50"
            style={{ transform: "translateX(-50%)" }}
          >
            <div
              className="flex items-center gap-4 px-6 py-4 rounded-xl"
              style={{
                background: "#0a0a0a",
                border: `1px solid ${ACCENT}`,
                boxShadow: "0 8px 40px rgba(102,242,223,0.2)",
                minWidth: "min(90vw, 560px)",
              }}
            >
              <ShoppingCart size={18} color={ACCENT} style={{ flexShrink: 0 }} />

              <div style={{ flex: 1 }}>
                <p style={{ color: "#fff", fontFamily: "'Roboto', sans-serif", fontSize: "0.82rem", fontWeight: 600, marginBottom: "2px" }}>
                  {selected.length === 1 ? "1 modulo selezionato" : `${selected.length} moduli selezionati`}
                </p>
                <p style={{ color: "rgba(102,242,223,0.8)", fontFamily: "'Roboto', sans-serif", fontSize: "0.72rem" }}>
                  {selected.map((lbl) => `Modulo ${lbl}`).join(" + ")}
                </p>
              </div>

              <motion.a
                href={buildMailto(selected)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded"
                style={{ background: ACCENT, color: "#000", fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Richiedi preventivo
              </motion.a>

              <motion.button
                onClick={() => setSelected([])}
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} color="rgba(219,219,219,0.6)" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}