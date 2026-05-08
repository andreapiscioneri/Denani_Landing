import logoImg from "../../imports/STICKY-LOGO3.png";
import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Shield, Headphones, Layers, Server, GraduationCap,
  Users, Megaphone, Building2, Check, AlertCircle,
  ClipboardList, ChevronRight, Clock, RefreshCw, Wrench,
  HelpCircle, Mail, ExternalLink,
} from "lucide-react";

/* ─── PALETTE (identica alla brochure esistente) ────────────────────────── */
const A   = "#66F2DF";
const BG  = "#000000";
const BG2 = "#060606";
const T   = "rgb(219, 219, 219)";
const W   = "#FFFFFF";
const F   = "'Roboto', sans-serif";
const CB  = "rgba(102,242,223,0.18)";
const CBG = "rgba(102,242,223,0.04)";
const GRID_BG = `linear-gradient(rgba(102,242,223,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(102,242,223,0.06) 1px,transparent 1px)`;

/* ─── DATI SERVIZI ──────────────────────────────────────────────────────── */
const servizi = [
  { icon: <Shield size={20} color={A} />,       num: "01", titolo: "Manutenzione Tecnica",    desc: "Aggiornamenti PHP e plug-in, monitoraggio funzionalità, verifica compatibilità tra componenti. Garanzia di stabilità e sicurezza continuativa.", tag: ["Stabilità","Sicurezza","Monitoraggio"] },
  { icon: <Headphones size={20} color={A} />,   num: "02", titolo: "Supporto & Assistenza",   desc: "Interventi su richiesta per correzioni tecniche e aggiornamenti contenuti. Risposta rapida e gestione delle problematiche operative quotidiane.", tag: ["Su Richiesta","Correzioni","Contenuti"] },
  { icon: <GraduationCap size={20} color={A}/>, num: "03", titolo: "Formazione Operativa",    desc: "Sessioni di formazione per la gestione autonoma del sito, aggiornamento contenuti e utilizzo efficace degli strumenti interni.", tag: ["CMS","Autonomia","Training"] },
  { icon: <Layers size={20} color={A} />,       num: "04", titolo: "Evoluzione & Restyling",  desc: "Aggiornamento grafico UX/UI, miglioramento delle performance, revisione della struttura per mantenere il sito moderno e competitivo.", tag: ["UX/UI","Performance","Design"] },
  { icon: <Server size={20} color={A} />,       num: "05", titolo: "Gestione Infrastruttura", desc: "Verifica e supporto completo su hosting, dominio e configurazioni tecniche. Ottimizzazione dell'infrastruttura per massima efficienza.", tag: ["Hosting","Dominio","Config"] },
];

/* ─── DOMANDE QUESTIONARIO ──────────────────────────────────────────────── */
const domande = [
  { n: "01", q: "Qual è il principale obiettivo del vostro sito web?",         opts: ["Vetrina aziendale","E-commerce","Blog / Contenuti","Gestione clienti"] },
  { n: "02", q: "Da quanto tempo il vostro sito è online senza aggiornamenti?", opts: ["Meno di 6 mesi","6–12 mesi","1–2 anni","Più di 2 anni"] },
  { n: "03", q: "Avete mai riscontrato problemi tecnici o downtime?",           opts: ["Mai","Raramente","Occasionalmente","Frequentemente"] },
  { n: "04", q: "Chi si occupa attualmente della gestione del sito?",           opts: ["Nessuno","Personale interno","Agenzia esterna","Freelance"] },
  { n: "05", q: "Quale servizio ritenete più urgente?",                         opts: ["Sicurezza","Performance","Contenuti","Supporto tecnico"] },
  { n: "06", q: "Siete interessati a un preventivo personalizzato?",            opts: ["Sì, contattarmi","Prima voglio saperne di più","Non ancora","Già cliente"] },
];

/* ─── SERVIZI IN SCADENZA ───────────────────────────────────────────────── */
const serviziScadenza = [
  { icon: <Server size={16} color={A} />,    titolo: "Hosting",                      desc: "Gestione e rinnovo infrastruttura di hosting." },
  { icon: <Wrench size={16} color={A} />,    titolo: "Manutenzione Siti",            desc: "Aggiornamenti tecnici periodici e monitoraggio." },
  { icon: <Headphones size={16} color={A}/>, titolo: "Assistenza Tecnica",           desc: "Supporto su richiesta e interventi correttivi." },
  { icon: <RefreshCw size={16} color={A} />, titolo: "Restyling",                    desc: "Revisione grafica e aggiornamento UX/UI." },
  { icon: <Clock size={16} color={A} />,     titolo: "Supporto Operativo Continuativo", desc: "Gestione continuativa delle attività digitali." },
];

