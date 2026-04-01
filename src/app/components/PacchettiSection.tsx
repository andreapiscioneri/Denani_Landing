import { Check, Star } from "lucide-react";
import { motion } from "motion/react";

const ACCENT = "#66F2DF";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

interface Pacchetto {
  id: string;
  label: string;
  titolo: string;
  sottotitolo: string;
  featured?: boolean;
  features: string[];
}

const pacchetti: Pacchetto[] = [
  {
    id: "base",
    label: "Base",
    titolo: "Pacchetto Base",
    sottotitolo: "Manutenzione Essenziale",
    features: [
      "Aggiornamenti tecnici periodici",
      "Monitoraggio funzionalità sito",
      "Verifica sicurezza e vulnerabilità",
      "Report mensile dello stato",
      "Aggiornamento PHP e plug-in",
    ],
  },
  {
    id: "plus",
    label: "Plus",
    titolo: "Pacchetto Plus",
    sottotitolo: "Manutenzione + Supporto",
    featured: true,
    features: [
      "Tutto il Pacchetto Base incluso",
      "Ore di assistenza incluse/mese",
      "Supporto prioritario dedicato",
      "Correzioni tecniche su richiesta",
      "Aggiornamento contenuti editoriali",
      "Interventi urgenti garantiti",
    ],
  },
  {
    id: "premium",
    label: "Premium",
    titolo: "Pacchetto Premium",
    sottotitolo: "Gestione Completa",
    features: [
      "Tutto il Pacchetto Plus incluso",
      "Pacchetto ore ampliato mensile",
      "Monitoraggio avanzato 24/7",
      "Consulenza evolutiva strategica",
      "Analisi performance e UX",
      "Pianificazione roadmap digitale",
      "Report avanzato e KPI tracking",
    ],
  },
];

function buildMailto(id: string): string {
  const p = pacchetti.find((x) => x.id === id)!;
  const subject = encodeURIComponent(`Richiesta preventivo – ${p.titolo}`);
  const body = encodeURIComponent(
    `Buongiorno,\n\nSono interessato al seguente pacchetto:\n  • ${p.titolo} – ${p.sottotitolo}\n\nResto in attesa di un vostro preventivo personalizzato.\n\nGrazie.`
  );
  return `mailto:support@denani.it?subject=${subject}&body=${body}`;
}

export function PacchettiSection() {
  return (
    <section
      id="pacchetti"
      style={{ background: "#000000", fontFamily: "'Roboto', sans-serif" }}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Tech grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(102,242,223,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(102,242,223,0.7) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ACCENT}, transparent 70%)` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUp}
            className="text-xs tracking-widest uppercase mb-3 block"
            style={{ color: ACCENT }}
          >
            Listino Pacchetti
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              color: "#FFFFFF",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "1rem",
            }}
          >
            Scegli il piano{" "}
            <span style={{ color: ACCENT }}>più adatto</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              color: "rgb(219, 219, 219)",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "0.95rem",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Tre livelli di servizio pensati per far crescere la tua azienda.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {pacchetti.map((p) => {
            return (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className="relative flex flex-col rounded-xl p-8"
                style={
                  p.featured
                    ? { border: `1px solid ${ACCENT}`, background: "rgba(102,242,223,0.06)" }
                    : { border: "1px solid rgba(102, 242, 223, 0.2)", background: "rgba(102, 242, 223, 0.02)" }
                }
                animate={
                  p.featured
                    ? { boxShadow: ["0 0 30px rgba(102,242,223,0.1)", "0 0 55px rgba(102,242,223,0.22)", "0 0 30px rgba(102,242,223,0.1)"] }
                    : {}
                }
                transition={p.featured ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                {/* Featured badge */}
                {p.featured && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs"
                    style={{ background: ACCENT, color: "#000000", fontFamily: "'Roboto', sans-serif", fontWeight: 700, letterSpacing: "0.05em", whiteSpace: "nowrap" }}
                  >
                    <Star size={10} fill="#000" />
                    Più Scelto
                  </div>
                )}

                {/* Label */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                    style={
                      p.featured
                        ? { background: "rgba(102,242,223,0.15)", color: ACCENT }
                        : { border: "1px solid rgba(102,242,223,0.25)", color: "#66F2DF" }
                    }
                  >
                    {p.label}
                  </span>
                </div>

                <h3 style={{ color: "#FFFFFF", fontFamily: "'Roboto', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  {p.titolo}
                </h3>
                <p style={{ color: ACCENT, fontFamily: "'Roboto', sans-serif", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  {p.sottotitolo}
                </p>

                {/* Price */}
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(102, 242, 223, 0.12)" }}>
                  <span style={{ color: p.featured ? ACCENT : "rgb(219, 219, 219)", fontFamily: "'Roboto', sans-serif", fontSize: "1rem", fontWeight: 500 }}>
                    Canone mensile
                  </span>
                  <div style={{ color: "#66F2DF", fontFamily: "'Roboto', sans-serif", fontSize: "1.6rem", fontWeight: 700, marginTop: "0.25rem" }}>
                    [Euro]{" "}
                    <span style={{ fontSize: "0.85rem", fontWeight: 400, opacity: 0.7 }}>/ mese</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={14} color={ACCENT} className="mt-0.5 shrink-0" />
                      <span style={{ color: "rgb(219, 219, 219)", fontFamily: "'Roboto', sans-serif", fontSize: "0.85rem", lineHeight: 1.5 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href={buildMailto(p.id)}
                  className="w-full py-3 rounded text-center block"
                  style={
                    p.featured
                      ? { background: ACCENT, color: "#000000", fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.03em", textDecoration: "none", cursor: "pointer" }
                      : { background: "transparent", color: ACCENT, fontFamily: "'Roboto', sans-serif", fontWeight: 600, fontSize: "0.9rem", border: `1px solid ${ACCENT}`, letterSpacing: "0.03em", textDecoration: "none", cursor: "pointer" }
                  }
                  whileHover={
                    p.featured
                      ? { scale: 1.02, boxShadow: "0 0 24px rgba(102,242,223,0.35)" }
                      : { backgroundColor: "rgba(102,242,223,0.14)", color: "#8AFFF0", borderColor: "#8AFFF0" }
                  }
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  Richiedi Preventivo →
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-center mt-10"
          style={{ color: "rgb(219, 219, 219)", fontFamily: "'Roboto', sans-serif", fontSize: "0.78rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          * I prezzi verranno definiti in base alle specifiche esigenze del progetto. Contattaci per un preventivo personalizzato.
        </motion.p>
      </div>
    </section>
  );
}