import { Shield, Headphones, GraduationCap, Layers, Server } from "lucide-react";
import { motion } from "motion/react";

const ACCENT = "#66F2DF";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const servizi = [
  {
    icon: <Shield size={28} color={ACCENT} />,
    numero: "01",
    titolo: "Manutenzione Tecnica",
    descrizione:
      "Garanzia di stabilità e sicurezza continuativa. Aggiornamenti PHP e plug-in, monitoraggio funzionalità, verifica compatibilità tra componenti.",
    tag: ["Stabilità", "Sicurezza", "Monitoraggio"],
  },
  {
    icon: <Headphones size={28} color={ACCENT} />,
    numero: "02",
    titolo: "Supporto & Assistenza",
    descrizione:
      "Interventi su richiesta per correzioni tecniche e aggiornamenti contenuti. Risposta rapida e gestione delle problematiche operative quotidiane.",
    tag: ["Su Richiesta", "Correzioni", "Contenuti"],
  },
  {
    icon: <GraduationCap size={28} color={ACCENT} />,
    numero: "03",
    titolo: "Formazione Operativa",
    descrizione:
      "Sessioni di formazione per la gestione autonoma del sito, aggiornamento contenuti e utilizzo efficace degli strumenti interni.",
    tag: ["CMS", "Autonomia", "Training"],
  },
  {
    icon: <Layers size={28} color={ACCENT} />,
    numero: "04",
    titolo: "Evoluzione & Restyling",
    descrizione:
      "Aggiornamento grafico UX/UI, miglioramento delle performance, revisione della struttura per mantenere il sito moderno e competitivo.",
    tag: ["UX/UI", "Performance", "Design"],
  },
  {
    icon: <Server size={28} color={ACCENT} />,
    numero: "05",
    titolo: "Gestione Infrastruttura",
    descrizione:
      "Verifica e supporto completo su hosting, dominio e configurazioni tecniche. Ottimizzazione dell'infrastruttura per massima efficienza.",
    tag: ["Hosting", "Dominio", "Config"],
  },
];

export function ServiziSection() {
  return (
    <section
      id="servizi"
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
              Servizi Proposti
            </motion.span>
            <motion.h2
              variants={fadeUp}
              style={{
                color: "#FFFFFF",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              Tutto ciò di cui il tuo sito{" "}
              <span style={{ color: ACCENT }}>ha bisogno</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            style={{
              color: "rgb(219, 219, 219)",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            Una suite completa di servizi per ogni esigenza del tuo asset digitale.
          </motion.p>
        </motion.div>

        {/* 5 Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {servizi.map((s) => (
            <motion.div
              key={s.numero}
              variants={fadeUp}
              className="relative flex flex-col p-6 rounded-lg cursor-default"
              style={{
                border: "1px solid rgba(102, 242, 223, 0.15)",
                background: "rgba(102, 242, 223, 0.02)",
              }}
              whileHover={{
                borderColor: "rgba(102,242,223,0.5)",
                backgroundColor: "rgba(102,242,223,0.06)",
                y: -6,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                  opacity: 0,
                }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.25 }}
              />

              {/* Number */}
              <span
                className="text-xs mb-4 block"
                style={{ color: "#66F2DF", letterSpacing: "0.15em" }}
              >
                {s.numero}
              </span>

              {/* Icon */}
              <motion.div
                className="mb-5"
                whileHover={{ scale: 1.2, rotate: 8 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                {s.icon}
              </motion.div>

              {/* Title */}
              <h3
                className="mb-3"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {s.titolo}
              </h3>

              {/* Description */}
              <p
                className="flex-1"
                style={{
                  color: "rgb(219, 219, 219)",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.65,
                }}
              >
                {s.descrizione}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.tag.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      border: "1px solid rgba(102, 242, 223, 0.2)",
                      color: "#66F2DF",
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.7rem",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