/* ─── SHARED UI ─────────────────────────────────────────────────────────── */
const Tag = ({ t }: { t: string }) => (
  <span className="pdf-fix-pill" style={{ border:`1px solid rgba(102,242,223,0.28)`, color:A, fontFamily:F, fontSize:"0.55rem", height:"18px", padding:"0 7px", borderRadius:"3px", letterSpacing:"0.06em", display:"inline-flex", alignItems:"center", lineHeight:"1", whiteSpace:"nowrap", textAlign:"center" }}>{t}</span>
);
const SectionLabel = ({ children }: { children: string }) => (
  <span style={{ color:A, fontFamily:F, fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", display:"block", marginBottom:"2.5mm" }}>{children}</span>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ color:W, fontFamily:F, fontSize:"1.45rem", fontWeight:700, lineHeight:1.2, margin:"0 0 4mm" }}>{children}</h2>
);
const AccentLine = () => (
  <div style={{ height:"1px", background:`linear-gradient(90deg,${A},transparent)`, margin:"0 0 5mm", opacity:0.35 }} />
);

function PageFooter() {
  return (
    <div style={{ borderTop:`1px solid rgba(102,242,223,0.12)`, paddingTop:"4mm", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexShrink:0 }}>
      <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
        <div style={{ display:"flex", gap:"5mm", alignItems:"center" }}>
          <span style={{ color:T, fontFamily:F, fontSize:"0.65rem" }}>support@denani.it</span>
          <span style={{ color:"rgba(102,242,223,0.3)" }}>·</span>
          <span style={{ color:T, fontFamily:F, fontSize:"0.65rem" }}>denani@pec.it</span>
        </div>
        <span style={{ color:T, fontFamily:F, fontSize:"0.6rem" }}>© 2026 DeNani S.r.l. — Tutti i diritti riservati.</span>
      </div>
      <span style={{ color:A, fontFamily:F, fontSize:"0.65rem", letterSpacing:"0.04em" }}>P.IVA IT04432260166</span>
    </div>
  );
}

function PageHeader({ title }: { title: string }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:"5mm", borderBottom:`1px solid rgba(102,242,223,0.1)`, marginBottom:"5mm", flexShrink:0 }}>
      <img src={logoImg} alt="DeNani" style={{ height:"20px", width:"auto", opacity:0.8 }} />
      <span style={{ color:A, fontFamily:F, fontSize:"0.55rem", letterSpacing:"0.14em", textTransform:"uppercase" }}>{title}</span>
    </div>
  );
}

