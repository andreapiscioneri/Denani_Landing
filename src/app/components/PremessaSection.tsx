import {
  Target,
  RefreshCw,
  ShieldAlert,
  Zap,
  AlertTriangle,
  Lock,
  TrendingDown,
  FileX,
} from "lucide-react";
import { motion } from "motion/react";

const ACCENT = "#66F2DF";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface BlockItem {
  icon: React.ReactNode;
  label: string;
}

interface Block {
  tag: string;
  title: string;
  items: BlockItem[];
}

const blocks: Block[] = [
  {
    tag: "01",
    title: "Obiettivi del Contratto",
    items: [
      { icon: <Target size={16} color={ACCENT} />, label: "Continuità operativa del sito" },
      { icon: <RefreshCw size={16} color={ACCENT} />, label: "Adeguamento tecnologico costante" },
      { icon: <Lock size={16} color={ACCENT} />, label: "Sicurezza dati e infrastrutture" },
      { icon: <Zap size={16} color={ACCENT} />, label: "Supporto evolutivo nel tempo" },
    ],
  },
  {
    tag: "02",
    title: "Perché Aggiornare Adesso",
    items: [
      { icon: <RefreshCw size={16} color={ACCENT} />, label: "Linguaggi di programmazione (PHP)" },
      { icon: <Zap size={16} color={ACCENT} />, label: "Aggiornamento plug-in e dipendenze" },
      { icon: <ShieldAlert size={16} color={ACCENT} />, label: "Normative GDPR e privacy" },
      { icon: <Lock size={16} color={ACCENT} />, label: "Sicurezza informatica aggiornata" },
    ],
  },
];

const risks = [
  { icon: <AlertTriangle size={20} color={ACCENT} />, label: "Malfunzionamenti e downtime", desc: "Interruzioni operative con impatto diretto sul business." },
  { icon: <ShieldAlert size={20} color={ACCENT} />, label: "Vulnerabilità di sicurezza", desc: "Attacchi informatici, data breach e compromissione del sistema." },
  { icon: <TrendingDown size={20} color={ACCENT} />, label: "Perdita di performance", desc: "Rallentamenti, indicizzazione ridotta, peggioramento UX." },
  { icon: <FileX size={20} color={ACCENT} />, label: "Non conformità normativa", desc: "Rischio sanzioni per mancato rispetto GDPR e normative vigenti." },
];

export function PremessaSection() {
  return (
    <section
      id="premessa"
      style={{ background: "#000000", fontFamily: "'Roboto', sans-serif" }}
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
          className="mb-16"
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
            Premessa & Contesto
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
            Perché la manutenzione è{" "}
            <span style={{ color: ACCENT }}>essenziale</span>
          </motion.h2>
        </motion.div>

        {/* Top 2 blocks */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {blocks.map((block) => (
            <motion.div
              key={block.tag}
              variants={fadeUp}
              className="rounded-lg p-8"
              style={{
                border: "1px solid rgba(102, 242, 223, 0.15)",
                background: "rgba(102, 242, 223, 0.03)",
              }}
              whileHover={{
                borderColor: "rgba(102,242,223,0.4)",
                backgroundColor: "rgba(102,242,223,0.06)",
                y: -4,
                transition: { duration: 0.25 },
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xs tracking-widest"
                  style={{ color: ACCENT, opacity: 0.6 }}
                >
                  {block.tag}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(102, 242, 223, 0.2)" }} />
              </div>
              <h3
                className="mb-5"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                {block.title}
              </h3>
              <ul className="space-y-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="shrink-0">{item.icon}</div>
                    <span
                      style={{
                        color: "rgb(219, 219, 219)",
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Risks block */}
        <motion.div
          className="rounded-lg p-8"
          style={{
            border: "1px solid rgba(102, 242, 223, 0.25)",
            background: "rgba(102, 242, 223, 0.04)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs tracking-widest"
              style={{ color: ACCENT, opacity: 0.6 }}
            >
              03
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(102, 242, 223, 0.2)" }} />
          </div>
          <h3
            className="mb-6"
            style={{
              color: "#FFFFFF",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            Rischi in Assenza di Manutenzione
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {risks.map((risk, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col gap-3 p-5 rounded"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(102, 242, 223, 0.1)",
                }}
                whileHover={{
                  borderColor: "rgba(102,242,223,0.35)",
                  backgroundColor: "rgba(102,242,223,0.04)",
                  y: -3,
                  transition: { duration: 0.2 },
                }}
              >
                <div>{risk.icon}</div>
                <p
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {risk.label}
                </p>
                <p
                  style={{
                    color: "rgb(219, 219, 219)",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                  }}
                >
                  {risk.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
