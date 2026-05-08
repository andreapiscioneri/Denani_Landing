import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Loader } from "./Loader";
import { CustomCursor } from "./CustomCursor";
import logoImg from "../../imports/STICKY-LOGO3.png";
import {
  Users, Megaphone, Building2, ClipboardList, ChevronRight,
  Check, AlertCircle, Clock, RefreshCw, Wrench, Headphones, Server,
  Mail, MapPin, ArrowRight, X, Menu, Star, ShoppingCart,
  Clock as ClockIcon, BookOpen, Paintbrush, Globe,
  Target, Zap, ShieldAlert, Lock, AlertTriangle, TrendingDown, FileX,
  Shield, GraduationCap, Layers,
} from "lucide-react";

/* ─── PALETTE ───────────────────────────────────────────────────────────── */
const A   = "#66F2DF";
const BG  = "#000000";
const T   = "rgb(219,219,219)";
const W   = "#FFFFFF";
const F   = "'Roboto', sans-serif";
const CB  = "rgba(102,242,223,0.18)";
const CBG = "rgba(102,242,223,0.04)";
const GRID = `linear-gradient(rgba(102,242,223,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(102,242,223,0.05) 1px,transparent 1px)`;

/* ─── VARIANTS ──────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25,0.46,0.45,0.94] as [number,number,number,number] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

/* ─── PREZZI ────────────────────────────────────────────────────────────── */
const prezziNuovi  = { base: "€ 79", plus: "€ 149", premium: "€ 249" };
const prezziEssere = { base: "€ 69", plus: "€ 129", premium: "€ 219" }; // -10% fedeltà

/* ─── DATI PACCHETTI ────────────────────────────────────────────────────── */
function getPacchetti(tipo: "nuovi" | "essere") {
  const p = tipo === "essere" ? prezziEssere : prezziNuovi;
  return [
    {
      id: "base", label: "Base", titolo: "Pacchetto Base", sub: "Manutenzione Essenziale",
      featured: false, prezzo: p.base,
      features: ["Aggiornamenti tecnici periodici","Monitoraggio funzionalità sito","Verifica sicurezza e vulnerabilità","Report mensile dello stato","Aggiornamento PHP e plug-in"],
    },
    {
      id: "plus", label: "Plus", titolo: "Pacchetto Plus", sub: "Manutenzione + Supporto",
      featured: true, prezzo: p.plus,
      features: ["Tutto il Pacchetto Base incluso","Ore di assistenza incluse/mese","Supporto prioritario dedicato","Correzioni tecniche su richiesta","Aggiornamento contenuti editoriali","Interventi urgenti garantiti"],
    },
    {
      id: "premium", label: "Premium", titolo: "Pacchetto Premium", sub: "Gestione Completa",
      featured: false, prezzo: p.premium,
      features: ["Tutto il Pacchetto Plus incluso","Pacchetto ore ampliato mensile","Monitoraggio avanzato 24/7","Consulenza evolutiva strategica","Analisi performance e UX","Pianificazione roadmap digitale","Report avanzato e KPI tracking"],
    },
  ];
}

/* ─── DATI MODULI ───────────────────────────────────────────────────────── */
const moduli = [
  { icon: <ClockIcon size={24} color={A} />,  label: "A", titolo: "Pacchetti Ore Assistenza", prezzo: "€ 39", unita: "/ ora",     desc: "Ore aggiuntive per interventi migliorativi, nuove funzionalità o risoluzione di problematiche specifiche.",   punti: ["Interventi migliorativi","Nuove funzionalità","Sviluppo custom"] },
  { icon: <BookOpen size={24} color={A} />,   label: "B", titolo: "Pacchetti Formazione",     prezzo: "€ 89", unita: "/ sessione", desc: "Sessioni formative per l'utilizzo del CMS e dei tool interni, per raggiungere piena autonomia operativa.",       punti: ["Utilizzo CMS avanzato","Autonomia operativa","Sessioni personalizzate"] },
  { icon: <Paintbrush size={24} color={A} />, label: "C", titolo: "Restyling Sito",            prezzo: "€ 490",unita: "una tantum", desc: "Aggiornamento completo dell'immagine grafica, revisione UX e adeguamento agli standard attuali.",               punti: ["Aggiornamento grafico","Revisione UX/UI","Design moderno"] },
  { icon: <Globe size={24} color={A} />,      label: "D", titolo: "Hosting & Dominio",         prezzo: "€ 29", unita: "/ mese",    desc: "Ottimizzazione dell'infrastruttura tecnica, gestione dominio e supporto su configurazioni server.",               punti: ["Ottimizzazione infrastruttura","Gestione dominio","Supporto tecnico"] },
];

/* ─── DATI INIZIATIVE ───────────────────────────────────────────────────── */
const iniziative = [
  {
    icon: <Megaphone size={32} color={A} />, num: "01", titolo: "Campagne di Comunicazione", featured: false,
    desc: "Abbiamo avviato nuove campagne digitali e offline per rafforzare la nostra presenza sul mercato e presentare i nostri servizi a un pubblico sempre più ampio.",
    punti: ["Comunicazione multi-canale","Brand awareness digitale","Contenuti editoriali mirati","Presenza sui social media"],
  },
  {
    icon: <Users size={32} color={A} />, num: "02", titolo: "Nuove Assunzioni", featured: true,
    desc: "Il nostro team è in crescita. Stiamo selezionando nuovi professionisti specializzati per ampliare le competenze interne e offrire servizi ancora più completi.",
    punti: ["Developer front-end & back-end","Specialisti SEO & Performance","Consulenti UX/UI","Gestori di account dedicati"],
  },
  {
    icon: <Building2 size={32} color={A} />, num: "03", titolo: "Ambienti di Lavoro", featured: false,
    desc: "Abbiamo rinnovato i nostri spazi per favorire creatività, collaborazione e benessere del team. Un ambiente moderno a supporto dell'innovazione quotidiana.",
    punti: ["Sede operativa rinnovata","Spazi collaborativi open-space","Sala riunioni tecnologica","Area benessere per il team"],
  },
];