function Page({ children, bg = BG2, header }: { children: React.ReactNode; bg?: string; header: string }) {
  return (
    <div className="brochure-page" style={{ width:"210mm", height:"297mm", background:bg, backgroundImage:GRID_BG, backgroundSize:"72px 72px", position:"relative", overflow:"hidden", boxSizing:"border-box", display:"flex", flexDirection:"column", padding:"10mm 13mm 9mm" }}>
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
        <PageHeader title={header} />
        <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
          {children}
        </div>
        <PageFooter />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COVER COMMERCIALE
═══════════════════════════════════════════════════════════════════════════ */
function CoverCommerciale({ tipo }: { tipo: "nuovi" | "essere" }) {
  const isEssere = tipo === "essere";
  return (
    <div className="brochure-page" style={{ width:"210mm", height:"297mm", background:BG, backgroundImage:GRID_BG, backgroundSize:"72px 72px", position:"relative", overflow:"hidden", boxSizing:"border-box", display:"flex", flexDirection:"column", padding:"10mm 13mm 9mm", pageBreakAfter:"always", breakAfter:"page" }}>
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column" }}>

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:"6mm", borderBottom:`1px solid rgba(102,242,223,0.12)`, marginBottom:"0", flexShrink:0 }}>
          <img src={logoImg} alt="DeNani S.r.l." style={{ height:"32px", width:"auto" }} />
          <span style={{ color:A, fontFamily:F, fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase" }}>
            {isEssere ? "Area Clienti — Comunicazione Riservata" : "Web Management &amp; Nuove Iniziative"}
          </span>
        </div>

        {/* Hero */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", padding:"0 6mm" }}>
          <div style={{ marginBottom:"5mm", textAlign:"center" }}>
            <img src={logoImg} alt="DeNani S.r.l." style={{ height:"24px", width:"auto", margin:"0 auto 3mm" }} />
            <div style={{ width:"42mm", height:"1px", background:`linear-gradient(90deg,transparent,${A},transparent)`, margin:"0 auto" }} />
          </div>

          <div className="pdf-fix-pill" style={{ display:"inline-flex", alignItems:"center", alignSelf:"center", width:"fit-content", height:"24px", padding:"0 16px", border:`1px solid ${A}`, borderRadius:"999px", color:A, fontFamily:F, fontSize:"0.58rem", letterSpacing:"0.14em", lineHeight:"1", textTransform:"uppercase", whiteSpace:"nowrap", textAlign:"center", background:"transparent", marginBottom:"6mm" }}>
            {isEssere ? "Clienti in essere · Rinnovo Servizi" : "Digital Agency · Nuovi Progetti"}
          </div>

          <h1 style={{ color:W, fontFamily:F, fontSize:"2.7rem", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.02em", marginBottom:"5mm" }}>
            {isEssere
              ? <><span style={{ color:A }}>Continuità e crescita</span><br />del tuo asset digitale</>
              : <><span style={{ color:A }}>Innovazione, persone</span><br />e nuovi orizzonti digitali</>
            }
          </h1>

          <p style={{ color:T, fontFamily:F, fontSize:"0.88rem", lineHeight:1.75, maxWidth:"115mm", marginBottom:"8mm" }}>
            {isEssere
              ? "Siamo lieti di condividere con te le ultime novità aziendali e di aggiornarti sullo stato dei servizi attivi. Scopri le nuove opportunità e garantisci la continuità della tua presenza digitale."
              : "Siamo in crescita e vogliamo condividere con te le nostre nuove iniziative, i team che si stanno formando e i servizi pensati per accompagnare il tuo business nel futuro digitale."
            }
          </p>

          <div style={{ width:"28mm", height:"1px", background:`linear-gradient(90deg,transparent,${A},transparent)`, marginBottom:"8mm" }} />

          <div style={{ display:"flex", gap:"16mm" }}>
            {isEssere
              ? [{v:"5+",l:"Anni di partnership"},{v:"100%",l:"Supporto dedicato"},{v:"24/7",l:"Monitoraggio attivo"}].map(s => (
                  <div key={s.l} style={{ textAlign:"center" }}>
                    <p style={{ color:A, fontFamily:F, fontSize:"2rem", fontWeight:700, lineHeight:1, marginBottom:"4px" }}>{s.v}</p>
                    <p style={{ color:T, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>{s.l}</p>
                  </div>
                ))
              : [{v:"New",l:"Iniziative 2026"},{v:"5+",l:"Anni di esperienza"},{v:"100%",l:"Focus sul cliente"}].map(s => (
                  <div key={s.l} style={{ textAlign:"center" }}>
                    <p style={{ color:A, fontFamily:F, fontSize:"2rem", fontWeight:700, lineHeight:1, marginBottom:"4px" }}>{s.v}</p>
                    <p style={{ color:T, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>{s.l}</p>
                  </div>
                ))
            }
          </div>
        </div>

        <PageFooter />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE — NUOVE INIZIATIVE AZIENDALI
═══════════════════════════════════════════════════════════════════════════ */
function NuoveIniziativePage({ pageNum }: { pageNum: string }) {
  return (
    <Page header={`Nuove Iniziative Aziendali — ${pageNum}`}>
      <SectionLabel>Novità &amp; Comunicazione</SectionLabel>
      <H2>Le nostre nuove <span style={{ color:A }}>iniziative aziendali</span></H2>
      <AccentLine />

      {/* Tre blocchi principali */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"3.5mm", marginBottom:"4mm", flexShrink:0 }}>
        {/* Campagne di comunicazione */}
        <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"5mm" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3.5mm" }}>
            <div style={{ width:"30px", height:"30px", borderRadius:"6px", background:"rgba(102,242,223,0.09)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Megaphone size={16} color={A} />
            </div>
            <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>01</span>
          </div>
          <h3 style={{ color:W, fontFamily:F, fontSize:"0.9rem", fontWeight:700, marginBottom:"2.5mm", lineHeight:1.3 }}>Campagne di Comunicazione</h3>
          <p style={{ color:T, fontFamily:F, fontSize:"0.72rem", lineHeight:1.65, marginBottom:"3mm" }}>
            Abbiamo avviato nuove campagne di comunicazione digitale e offline per rafforzare la nostra presenza sul mercato e presentare i nostri servizi a un pubblico sempre più ampio.
          </p>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"4px" }}>
            {["Comunicazione multi-canale","Brand awareness digitale","Contenuti editoriali mirati","Presenza sui social media"].map((v,i) => (
              <li key={i} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <ChevronRight size={11} color={A} style={{ flexShrink:0 }} />
                <span style={{ color:T, fontFamily:F, fontSize:"0.68rem" }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nuove assunzioni */}
        <div style={{ border:`1.5px solid ${A}`, background:CBG, borderRadius:"8px", padding:"5mm", position:"relative" }}>
          <div className="pdf-fix-pill" style={{ position:"absolute", top:"-11px", left:"50%", transform:"translateX(-50%)", background:"#000", border:`1px solid ${A}`, color:A, fontFamily:F, fontSize:"0.5rem", letterSpacing:"0.12em", textTransform:"uppercase", padding:"2px 10px", borderRadius:"999px", whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", lineHeight:"1" }}>In evidenza</div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3.5mm" }}>
            <div style={{ width:"30px", height:"30px", borderRadius:"6px", background:"rgba(102,242,223,0.09)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Users size={16} color={A} />
            </div>
            <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>02</span>
          </div>
          <h3 style={{ color:W, fontFamily:F, fontSize:"0.9rem", fontWeight:700, marginBottom:"2.5mm", lineHeight:1.3 }}>Nuove Assunzioni</h3>
          <p style={{ color:T, fontFamily:F, fontSize:"0.72rem", lineHeight:1.65, marginBottom:"3mm" }}>
            Il nostro team è in crescita. Stiamo selezionando nuovi professionisti specializzati per ampliare le competenze interne e offrire servizi ancora più completi e di qualità.
          </p>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"4px" }}>
            {["Developer front-end & back-end","Specialisti SEO & Performance","Consulenti UX/UI","Gestori di account dedicati"].map((v,i) => (
              <li key={i} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <Check size={11} color={A} style={{ flexShrink:0 }} />
                <span style={{ color:T, fontFamily:F, fontSize:"0.68rem" }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ambienti di lavoro */}
        <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"5mm" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3.5mm" }}>
            <div style={{ width:"30px", height:"30px", borderRadius:"6px", background:"rgba(102,242,223,0.09)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Building2 size={16} color={A} />
            </div>
            <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>03</span>
          </div>
          <h3 style={{ color:W, fontFamily:F, fontSize:"0.9rem", fontWeight:700, marginBottom:"2.5mm", lineHeight:1.3 }}>Ambienti di Lavoro</h3>
          <p style={{ color:T, fontFamily:F, fontSize:"0.72rem", lineHeight:1.65, marginBottom:"3mm" }}>
            Abbiamo rinnovato i nostri spazi di lavoro per favorire la creatività, la collaborazione e il benessere del team. Un ambiente moderno a supporto dell'innovazione quotidiana.
          </p>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"4px" }}>
            {["Sede operativa rinnovata","Spazi collaborativi open-space","Sala riunioni tecnologica","Area benessere per il team"].map((v,i) => (
              <li key={i} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <ChevronRight size={11} color={A} style={{ flexShrink:0 }} />
                <span style={{ color:T, fontFamily:F, fontSize:"0.68rem" }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Banner sedi */}
      <div style={{ border:`1px solid rgba(102,242,223,0.2)`, background:"rgba(102,242,223,0.03)", borderRadius:"8px", padding:"4mm 6mm", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4mm" }}>
        {[
          { label:"Sede Legale",    indirizzo:"Via Camozzi 1/C – 24027 Nembro (BG)" },
          { label:"Sede Operativa", indirizzo:"Via Galimberti 6A – 24124 Bergamo" },
        ].map(s => (
          <div key={s.label} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <Building2 size={14} color={A} style={{ flexShrink:0 }} />
            <div>
              <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"1px" }}>{s.label}</p>
              <p style={{ color:T, fontFamily:F, fontSize:"0.68rem" }}>{s.indirizzo}</p>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE — SERVIZI DISPONIBILI
═══════════════════════════════════════════════════════════════════════════ */
function ServiziDisponibiliPage({ pageNum }: { pageNum: string }) {
  return (
    <Page header={`Servizi Disponibili — ${pageNum}`}>
      <SectionLabel>I Nostri Servizi</SectionLabel>
      <H2>Tutto ciò di cui il tuo sito <span style={{ color:A }}>ha bisogno</span></H2>
      <AccentLine />

      <div style={{ display:"flex", flexDirection:"column", gap:"2.5mm", flex:1 }}>
        {servizi.map((s, i) => (
          <div key={s.num} style={{ border:`1px solid ${CB}`, background: i % 2 === 0 ? CBG : "rgba(102,242,223,0.015)", borderRadius:"8px", padding:"4mm 5.5mm", display:"grid", gridTemplateColumns:"8mm 54mm 1fr auto", gap:"4mm", alignItems:"center", flex:1 }}>
            <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.12em", opacity:0.65 }}>{s.num}</span>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ flexShrink:0, width:"30px", height:"30px", borderRadius:"6px", background:"rgba(102,242,223,0.09)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {s.icon}
              </div>
              <h3 style={{ color:W, fontFamily:F, fontSize:"0.86rem", fontWeight:700, lineHeight:1.25 }}>{s.titolo}</h3>
            </div>
            <p style={{ color:T, fontFamily:F, fontSize:"0.74rem", lineHeight:1.6 }}>{s.desc}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"3px", alignItems:"flex-end" }}>
              {s.tag.map(t => <Tag key={t} t={t} />)}
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE — TEST / QUESTIONARIO CONOSCITIVO
═══════════════════════════════════════════════════════════════════════════ */
function QuestionarioPage({ pageNum }: { pageNum: string }) {
  return (
    <Page header={`Questionario Conoscitivo — ${pageNum}`}>
      <SectionLabel>Test Conoscitivo</SectionLabel>
      <H2>Raccontaci il tuo <span style={{ color:A }}>progetto digitale</span></H2>
      <AccentLine />

      {/* Intro */}
      <div style={{ border:`1px solid rgba(102,242,223,0.2)`, background:"rgba(102,242,223,0.04)", borderRadius:"8px", padding:"4mm 6mm", marginBottom:"4mm", display:"flex", alignItems:"flex-start", gap:"10px", flexShrink:0 }}>
        <ClipboardList size={18} color={A} style={{ flexShrink:0, marginTop:"1px" }} />
        <p style={{ color:T, fontFamily:F, fontSize:"0.74rem", lineHeight:1.7, margin:0 }}>
          Compila il questionario conoscitivo per permetterci di comprendere meglio il tuo progetto, le tue esigenze e gli obiettivi che vuoi raggiungere. Ti contatteremo con una proposta personalizzata.
        </p>
      </div>

      {/* Domande */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5mm", flex:1 }}>
        {domande.map((d) => (
          <div key={d.n} style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4mm 5mm" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"2.5mm" }}>
              <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", opacity:0.65, letterSpacing:"0.1em" }}>{d.n}</span>
              <div style={{ flex:1, height:"1px", background:"rgba(102,242,223,0.15)" }} />
            </div>
            <p style={{ color:W, fontFamily:F, fontSize:"0.76rem", fontWeight:600, lineHeight:1.4, marginBottom:"3mm" }}>{d.q}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
              {d.opts.map((o, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", border:`1px solid rgba(102,242,223,0.22)`, borderRadius:"4px", padding:"3px 8px" }}>
                  <div style={{ width:"8px", height:"8px", borderRadius:"50%", border:`1px solid ${A}`, flexShrink:0 }} />
                  <span style={{ color:T, fontFamily:F, fontSize:"0.64rem" }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop:"4mm", display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", flexShrink:0 }}>
        <Mail size={14} color={A} />
        <span style={{ color:T, fontFamily:F, fontSize:"0.72rem" }}>Invia il questionario compilato a:</span>
        <span style={{ color:A, fontFamily:F, fontSize:"0.72rem", fontWeight:600 }}>support@denani.it</span>
        <ExternalLink size={12} color={A} />
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE — SERVIZI IN SCADENZA (solo clienti in essere)
═══════════════════════════════════════════════════════════════════════════ */
function ScadenzaServiziPage({ pageNum }: { pageNum: string }) {
  return (
    <Page header={`Rinnovo Servizi — ${pageNum}`}>
      <SectionLabel>Avviso Importante — Scadenza Contrattuale</SectionLabel>
      <H2>Servizi prossimi alla <span style={{ color:A }}>scadenza contrattuale</span></H2>
      <AccentLine />

      {/* Testo legale richiesto */}
      <div style={{ border:`1.5px solid rgba(102,242,223,0.3)`, background:"rgba(102,242,223,0.04)", borderRadius:"8px", padding:"5mm 6mm", marginBottom:"4.5mm", display:"flex", gap:"10px", flexShrink:0 }}>
        <AlertCircle size={18} color={A} style={{ flexShrink:0, marginTop:"2px" }} />
        <p style={{ color:T, fontFamily:F, fontSize:"0.75rem", lineHeight:1.75, margin:0, fontStyle:"italic" }}>
          "I servizi attualmente attivi risultano prossimi alla naturale scadenza contrattuale. Si invita pertanto il Cliente a valutare la sottoscrizione dei nuovi servizi di maintenance, monitoraggio, compliance GDPR e gestione hosting, al fine di garantire continuità operativa, aggiornamenti tecnici e mantenimento online delle piattaforme digitali. In assenza di adesione entro i termini indicati, i servizi di collaborazione e assistenza continuativa si intenderanno decaduti e non più garantiti."
        </p>
      </div>

      {/* Servizi in scadenza */}
      <div style={{ marginBottom:"4mm", flexShrink:0 }}>
        <p style={{ color:A, fontFamily:F, fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"3mm" }}>Servizi soggetti a rinnovo</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"3mm" }}>
          {serviziScadenza.map((s, i) => (
            <div key={i} style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4mm", display:"flex", flexDirection:"column", gap:"5px", alignItems:"center", textAlign:"center" }}>
              <div style={{ width:"34px", height:"34px", borderRadius:"8px", background:"rgba(102,242,223,0.09)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {s.icon}
              </div>
              <p style={{ color:W, fontFamily:F, fontSize:"0.72rem", fontWeight:700, lineHeight:1.3 }}>{s.titolo}</p>
              <p style={{ color:T, fontFamily:F, fontSize:"0.62rem", lineHeight:1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nuovo abbonamento maintenance */}
      <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4.5mm 6mm", marginBottom:"4mm", flexShrink:0 }}>
        <p style={{ color:A, fontFamily:F, fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"3mm" }}>Nuovi Servizi di Abbonamento Maintenance</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"3mm" }}>
          {[
            { titolo:"Maintenance & Monitoraggio", desc:"Aggiornamenti continuativi e monitoraggio proattivo h24." },
            { titolo:"Compliance GDPR",             desc:"Adeguamento normativo e gestione documentazione privacy." },
            { titolo:"Gestione Hosting",            desc:"Rinnovo, ottimizzazione e supporto infrastruttura hosting." },
            { titolo:"Assistenza Continuativa",     desc:"Supporto dedicato su interventi tecnici e operativi." },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                <Check size={12} color={A} style={{ flexShrink:0 }} />
                <p style={{ color:W, fontFamily:F, fontSize:"0.72rem", fontWeight:600, lineHeight:1.3 }}>{item.titolo}</p>
              </div>
              <p style={{ color:T, fontFamily:F, fontSize:"0.64rem", lineHeight:1.55, paddingLeft:"17px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA finale */}
      <div style={{ border:`1px solid rgba(102,242,223,0.3)`, background:"rgba(102,242,223,0.06)", borderRadius:"8px", padding:"4mm 6mm", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div>
          <p style={{ color:W, fontFamily:F, fontSize:"0.82rem", fontWeight:700, marginBottom:"2px" }}>Sottoscrivi il nuovo abbonamento</p>
          <p style={{ color:T, fontFamily:F, fontSize:"0.7rem" }}>Contatta il tuo referente o scrivi a <span style={{ color:A }}>support@denani.it</span> per procedere al rinnovo.</p>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <HelpCircle size={16} color={A} />
          <Mail size={16} color={A} />
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPANY FOOTER PAGE (ultima pagina condivisa)
═══════════════════════════════════════════════════════════════════════════ */
function AziendaFooterPage({ pageNum }: { pageNum: string }) {
  return (
    <Page header={`Informazioni Aziendali — ${pageNum}`}>
      <SectionLabel>Chi Siamo</SectionLabel>
      <H2>DeNani S.r.l. — <span style={{ color:A }}>il tuo partner digitale</span></H2>
      <AccentLine />

      {/* Brand hero — compatto, non flex:1 */}
      <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"5mm 6mm", marginBottom:"3.5mm", display:"flex", alignItems:"center", gap:"8mm", flexShrink:0 }}>
        <img src={logoImg} alt="DeNani S.r.l." style={{ height:"28px", width:"auto", flexShrink:0, objectFit:"contain", display:"block" }} />
        <div style={{ flex:1 }}>
          <p style={{ color:T, fontFamily:F, fontSize:"0.74rem", lineHeight:1.75, marginBottom:"2.5mm" }}>
            DeNani S.r.l. è una digital agency specializzata in web management, sviluppo e manutenzione di piattaforme digitali. Offriamo servizi continuativi che garantiscono la stabilità, la sicurezza e l'evoluzione del tuo sito web.
          </p>
          <p style={{ color:A, fontFamily:F, fontSize:"0.65rem", lineHeight:1.6 }}>
            Digitalizza · La tua immagine · La tua comunicazione · La tua produzione
          </p>
        </div>
      </div>

      {/* Griglia info — 4 colonne fisse, non flex:1 */}
      <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr 1.15fr 1fr", gap:"3.5mm", flexShrink:0 }}>
        {/* Contatti */}
        <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4mm 5mm" }}>
          <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Contatti</p>
          {[{l:"Email",v:"support@denani.it"},{l:"PEC",v:"denani@pec.it"}].map(c => (
            <div key={c.l} style={{ marginBottom:"4px" }}>
              <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", display:"block" }}>{c.l}</span>
              <span style={{ color:T, fontFamily:F, fontSize:"0.66rem" }}>{c.v}</span>
            </div>
          ))}
        </div>
        {/* Dati aziendali */}
        <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4mm 5mm" }}>
          <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Dati Aziendali</p>
          {[{l:"P.I/CF",v:"04432260166"},{l:"REA",v:"BG-462479"},{l:"Cap.",v:"€ 12.500,00 i.v."}].map(item => (
            <div key={item.l} style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px", gap:"4px" }}>
              <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", flexShrink:0 }}>{item.l}</span>
              <span style={{ color:T, fontFamily:F, fontSize:"0.66rem", textAlign:"right" }}>{item.v}</span>
            </div>
          ))}
        </div>
        {/* Sede Legale */}
        <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4mm 5mm" }}>
          <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Sede Legale</p>
          <p style={{ color:T, fontFamily:F, fontSize:"0.66rem", lineHeight:1.6 }}>Via Camozzi 1/C<br />24027 Nembro (BG)</p>
        </div>
        {/* Sede Operativa */}
        <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4mm 5mm" }}>
          <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Sede Operativa</p>
          <p style={{ color:T, fontFamily:F, fontSize:"0.66rem", lineHeight:1.6 }}>Via Galimberti 6A<br />24124 Bergamo</p>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE SETS
═══════════════════════════════════════════════════════════════════════════ */
function NuoviClientiPages({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    let id1: number, id2: number, id3: number;
    id1 = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => { id3 = requestAnimationFrame(() => onReady?.()); }); });
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); cancelAnimationFrame(id3); };
  }, []);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px", padding:"24px", background:"#111" }}>
      <CoverCommerciale tipo="nuovi" />
      <NuoveIniziativePage pageNum="02" />
      <ServiziDisponibiliPage pageNum="03" />
      <QuestionarioPage pageNum="04" />
      <AziendaFooterPage pageNum="05" />
    </div>
  );
}

function ClientiEsserePages({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    let id1: number, id2: number, id3: number;
    id1 = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => { id3 = requestAnimationFrame(() => onReady?.()); }); });
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); cancelAnimationFrame(id3); };
  }, []);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px", padding:"24px", background:"#111" }}>
      <CoverCommerciale tipo="essere" />
      <NuoveIniziativePage pageNum="02" />
      <ServiziDisponibiliPage pageNum="03" />
      <QuestionarioPage pageNum="04" />
      <ScadenzaServiziPage pageNum="05" />
      <AziendaFooterPage pageNum="06" />
    </div>
  );
}

/* ─── PDF GENERATOR (riusabile per entrambe le brochure) ────────────────── */
const PDF_COLOR_PATCH_CSS = `
  :root { --foreground:#252525;--card-foreground:#252525;--popover:#ffffff;--popover-foreground:#252525;--primary-foreground:#ffffff;--secondary:#eff1f4;--ring:#b3b3b3; }
  .dark { --background:#252525;--foreground:#fafafa;--card:#252525;--card-foreground:#fafafa;--popover:#252525;--popover-foreground:#fafafa;--primary:#fafafa;--primary-foreground:#333333;--secondary:#454545;--secondary-foreground:#fafafa;--muted:#454545;--muted-foreground:#b3b3b3;--accent:#454545;--accent-foreground:#fafafa;--destructive:#8f3232;--destructive-foreground:#d66d6d;--border:#454545;--input:#454545;--ring:#707070; }
`;

function fixPills(container: HTMLElement) {
  container.querySelectorAll<HTMLElement>(".pdf-fix-pill").forEach((el) => {
    el.style.alignItems = "center";
    el.style.lineHeight = "1";
    el.style.border = "none";
    el.style.background = "transparent";
    el.style.boxShadow = "none";
  });
}

async function generatePdf(PagesComponent: React.FC<{ onReady?: () => void }>, filename: string): Promise<void> {
  const patch = document.createElement("style");
  patch.setAttribute("data-pdf-color-patch", "true");
  patch.textContent = PDF_COLOR_PATCH_CSS;
  document.head.appendChild(patch);

  const stage = document.createElement("div");
  stage.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;background:#000;";
  document.body.appendChild(stage);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const root = createRoot(stage);

  try {
    await new Promise<void>((resolve) => { root.render(<PagesComponent onReady={resolve} />); });

    if ("fonts" in document) await (document as Document & { fonts: FontFaceSet }).fonts.ready;
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    if ("fonts" in document) await (document as Document & { fonts: FontFaceSet }).fonts.ready;

    const pages = Array.from(stage.querySelectorAll<HTMLElement>(".brochure-page"));
    if (pages.length === 0) throw new Error("Nessuna pagina trovata");

    pages.forEach(fixPills);
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    const renderScale = Math.min(2.2, Math.max(1.8, window.devicePixelRatio || 2));
    const pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4", compress:true });
    pdf.setProperties({ title: filename });

    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const rect = page.getBoundingClientRect();
      const canvas = await html2canvas(page, { scale:renderScale, useCORS:true, allowTaint:false, backgroundColor:"#000000", logging:false, imageTimeout:15000, removeContainer:false, scrollX:0, scrollY:0, width:Math.round(rect.width), height:Math.round(rect.height), windowWidth:Math.round(rect.width), windowHeight:Math.round(rect.height) });
      if (i > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pw, ph, undefined, "FAST");
    }

    const blob = pdf.output("blob");
    const file = new File([blob], `${filename}.pdf`, { type:"application/pdf" });
    const url = URL.createObjectURL(file);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
      const a = document.createElement("a");
      a.href = url; a.download = `${filename}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      return;
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } finally {
    patch.remove();
    root.unmount();
    stage.remove();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORTED PAGE COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */
function BrochureShell({ tipo }: { tipo: "nuovi" | "essere" }) {
  const [isExporting, setIsExporting] = useState(false);
  const ref = useRef(false);

  const isEssere = tipo === "essere";
  const filename = isEssere ? "Denani Brochure - Clienti in essere" : "Denani Brochure - Nuovi clienti";
  const PagesComp = isEssere ? ClientiEsserePages : NuoviClientiPages;

  const handlePdf = async () => {
    if (ref.current) return;
    ref.current = true;
    setIsExporting(true);
    try {
      await generatePdf(PagesComp, filename);
    } catch (e) {
      console.error(e);
      alert("Errore durante la generazione del PDF. Riprova.");
    } finally {
      ref.current = false;
      setIsExporting(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#111; }
        .brochure-page { box-shadow:0 8px 48px rgba(0,0,0,0.7); }
        @media print {
          * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
          @page { size:A4; margin:0; }
          body { background:#000 !important; }
          .brochure-wrapper { gap:0 !important; padding:0 !important; }
          .brochure-page { box-shadow:none !important; page-break-after:always !important; break-after:page !important; }
          .brochure-page:last-child { page-break-after:auto !important; break-after:auto !important; }
          .no-print { display:none !important; }
        }
      `}</style>

      <div className="no-print" style={{ position:"fixed", top:"16px", left:"16px", zIndex:999, display:"flex", gap:"8px" }}>
        <button onClick={() => window.print()} style={{ background:"rgba(0,0,0,0.85)", border:`1px solid ${A}`, color:A, fontFamily:F, fontSize:"0.8rem", fontWeight:700, padding:"8px 16px", borderRadius:"6px", cursor:"pointer" }}>
          Stampa
        </button>
        <button onClick={handlePdf} disabled={isExporting} style={{ background:A, border:"none", color:"#000", fontFamily:F, fontSize:"0.8rem", fontWeight:700, padding:"8px 16px", borderRadius:"6px", cursor:"pointer" }}>
          {isExporting ? "Generazione PDF..." : "Salva PDF"}
        </button>
      </div>

      <div className="brochure-wrapper" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px", padding:"24px" }}>
        {isEssere ? (
          <>
            <CoverCommerciale tipo="essere" />
            <NuoveIniziativePage pageNum="02" />
            <ServiziDisponibiliPage pageNum="03" />
            <QuestionarioPage pageNum="04" />
            <ScadenzaServiziPage pageNum="05" />
            <AziendaFooterPage pageNum="06" />
          </>
        ) : (
          <>
            <CoverCommerciale tipo="nuovi" />
            <NuoveIniziativePage pageNum="02" />
            <ServiziDisponibiliPage pageNum="03" />
            <QuestionarioPage pageNum="04" />
            <AziendaFooterPage pageNum="05" />
          </>
        )}
      </div>
    </>
  );
}

export function BrochureNuoviClienti() {
  return <BrochureShell tipo="nuovi" />;
}

export function BrochureClientiEssere() {
  return <BrochureShell tipo="essere" />;
}