/* ─── DATI QUESTIONARIO ─────────────────────────────────────────────────── */
const domandeNuovi = [
  { n:"01", q:"Qual è il principale obiettivo del vostro sito web?",          opts:["Vetrina aziendale","E-commerce","Blog / Contenuti","Gestione clienti"] },
  { n:"02", q:"Da quanto tempo il sito è online senza aggiornamenti?",        opts:["Meno di 6 mesi","6–12 mesi","1–2 anni","Più di 2 anni"] },
  { n:"03", q:"Avete mai riscontrato problemi tecnici o downtime?",            opts:["Mai","Raramente","Occasionalmente","Frequentemente"] },
  { n:"04", q:"Chi gestisce attualmente il vostro sito?",                      opts:["Nessuno","Personale interno","Agenzia esterna","Freelance"] },
  { n:"05", q:"Quale servizio ritenete più urgente?",                          opts:["Sicurezza","Performance","Contenuti","Supporto tecnico"] },
  { n:"06", q:"Siete interessati a un preventivo personalizzato?",             opts:["Sì, contattarmi","Voglio saperne di più","Non ancora","Già informato"] },
];
const domandeEssere = [
  { n:"01", q:"Quanto siete soddisfatti dei servizi ricevuti fino ad oggi?",   opts:["Molto soddisfatti","Soddisfatti","Abbastanza","Da migliorare"] },
  { n:"02", q:"Quale servizio vorreste potenziare nel rinnovo?",               opts:["Manutenzione tecnica","Supporto & assistenza","Hosting","Restyling"] },
  { n:"03", q:"Con quale frequenza avete richiesto assistenza nell'ultimo anno?", opts:["Raramente","Qualche volta","Spesso","Molto spesso"] },
  { n:"04", q:"Siete interessati a espandere i servizi con nuovi moduli?",     opts:["Sì, certamente","Da valutare","No, rinnovo standard","Voglio info"] },
  { n:"05", q:"Preferenza per la durata del nuovo contratto?",                 opts:["Mensile","Semestrale","Annuale","Da concordare"] },
  { n:"06", q:"Volete fissare una call con il vostro referente?",              opts:["Sì, urgente","Sì, quando disponibile","Preferisco email","Non adesso"] },
];

/* ─── DATI SCADENZA ─────────────────────────────────────────────────────── */
const serviziScadenza = [
  { icon: <Server size={22} color={A} />,    titolo: "Hosting",                        desc: "Gestione e rinnovo infrastruttura hosting." },
  { icon: <Wrench size={22} color={A} />,    titolo: "Manutenzione Siti",              desc: "Aggiornamenti tecnici e monitoraggio." },
  { icon: <Headphones size={22} color={A}/>, titolo: "Assistenza Tecnica",             desc: "Supporto su richiesta e interventi correttivi." },
  { icon: <RefreshCw size={22} color={A} />, titolo: "Restyling",                      desc: "Revisione grafica e aggiornamento UX/UI." },
  { icon: <Clock size={22} color={A} />,     titolo: "Supporto Operativo Continuativo", desc: "Gestione continuativa delle attività digitali." },
];

/* ─── SHARED UI ─────────────────────────────────────────────────────────── */
function SectionHeader({ label, title, sub }: { label: string; title: React.ReactNode; sub?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
      style={{ textAlign: "center", marginBottom: "48px" }}>
      <span style={{ color: A, fontFamily: F, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>{label}</span>
      <h2 style={{ color: W, fontFamily: F, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: sub ? "14px" : 0 }}>{title}</h2>
      {sub && <p style={{ color: T, fontFamily: F, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>{sub}</p>}
    </motion.div>
  );
}

function AccentDivider() {
  return <div style={{ width: "40px", height: "2px", background: `linear-gradient(90deg,${A},transparent)`, margin: "0 auto 48px" }} />;
}

/* ─── NAV ───────────────────────────────────────────────────────────────── */
function LandingNav({ links, tipo }: { links: { label: string; href: string }[]; tipo: "nuovi" | "essere" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(0,0,0,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid rgba(102,242,223,0.1)` : "none", transition: "all 0.3s", padding: "0 clamp(20px,5vw,60px)", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={logoImg} alt="DeNani" style={{ height: "22px", width: "auto" }} />
          <span style={{ background: "rgba(102,242,223,0.1)", border: `1px solid rgba(102,242,223,0.25)`, color: A, fontFamily: F, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px" }}>
            {tipo === "essere" ? "Clienti in essere" : "Nuovi clienti"}
          </span>
        </div>

        {/* Desktop */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="landing-desk">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color: T, fontFamily: F, fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = A)}
              onMouseLeave={e => (e.currentTarget.style.color = T)}>
              {l.label}
            </a>
          ))}
          <a href="mailto:support@denani.it" style={{ background: A, color: "#000", fontFamily: F, fontSize: "0.78rem", fontWeight: 700, padding: "8px 18px", borderRadius: "6px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            Contattaci <ArrowRight size={13} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)} className="landing-mob" style={{ background: "none", border: "none", color: A, cursor: "pointer", display: "none" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99, background: "rgba(0,0,0,0.96)", borderBottom: `1px solid rgba(102,242,223,0.1)`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ color: T, fontFamily: F, fontSize: "0.9rem", textDecoration: "none", padding: "8px 0", borderBottom: "1px solid rgba(102,242,223,0.06)" }}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .landing-desk { display: none !important; }
          .landing-mob  { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────────── */
function Hero({ tipo }: { tipo: "nuovi" | "essere" }) {
  const isEssere = tipo === "essere";
  return (
    <div style={{ minHeight: "100vh", background: BG, backgroundImage: GRID, backgroundSize: "72px 72px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px clamp(20px,6vw,80px) 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "500px", background: "radial-gradient(circle, rgba(102,242,223,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: `1px solid ${A}`, borderRadius: "999px", padding: "6px 18px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: A, display: "inline-block" }} />
          <span style={{ color: A, fontFamily: F, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {isEssere ? "Area Clienti — Comunicazione Riservata" : "Digital Agency · Nuove Iniziative 2026"}
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
          style={{ color: W, fontFamily: F, fontSize: "clamp(2.4rem,6vw,4rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "24px" }}>
          {isEssere
            ? <><span style={{ color: A }}>Sei già con noi.</span><br />Rinnova e continua a crescere.</>
            : <><span style={{ color: A }}>Innovazione, persone</span><br />e nuovi orizzonti digitali.</>}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
          style={{ color: T, fontFamily: F, fontSize: "clamp(0.9rem,1.8vw,1.05rem)", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto 40px" }}>
          {isEssere
            ? "Grazie per la fiducia che riponi in noi. Scopri le nuove iniziative, rinnova i tuoi servizi con condizioni di favore riservate ai clienti attivi e garantisci la continuità digitale della tua azienda."
            : "Siamo in crescita e vogliamo condividere le nostre nuove iniziative, i team che si stanno formando e i servizi pensati per accompagnare il tuo business nel futuro digitale."}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={isEssere ? "#scadenza" : "#iniziative"}
            style={{ background: A, color: "#000", fontFamily: F, fontSize: "0.88rem", fontWeight: 700, padding: "13px 30px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {isEssere ? "Rinnova i servizi" : "Scopri le iniziative"} <ArrowRight size={15} />
          </a>
          <a href="#pacchetti"
            style={{ background: "transparent", color: A, border: `1px solid rgba(102,242,223,0.4)`, fontFamily: F, fontSize: "0.88rem", fontWeight: 600, padding: "13px 30px", borderRadius: "8px", textDecoration: "none" }}>
            {isEssere ? "Vedi prezzi fedeltà" : "Vedi i pacchetti"}
          </a>
        </motion.div>

        {isEssere && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ marginTop: "32px", display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(102,242,223,0.06)", border: `1px solid rgba(102,242,223,0.2)`, borderRadius: "8px", padding: "10px 20px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#66F2DF", flexShrink: 0 }} />
            <span style={{ color: "rgb(219,219,219)", fontFamily: F, fontSize: "0.78rem" }}>
              Prezzi riservati clienti attivi · Sconto fedeltà <strong>10%</strong> già applicato
            </span>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          style={{ display: "flex", gap: "clamp(24px,5vw,64px)", justifyContent: "center", marginTop: "56px", paddingTop: "40px", borderTop: `1px solid rgba(102,242,223,0.1)` }}>
          {(isEssere
            ? [{v:"5+",l:"Anni di partnership"},{v:"-10%",l:"Sconto fedeltà"},{v:"24/7",l:"Monitoraggio attivo"}]
            : [{v:"2026",l:"Nuove iniziative"},{v:"5+",l:"Anni di esperienza"},{v:"100%",l:"Focus sul cliente"}]
          ).map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <p style={{ color: A, fontFamily: F, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, lineHeight: 1, marginBottom: "6px" }}>{s.v}</p>
              <p style={{ color: T, fontFamily: F, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── SEZIONE INIZIATIVE ────────────────────────────────────────────────── */
function SezioneIniziative({ tipo }: { tipo: "nuovi" | "essere" }) {
  const isEssere = tipo === "essere";
  return (
    <section id="iniziative" style={{ padding: "96px clamp(20px,6vw,80px)", background: "#030303", backgroundImage: GRID, backgroundSize: "72px 72px" }}>
      <SectionHeader
        label="Novità & Comunicazione"
        title={<>Le nostre nuove <span style={{ color: A }}>iniziative aziendali</span></>}
        sub={isEssere
          ? "Continuiamo a crescere anche grazie a te. Ecco le novità che porteremo avanti insieme nel 2026."
          : "Cresciamo, innoviamo e investiamo nelle persone. Scopri cosa sta cambiando in DeNani."}
      />
      <AccentDivider />

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
        {iniziative.map(item => (
          <motion.div key={item.num} variants={fadeUp}
            style={{ border: item.featured ? `1.5px solid ${A}` : `1px solid ${CB}`, background: CBG, borderRadius: "12px", padding: "32px 28px", position: "relative", display: "flex", flexDirection: "column", gap: "16px" }}>
            {item.featured && (
              <span style={{ position: "absolute", top: "-13px", left: "28px", background: "#000", border: `1px solid ${A}`, color: A, fontFamily: F, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 12px", borderRadius: "999px" }}>
                In evidenza
              </span>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "rgba(102,242,223,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.icon}
              </div>
              <span style={{ color: A, fontFamily: F, fontSize: "0.6rem", opacity: 0.6, letterSpacing: "0.12em" }}>{item.num}</span>
            </div>
            <h3 style={{ color: W, fontFamily: F, fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3 }}>{item.titolo}</h3>
            <p style={{ color: T, fontFamily: F, fontSize: "0.85rem", lineHeight: 1.75, flex: 1 }}>{item.desc}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {item.punti.map((p, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ChevronRight size={13} color={A} style={{ flexShrink: 0 }} />
                  <span style={{ color: T, fontFamily: F, fontSize: "0.8rem" }}>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        style={{ maxWidth: "1100px", margin: "48px auto 0", border: `1px solid rgba(102,242,223,0.15)`, background: "rgba(102,242,223,0.02)", borderRadius: "10px", padding: "20px 32px", display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center" }}>
        {[
          { label: "Sede Legale",    addr: "Via Camozzi 1/C – 24027 Nembro (BG)" },
          { label: "Sede Operativa", addr: "Via Galimberti 6A – 24124 Bergamo" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MapPin size={15} color={A} />
            <div>
              <span style={{ color: A, fontFamily: F, fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>{s.label}</span>
              <span style={{ color: T, fontFamily: F, fontSize: "0.82rem" }}>{s.addr}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── SEZIONE PACCHETTI ─────────────────────────────────────────────────── */
function SezionePacchetti({ tipo }: { tipo: "nuovi" | "essere" }) {
  const isEssere = tipo === "essere";
  const pacchetti = getPacchetti(tipo);

  function buildMailto(id: string) {
    const p = pacchetti.find(x => x.id === id)!;
    const sub = encodeURIComponent(`Richiesta preventivo – ${p.titolo}`);
    const body = encodeURIComponent(`Buongiorno,\n\nSono interessato al seguente pacchetto:\n  • ${p.titolo} – ${p.sub}\n\nResto in attesa di un vostro preventivo.\n\nGrazie.`);
    return `mailto:support@denani.it?subject=${sub}&body=${body}`;
  }

  return (
    <section id="pacchetti" style={{ padding: "96px clamp(20px,6vw,80px)", background: BG, backgroundImage: GRID, backgroundSize: "72px 72px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: `radial-gradient(ellipse, ${A}, transparent 70%)`, opacity: 0.04, pointerEvents: "none" }} />

      <SectionHeader
        label="Listino Pacchetti"
        title={<>Scegli il piano <span style={{ color: A }}>più adatto</span></>}
        sub={isEssere
          ? "Prezzi riservati ai clienti attivi. Sconto fedeltà 10% già applicato su tutti i piani."
          : "Tre livelli di servizio pensati per far crescere la tua azienda digitale."}
      />
      {isEssere && (
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ maxWidth: "700px", margin: "-24px auto 40px", border: `1px solid rgba(102,242,223,0.2)`, background: "rgba(102,242,223,0.04)", borderRadius: "8px", padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#66F2DF", flexShrink: 0 }} />
          <span style={{ color: "rgb(219,219,219)", fontFamily: F, fontSize: "0.8rem" }}>
            Prezzi riservati clienti in essere · Listino standard: {prezziNuovi.base} / {prezziNuovi.plus} / {prezziNuovi.premium} al mese
          </span>
        </motion.div>
      )}
      <AccentDivider />

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        {pacchetti.map(p => (
          <motion.div key={p.id} variants={fadeUp}
            style={{ border: p.featured ? `1.5px solid ${A}` : `1px solid rgba(102,242,223,0.2)`, background: p.featured ? "rgba(102,242,223,0.06)" : "rgba(102,242,223,0.02)", borderRadius: "12px", padding: "32px", display: "flex", flexDirection: "column", position: "relative" }}
            animate={p.featured ? { boxShadow: ["0 0 30px rgba(102,242,223,0.1)","0 0 55px rgba(102,242,223,0.2)","0 0 30px rgba(102,242,223,0.1)"] } : {}}
            transition={p.featured ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}>

            {p.featured && (
              <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: A, color: "#000", fontFamily: F, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", padding: "3px 14px", borderRadius: "999px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "5px" }}>
                <Star size={10} fill="#000" /> Più Scelto
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <span style={{ background: p.featured ? "rgba(102,242,223,0.15)" : "transparent", border: p.featured ? "none" : `1px solid rgba(102,242,223,0.25)`, color: A, fontFamily: F, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 12px", borderRadius: "999px" }}>
                {p.label}
              </span>
            </div>

            <h3 style={{ color: W, fontFamily: F, fontSize: "1.2rem", fontWeight: 700, marginBottom: "4px" }}>{p.titolo}</h3>
            <p style={{ color: A, fontFamily: F, fontSize: "0.85rem", marginBottom: "20px" }}>{p.sub}</p>

            <div style={{ borderBottom: `1px solid rgba(102,242,223,0.12)`, paddingBottom: "20px", marginBottom: "20px" }}>
              <span style={{ color: T, fontFamily: F, fontSize: "0.8rem", display: "block", marginBottom: "4px" }}>Canone mensile</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ color: A, fontFamily: F, fontSize: "2rem", fontWeight: 700 }}>{p.prezzo}</span>
                <span style={{ color: T, fontFamily: F, fontSize: "0.8rem", opacity: 0.7 }}>/ mese</span>
              </div>
              {isEssere && (
                <span style={{ color: T, fontFamily: F, fontSize: "0.7rem", opacity: 0.5, textDecoration: "line-through", marginTop: "2px", display: "block" }}>
                  Listino: {prezziNuovi[p.id as keyof typeof prezziNuovi]} / mese
                </span>
              )}
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              {p.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Check size={13} color={A} style={{ marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ color: T, fontFamily: F, fontSize: "0.83rem", lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <motion.a href={buildMailto(p.id)}
              style={{ display: "block", width: "100%", padding: "12px", borderRadius: "8px", textAlign: "center", fontFamily: F, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", cursor: "pointer", ...(p.featured ? { background: A, color: "#000" } : { background: "transparent", color: A, border: `1px solid ${A}` }) }}
              whileHover={p.featured ? { scale: 1.02, boxShadow: "0 0 24px rgba(102,242,223,0.35)" } : { backgroundColor: "rgba(102,242,223,0.1)" }}
              whileTap={{ scale: 0.98 }}>
              Richiedi Preventivo →
            </motion.a>
          </motion.div>
        ))}
      </motion.div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ color: T, fontFamily: F, fontSize: "0.78rem", textAlign: "center", marginTop: "32px", opacity: 0.6 }}>
        * I prezzi sono indicativi e potranno variare in base alle specifiche esigenze del progetto.
      </motion.p>
    </section>
  );
}

/* ─── SEZIONE MODULI ────────────────────────────────────────────────────── */
function SezioneModuli({ tipo: _tipo }: { tipo: "nuovi" | "essere" }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(label: string) {
    setSelected(prev => prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label]);
  }

  function buildMailto() {
    const names = selected.map(lbl => { const m = moduli.find(x => x.label === lbl)!; return `${m.titolo} (Modulo ${m.label})`; });
    const sub = encodeURIComponent(selected.length === 1 ? `Richiesta preventivo – ${names[0]}` : `Richiesta preventivo – Moduli ${selected.join(", ")}`);
    const body = encodeURIComponent(`Buongiorno,\n\nSono interessato ai seguenti moduli:\n${names.map(n => `  • ${n}`).join("\n")}\n\nGrazie.`);
    return `mailto:support@denani.it?subject=${sub}&body=${body}`;
  }

  return (
    <section id="moduli" style={{ padding: "96px clamp(20px,6vw,80px)", background: "#030303", backgroundImage: GRID, backgroundSize: "72px 72px" }}>
      <SectionHeader
        label="Moduli Aggiuntivi"
        title={<>Espandi il tuo <span style={{ color: A }}>piano di servizio</span></>}
        sub="Seleziona uno o più moduli aggiuntivi e richiedi un preventivo combinato."
      />
      <AccentDivider />

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {moduli.map(m => {
          const isSel = selected.includes(m.label);
          return (
            <motion.div key={m.label} variants={fadeUp} onClick={() => toggle(m.label)}
              style={{ border: isSel ? `2px solid ${A}` : `1px solid rgba(102,242,223,0.15)`, background: isSel ? "rgba(102,242,223,0.08)" : "rgba(102,242,223,0.02)", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", cursor: "pointer", ...(isSel ? { boxShadow: "0 0 24px rgba(102,242,223,0.15)" } : {}) }}
              whileHover={{ borderColor: "rgba(102,242,223,0.45)", backgroundColor: "rgba(102,242,223,0.06)", y: -6 }}
              transition={{ duration: 0.2 }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                {m.icon}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <AnimatePresence>
                    {isSel && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        style={{ width: "18px", height: "18px", borderRadius: "50%", background: A, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={11} color="#000" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span style={{ background: isSel ? "rgba(102,242,223,0.2)" : "transparent", border: isSel ? "none" : `1px solid rgba(102,242,223,0.3)`, color: A, fontFamily: F, fontSize: "0.6rem", padding: "2px 8px", borderRadius: "999px" }}>
                    Modulo {m.label}
                  </span>
                </div>
              </div>

              <h3 style={{ color: W, fontFamily: F, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "12px" }}>{m.titolo}</h3>

              <div style={{ borderBottom: `1px solid rgba(102,242,223,0.1)`, paddingBottom: "12px", marginBottom: "12px" }}>
                <span style={{ color: T, fontFamily: F, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>A partire da</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "2px" }}>
                  <span style={{ color: A, fontFamily: F, fontSize: "1.1rem", fontWeight: 700 }}>{m.prezzo}</span>
                  <span style={{ color: T, fontFamily: F, fontSize: "0.7rem", opacity: 0.7 }}>{m.unita}</span>
                </div>
              </div>

              <p style={{ color: T, fontFamily: F, fontSize: "0.78rem", lineHeight: 1.65, flex: 1, marginBottom: "12px" }}>{m.desc}</p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "5px", marginBottom: "16px" }}>
                {m.punti.map((punto, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: A, flexShrink: 0 }} />
                    <span style={{ color: "rgba(102,242,223,0.8)", fontFamily: F, fontSize: "0.75rem" }}>{punto}</span>
                  </li>
                ))}
              </ul>

              <div style={{ padding: "8px", borderRadius: "6px", textAlign: "center", fontFamily: F, fontSize: "0.75rem", border: isSel ? "none" : `1px solid rgba(102,242,223,0.3)`, background: isSel ? A : "transparent", color: isSel ? "#000" : A, fontWeight: isSel ? 700 : 500 }}>
                {isSel ? "Selezionato ✓" : "Aggiungi al piano →"}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floating bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 50 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 24px", borderRadius: "12px", background: "#0a0a0a", border: `1px solid ${A}`, boxShadow: "0 8px 40px rgba(102,242,223,0.2)", minWidth: "min(90vw,520px)" }}>
              <ShoppingCart size={18} color={A} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ color: W, fontFamily: F, fontSize: "0.82rem", fontWeight: 600, marginBottom: "2px" }}>
                  {selected.length === 1 ? "1 modulo selezionato" : `${selected.length} moduli selezionati`}
                </p>
                <p style={{ color: "rgba(102,242,223,0.8)", fontFamily: F, fontSize: "0.72rem" }}>
                  {selected.map(lbl => `Modulo ${lbl}`).join(" + ")}
                </p>
              </div>
              <motion.a href={buildMailto()} style={{ background: A, color: "#000", fontFamily: F, fontWeight: 700, fontSize: "0.85rem", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Richiedi preventivo
              </motion.a>
              <motion.button onClick={() => setSelected([])} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                whileHover={{ scale: 1.15 }}>
                <X size={16} color="rgba(219,219,219,0.6)" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── SEZIONE QUESTIONARIO ──────────────────────────────────────────────── */
function SezioneQuestionario({ tipo }: { tipo: "nuovi" | "essere" }) {
  const isEssere = tipo === "essere";
  const domande = isEssere ? domandeEssere : domandeNuovi;
  const [risposte, setRisposte] = useState<Record<string, string>>({});
  const [inviato, setInviato] = useState(false);

  return (
    <section id="questionario" style={{ padding: "96px clamp(20px,6vw,80px)", background: BG, backgroundImage: GRID, backgroundSize: "72px 72px" }}>
      <SectionHeader
        label="Test Conoscitivo"
        title={isEssere
          ? <>Aggiorna il tuo <span style={{ color: A }}>profilo cliente</span></>
          : <>Raccontaci il tuo <span style={{ color: A }}>progetto digitale</span></>}
        sub={isEssere
          ? "Aiutaci a capire come migliorare il servizio e cosa vorresti nel tuo prossimo contratto."
          : "Compila il questionario: ti contatteremo con una proposta personalizzata entro 24 ore."}
      />
      <AccentDivider />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ border: `1px solid rgba(102,242,223,0.2)`, background: "rgba(102,242,223,0.04)", borderRadius: "10px", padding: "16px 24px", marginBottom: "40px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <ClipboardList size={20} color={A} style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ color: T, fontFamily: F, fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
            {isEssere
              ? "Seleziona una risposta per ogni domanda. Il tuo referente DeNani ti ricontatterà per definire insieme il nuovo contratto."
              : <>Seleziona una risposta per ogni domanda, poi clicca <strong style={{ color: W }}>"Invia questionario"</strong>. Risponderemo entro 24 ore.</>}
          </p>
        </motion.div>

        {inviato ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ border: `1.5px solid ${A}`, background: CBG, borderRadius: "12px", padding: "56px 32px", textAlign: "center" }}>
            <Check size={48} color={A} style={{ margin: "0 auto 16px" }} />
            <h3 style={{ color: W, fontFamily: F, fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>
              {isEssere ? "Grazie per il feedback!" : "Questionario inviato!"}
            </h3>
            <p style={{ color: T, fontFamily: F, fontSize: "0.9rem", lineHeight: 1.7 }}>
              {isEssere
                ? "Il tuo referente DeNani ti contatterà presto per definire il rinnovo."
                : "Grazie! Ti contatteremo con una proposta su misura."}
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: "20px", marginBottom: "32px" }}>
              {domande.map(d => (
                <motion.div key={d.n} variants={fadeUp}
                  style={{ border: `1px solid ${CB}`, background: CBG, borderRadius: "12px", padding: "22px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ color: A, fontFamily: F, fontSize: "0.6rem", opacity: 0.65, letterSpacing: "0.1em" }}>{d.n}</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(102,242,223,0.12)" }} />
                  </div>
                  <p style={{ color: W, fontFamily: F, fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.4, marginBottom: "14px" }}>{d.q}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {d.opts.map(opt => {
                      const sel = risposte[d.n] === opt;
                      return (
                        <button key={opt} onClick={() => setRisposte(prev => ({ ...prev, [d.n]: opt }))}
                          style={{ border: sel ? `1.5px solid ${A}` : `1px solid rgba(102,242,223,0.22)`, background: sel ? "rgba(102,242,223,0.1)" : "transparent", color: sel ? A : T, fontFamily: F, fontSize: "0.78rem", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }}>
                          {sel && <Check size={11} color={A} />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <p style={{ color: T, fontFamily: F, fontSize: "0.78rem", opacity: 0.7 }}>
                {Object.keys(risposte).length}/{domande.length} domande completate
              </p>
              <button onClick={() => { if (Object.keys(risposte).length >= domande.length) setInviato(true); }}
                disabled={Object.keys(risposte).length < domande.length}
                style={{ background: Object.keys(risposte).length < domande.length ? "rgba(102,242,223,0.3)" : A, color: "#000", fontFamily: F, fontSize: "0.9rem", fontWeight: 700, padding: "14px 36px", borderRadius: "8px", border: "none", cursor: Object.keys(risposte).length < domande.length ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "background 0.2s" }}>
                {isEssere ? "Invia feedback" : "Invia questionario"} <ArrowRight size={16} />
              </button>
              <p style={{ color: T, fontFamily: F, fontSize: "0.72rem", opacity: 0.6 }}>
                In alternativa scrivi a <a href="mailto:support@denani.it" style={{ color: A }}>support@denani.it</a>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ─── SEZIONE SCADENZA (solo clienti in essere) ─────────────────────────── */
function SezioneScadenza() {
  return (
    <section id="scadenza" style={{ padding: "96px clamp(20px,6vw,80px)", background: "#030303", backgroundImage: GRID, backgroundSize: "72px 72px" }}>
      <SectionHeader
        label="Avviso Contrattuale"
        title={<>Servizi prossimi alla <span style={{ color: A }}>scadenza contrattuale</span></>}
      />
      <AccentDivider />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ border: `1.5px solid rgba(102,242,223,0.3)`, background: "rgba(102,242,223,0.04)", borderRadius: "12px", padding: "28px 32px", marginBottom: "40px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <AlertCircle size={22} color="#66F2DF" style={{ flexShrink: 0, marginTop: "3px" }} />
          <p style={{ color: "rgb(219,219,219)", fontFamily: F, fontSize: "0.92rem", lineHeight: 1.85, margin: 0, fontStyle: "italic" }}>
            "I servizi attualmente attivi risultano prossimi alla naturale scadenza contrattuale. Si invita pertanto il Cliente a valutare la sottoscrizione dei nuovi servizi di maintenance, monitoraggio, compliance GDPR e gestione hosting, al fine di garantire continuità operativa, aggiornamenti tecnici e mantenimento online delle piattaforme digitali. In assenza di adesione entro i termini indicati, i servizi di collaborazione e assistenza continuativa si intenderanno decaduti e non più garantiti."
          </p>
        </motion.div>

        <p style={{ color: A, fontFamily: F, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px", textAlign: "center" }}>Servizi soggetti a rinnovo</p>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "16px", marginBottom: "40px" }}>
          {serviziScadenza.map((s, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ border: `1px solid ${CB}`, background: CBG, borderRadius: "10px", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(102,242,223,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.icon}
              </div>
              <p style={{ color: W, fontFamily: F, fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.3 }}>{s.titolo}</p>
              <p style={{ color: T, fontFamily: F, fontSize: "0.72rem", lineHeight: 1.5 }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ border: `1px solid ${CB}`, background: CBG, borderRadius: "12px", padding: "28px 32px", marginBottom: "32px" }}>
          <p style={{ color: A, fontFamily: F, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}>Nuovi abbonamenti disponibili</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "20px" }}>
            {[
              { t:"Maintenance & Monitoraggio", d:"Aggiornamenti continuativi e monitoraggio proattivo h24." },
              { t:"Compliance GDPR",             d:"Adeguamento normativo e gestione documentazione privacy." },
              { t:"Gestione Hosting",            d:"Rinnovo, ottimizzazione e supporto infrastruttura." },
              { t:"Assistenza Continuativa",     d:"Supporto dedicato su interventi tecnici e operativi." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Check size={14} color={A} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <p style={{ color: W, fontFamily: F, fontSize: "0.88rem", fontWeight: 600, lineHeight: 1.3 }}>{item.t}</p>
                </div>
                <p style={{ color: T, fontFamily: F, fontSize: "0.78rem", lineHeight: 1.6, paddingLeft: "22px" }}>{item.d}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ border: `1.5px solid rgba(102,242,223,0.35)`, background: "rgba(102,242,223,0.05)", borderRadius: "12px", padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <h3 style={{ color: W, fontFamily: F, fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>Sottoscrivi il nuovo abbonamento</h3>
            <p style={{ color: T, fontFamily: F, fontSize: "0.85rem", lineHeight: 1.6 }}>Contatta il tuo referente o scrivi a <a href="mailto:support@denani.it" style={{ color: A, textDecoration: "none" }}>support@denani.it</a></p>
          </div>
          <a href="mailto:support@denani.it"
            style={{ background: A, color: "#000", fontFamily: F, fontSize: "0.88rem", fontWeight: 700, padding: "13px 28px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <Mail size={15} /> Contattaci ora
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────── */
function LandingFooter() {
  return (
    <footer style={{ background: "#000", borderTop: `1px solid rgba(102,242,223,0.1)`, padding: "52px clamp(20px,5vw,60px) 28px" }}>
      <style>{`
        .lf-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 36px;
        }
        .lf-bottom {
          border-top: 1px solid rgba(102,242,223,0.08);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        @media (max-width: 860px) {
          .lf-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
        }
        @media (max-width: 540px) {
          .lf-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
          .lf-col-brand { grid-column: 1 / -1; display: flex; align-items: center; gap: 16px; }
          .lf-col-brand p { margin: 0; }
          .lf-bottom { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="lf-grid">

          {/* Brand */}
          <div className="lf-col-brand">
            <img src={logoImg} alt="DeNani" style={{ height: "22px", width: "auto", display: "block", flexShrink: 0 }} />
            <p style={{ color: T, fontFamily: F, fontSize: "0.75rem", lineHeight: 1.75, marginTop: "12px" }}>
              Digitalizza · La tua immagine<br />La tua comunicazione · La tua produzione
            </p>
          </div>

          {/* Contatti */}
          <div>
            <p style={{ color: A, fontFamily: F, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>Contatti</p>
            {[
              {l:"Email", v:"support@denani.it", href:"mailto:support@denani.it"},
              {l:"PEC",   v:"denani@pec.it",     href:"mailto:denani@pec.it"},
              {l:"Sito",  v:"denani.odoo.com",   href:"https://denani.odoo.com"},
            ].map(c => (
              <div key={c.l} style={{ marginBottom: "10px" }}>
                <span style={{ color: A, fontFamily: F, fontSize: "0.55rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7, display: "block", marginBottom: "2px" }}>{c.l}</span>
                <a href={c.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: T, fontFamily: F, fontSize: "0.78rem", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = A)}
                  onMouseLeave={e => (e.currentTarget.style.color = T)}>{c.v}</a>
              </div>
            ))}
          </div>

          {/* Sedi */}
          <div>
            <p style={{ color: A, fontFamily: F, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>Sedi</p>
            {[
              {l:"Sede Legale",    v:"Via Camozzi 1/C, 24027 Nembro (BG)"},
              {l:"Sede Operativa", v:"Via Galimberti 6A, 24124 Bergamo"},
            ].map(s => (
              <div key={s.l} style={{ marginBottom: "10px" }}>
                <span style={{ color: A, fontFamily: F, fontSize: "0.55rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7, display: "block", marginBottom: "2px" }}>{s.l}</span>
                <span style={{ color: T, fontFamily: F, fontSize: "0.78rem", lineHeight: 1.6 }}>{s.v}</span>
              </div>
            ))}
          </div>

          {/* Dati */}
          <div>
            <p style={{ color: A, fontFamily: F, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>Dati Aziendali</p>
            {[
              {l:"P.IVA / CF", v:"04432260166"},
              {l:"REA",        v:"BG-462479"},
              {l:"Cap. Soc.",  v:"€ 12.500,00 i.v."},
            ].map(item => (
              <div key={item.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", gap: "8px" }}>
                <span style={{ color: A, fontFamily: F, fontSize: "0.55rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7, flexShrink: 0 }}>{item.l}</span>
                <span style={{ color: T, fontFamily: F, fontSize: "0.76rem", textAlign: "right" }}>{item.v}</span>
              </div>
            ))}
          </div>

        </div>

        <div className="lf-bottom">
          <span style={{ color: T, fontFamily: F, fontSize: "0.71rem", opacity: 0.45 }}>© 2026 DeNani S.r.l. — Tutti i diritti riservati.</span>
          <span style={{ color: A, fontFamily: F, fontSize: "0.71rem", letterSpacing: "0.04em" }}>P.IVA IT04432260166</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── SEZIONE PREMESSA ──────────────────────────────────────────────────── */
function SezionePremessa() {
  const blocks = [
    {
      tag: "01", title: "Obiettivi del Contratto",
      items: [
        { icon: <Target size={16} color={A} />,    label: "Continuità operativa del sito" },
        { icon: <RefreshCw size={16} color={A} />, label: "Adeguamento tecnologico costante" },
        { icon: <Lock size={16} color={A} />,      label: "Sicurezza dati e infrastrutture" },
        { icon: <Zap size={16} color={A} />,       label: "Supporto evolutivo nel tempo" },
      ],
    },
    {
      tag: "02", title: "Perché Aggiornare Adesso",
      items: [
        { icon: <RefreshCw size={16} color={A} />,  label: "Linguaggi di programmazione (PHP)" },
        { icon: <Zap size={16} color={A} />,        label: "Aggiornamento plug-in e dipendenze" },
        { icon: <ShieldAlert size={16} color={A} />,label: "Normative GDPR e privacy" },
        { icon: <Lock size={16} color={A} />,       label: "Sicurezza informatica aggiornata" },
      ],
    },
  ];
  const risks = [
    { icon: <AlertTriangle size={20} color={A} />, label: "Malfunzionamenti e downtime",   desc: "Interruzioni operative con impatto diretto sul business." },
    { icon: <ShieldAlert size={20} color={A} />,   label: "Vulnerabilità di sicurezza",    desc: "Attacchi informatici, data breach e compromissione del sistema." },
    { icon: <TrendingDown size={20} color={A} />,  label: "Perdita di performance",        desc: "Rallentamenti, indicizzazione ridotta, peggioramento UX." },
    { icon: <FileX size={20} color={A} />,         label: "Non conformità normativa",      desc: "Rischio sanzioni per mancato rispetto GDPR e normative vigenti." },
  ];

  return (
    <section id="premessa" style={{ padding: "96px clamp(20px,6vw,80px)", background: BG, backgroundImage: GRID, backgroundSize: "72px 72px" }}>
      <SectionHeader label="Premessa & Contesto" title={<>Perché la manutenzione è <span style={{ color: A }}>essenziale</span></>} />
      <AccentDivider />
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "24px", marginBottom: "24px" }}>
          {blocks.map(b => (
            <motion.div key={b.tag} variants={fadeUp}
              style={{ border: `1px solid rgba(102,242,223,0.15)`, background: "rgba(102,242,223,0.03)", borderRadius: "12px", padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{ color: A, fontFamily: F, fontSize: "0.6rem", opacity: 0.6, letterSpacing: "0.12em" }}>{b.tag}</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(102,242,223,0.2)" }} />
              </div>
              <h3 style={{ color: W, fontFamily: F, fontSize: "1rem", fontWeight: 600, marginBottom: "18px" }}>{b.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {b.items.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ color: T, fontFamily: F, fontSize: "0.88rem" }}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ border: `1px solid rgba(102,242,223,0.2)`, background: "rgba(102,242,223,0.03)", borderRadius: "12px", padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ color: A, fontFamily: F, fontSize: "0.6rem", opacity: 0.6, letterSpacing: "0.12em" }}>03</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(102,242,223,0.2)" }} />
          </div>
          <h3 style={{ color: W, fontFamily: F, fontSize: "1rem", fontWeight: 600, marginBottom: "24px" }}>Rischi in Assenza di Manutenzione</h3>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
            {risks.map((r, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ background: "rgba(0,0,0,0.4)", border: `1px solid rgba(102,242,223,0.1)`, borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {r.icon}
                <p style={{ color: W, fontFamily: F, fontSize: "0.88rem", fontWeight: 600 }}>{r.label}</p>
                <p style={{ color: T, fontFamily: F, fontSize: "0.78rem", lineHeight: 1.55 }}>{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SEZIONE SERVIZI ───────────────────────────────────────────────────── */
function SezioneServizi() {
  const servizi = [
    { icon: <Shield size={28} color={A} />,        num: "01", titolo: "Manutenzione Tecnica",    desc: "Garanzia di stabilità e sicurezza continuativa. Aggiornamenti PHP e plug-in, monitoraggio funzionalità, verifica compatibilità.", tag: ["Stabilità","Sicurezza","Monitoraggio"] },
    { icon: <Headphones size={28} color={A} />,    num: "02", titolo: "Supporto & Assistenza",   desc: "Interventi su richiesta per correzioni tecniche e aggiornamenti contenuti. Risposta rapida e gestione delle problematiche quotidiane.", tag: ["Su Richiesta","Correzioni","Contenuti"] },
    { icon: <GraduationCap size={28} color={A} />, num: "03", titolo: "Formazione Operativa",    desc: "Sessioni di formazione per la gestione autonoma del sito, aggiornamento contenuti e utilizzo efficace degli strumenti interni.", tag: ["CMS","Autonomia","Training"] },
    { icon: <Layers size={28} color={A} />,        num: "04", titolo: "Evoluzione & Restyling",  desc: "Aggiornamento grafico UX/UI, miglioramento delle performance, revisione della struttura per mantenere il sito moderno.", tag: ["UX/UI","Performance","Design"] },
    { icon: <Server size={28} color={A} />,        num: "05", titolo: "Gestione Infrastruttura", desc: "Verifica e supporto completo su hosting, dominio e configurazioni tecniche. Ottimizzazione dell'infrastruttura.", tag: ["Hosting","Dominio","Config"] },
  ];

  return (
    <section id="servizi" style={{ padding: "96px clamp(20px,6vw,80px)", background: "#030303", backgroundImage: GRID, backgroundSize: "72px 72px" }}>
      <SectionHeader
        label="Servizi Proposti"
        title={<>Tutto ciò di cui il tuo sito <span style={{ color: A }}>ha bisogno</span></>}
        sub="Una suite completa di servizi per ogni esigenza del tuo asset digitale."
      />
      <AccentDivider />
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {servizi.map(s => (
          <motion.div key={s.num} variants={fadeUp}
            style={{ border: `1px solid rgba(102,242,223,0.15)`, background: "rgba(102,242,223,0.02)", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", position: "relative" }}
            whileHover={{ borderColor: `rgba(102,242,223,0.5)`, backgroundColor: "rgba(102,242,223,0.06)", y: -6, transition: { duration: 0.25 } }}>
            <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${A},transparent)`, opacity: 0 }}
              whileHover={{ opacity: 0.6 }} transition={{ duration: 0.25 }} />
            <span style={{ color: A, fontFamily: F, fontSize: "0.6rem", letterSpacing: "0.15em", marginBottom: "16px", display: "block" }}>{s.num}</span>
            <div style={{ marginBottom: "18px" }}>{s.icon}</div>
            <h3 style={{ color: W, fontFamily: F, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "10px" }}>{s.titolo}</h3>
            <p style={{ color: T, fontFamily: F, fontSize: "0.8rem", lineHeight: 1.65, flex: 1 }}>{s.desc}</p>
            <div style={{ marginTop: "18px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {s.tag.map(t => (
                <span key={t} style={{ border: `1px solid rgba(102,242,223,0.2)`, color: A, fontFamily: F, fontSize: "0.7rem", padding: "2px 8px", borderRadius: "4px" }}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── SEZIONE DOWNLOAD BROCHURE ─────────────────────────────────────────── */
function SezioneDownload({ tipo }: { tipo: "nuovi" | "essere" }) {
  const isEssere = tipo === "essere";
  const file = isEssere
    ? "/Denani Brochure clienti in essere.pdf"
    : "/Denani Brochure nuovi clienti.pdf";

  return (
    <section style={{ padding: "80px clamp(20px,6vw,80px)", background: BG, backgroundImage: GRID, backgroundSize: "72px 72px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "300px", background: `radial-gradient(ellipse, ${A}, transparent 70%)`, opacity: 0.05, pointerEvents: "none" }} />

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        style={{ maxWidth: "720px", margin: "0 auto", border: `1.5px solid rgba(102,242,223,0.3)`, background: "rgba(102,242,223,0.04)", borderRadius: "16px", padding: "48px clamp(24px,5vw,64px)", textAlign: "center", position: "relative" }}>

        <span style={{ color: A, fontFamily: F, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
          Documento Ufficiale
        </span>

        <h2 style={{ color: W, fontFamily: F, fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
          Scarica la{" "}
          <span style={{ color: A }}>brochure completa</span>
        </h2>

        <p style={{ color: T, fontFamily: F, fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto 36px" }}>
          {isEssere
            ? "Trova tutti i dettagli sui servizi di rinnovo, i prezzi fedeltà e le nuove iniziative nel documento PDF ufficiale."
            : "Scopri in dettaglio tutti i nostri servizi, i pacchetti disponibili e i prezzi nel documento PDF ufficiale."}
        </p>

        <motion.a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: A, color: "#000", fontFamily: F, fontSize: "0.92rem", fontWeight: 700, padding: "14px 36px", borderRadius: "8px", textDecoration: "none", cursor: "pointer" }}
          whileHover={{ scale: 1.04, boxShadow: `0 0 32px rgba(102,242,223,0.35)` }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Scarica Brochure PDF
        </motion.a>

      </motion.div>
    </section>
  );
}

/* ─── LANDING SHELL ─────────────────────────────────────────────────────── */
function LandingShell({ tipo }: { tipo: "nuovi" | "essere" }) {
  const isEssere = tipo === "essere";
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navLinks = isEssere
    ? [
        { label: "Iniziative",   href: "#iniziative" },
        { label: "Premessa",     href: "#premessa" },
        { label: "Servizi",      href: "#servizi" },
        { label: "Pacchetti",    href: "#pacchetti" },
        { label: "Moduli",       href: "#moduli" },
        { label: "Questionario", href: "#questionario" },
        { label: "Rinnovo",      href: "#scadenza" },
      ]
    : [
        { label: "Iniziative",   href: "#iniziative" },
        { label: "Premessa",     href: "#premessa" },
        { label: "Servizi",      href: "#servizi" },
        { label: "Pacchetti",    href: "#pacchetti" },
        { label: "Moduli",       href: "#moduli" },
        { label: "Questionario", href: "#questionario" },
      ];

  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      <Loader onDone={() => setLoaded(true)} />
      <div style={{ background: BG, minHeight: "100vh", overflowX: "hidden", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
      <motion.div style={{ scaleX, transformOrigin: "0%", position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: A, zIndex: 200, boxShadow: `0 0 12px rgba(102,242,223,0.6)` }} />
      <LandingNav links={navLinks} tipo={tipo} />
      <Hero tipo={tipo} />
      <SezioneIniziative tipo={tipo} />
      <SezionePremessa />
      <SezioneServizi />
      <SezionePacchetti tipo={tipo} />
      <SezioneModuli tipo={tipo} />
      <SezioneQuestionario tipo={tipo} />
      {isEssere && <SezioneScadenza />}
      <SezioneDownload tipo={tipo} />
      <LandingFooter />
      <style>{`* { box-sizing:border-box; margin:0; padding:0; } html { scroll-behavior:smooth; } body { background:#000; }`}</style>
      </div>
    </>
  );
}

/* ─── EXPORTS ───────────────────────────────────────────────────────────── */
export function LandingNuoviClienti()  { return <LandingShell tipo="nuovi" />; }
export function LandingClientiEssere() { return <LandingShell tipo="essere" />; }
