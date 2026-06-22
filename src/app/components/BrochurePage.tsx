import logoImg from "../../imports/STICKY-LOGO3.png";
import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – @types/react-dom not installed
import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Shield, Headphones, GraduationCap, Layers, Server,
  Target, RefreshCw, ShieldAlert, Zap, AlertTriangle, Lock, TrendingDown, FileX,
  Check,
} from "lucide-react";

const A = "#66F2DF";
const BG = "#000000";
const BG2 = "#060606";
const T = "rgb(219, 219, 219)";
const W = "#FFFFFF";
const F = "'Roboto', sans-serif";
const CB = "rgba(102,242,223,0.18)";
const CBG = "rgba(102,242,223,0.04)";
const GRID_BG = `linear-gradient(rgba(102,242,223,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(102,242,223,0.06) 1px,transparent 1px)`;

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const servizi = [
  { icon: <Shield size={20} color={A} />,       num: "01", titolo: "Manutenzione Tecnica",     desc: "Aggiornamenti PHP e plug-in, monitoraggio funzionalità, verifica compatibilità tra componenti. Garanzia di stabilità e sicurezza continuativa.", tag: ["Stabilità","Sicurezza","Monitoraggio"] },
  { icon: <Headphones size={20} color={A} />,   num: "02", titolo: "Supporto & Assistenza",    desc: "Interventi su richiesta per correzioni tecniche e aggiornamenti contenuti. Risposta rapida e gestione delle problematiche operative quotidiane.", tag: ["Su Richiesta","Correzioni","Contenuti"] },
  { icon: <GraduationCap size={20} color={A}/>, num: "03", titolo: "Formazione Operativa",     desc: "Sessioni di formazione per la gestione autonoma del sito, aggiornamento contenuti e utilizzo efficace degli strumenti interni.", tag: ["CMS","Autonomia","Training"] },
  { icon: <Layers size={20} color={A} />,       num: "04", titolo: "Evoluzione & Restyling",   desc: "Aggiornamento grafico UX/UI, miglioramento delle performance, revisione della struttura per mantenere il sito moderno e competitivo.", tag: ["UX/UI","Performance","Design"] },
  { icon: <Server size={20} color={A} />,       num: "05", titolo: "Gestione Infrastruttura",  desc: "Verifica e supporto completo su hosting, dominio e configurazioni tecniche. Ottimizzazione dell'infrastruttura per massima efficienza.", tag: ["Hosting","Dominio","Config"] },
];

const pacchetti = [
  { id:"base",    label:"Base",    titolo:"Pacchetto Base",    sub:"Hosting & Dominio",        prezzo:400, featured:false, features:["Hosting incluso","Gestione e rinnovo dominio","Aggiornamenti tecnici periodici","Monitoraggio funzionalità sito","Verifica sicurezza e vulnerabilità","Report mensile dello stato"] },
  { id:"plus",    label:"Plus",    titolo:"Pacchetto Plus",    sub:"Hosting, Dominio & Manutenzione", prezzo:490, featured:true,  features:["Tutto il Pacchetto Base incluso","Manutenzione tecnica mensile","Ore di assistenza incluse/mese","Supporto prioritario dedicato","Correzioni tecniche su richiesta","Aggiornamento contenuti editoriali"] },
  { id:"premium", label:"Premium", titolo:"Pacchetto Premium", sub:"Gestione Completa + SEO/GEO/AIO",  prezzo:580, featured:false, features:["Tutto il Pacchetto Plus incluso","Ottimizzazione SEO/GEO/AIO","Monitoraggio avanzato 24/7","Consulenza evolutiva strategica","Analisi performance e UX","Report avanzato e KPI tracking"] },
];

/* ─── SHARED HELPERS ────────────────────────────────────────────────────── */
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

/* ─── PIE DI PAGINA (appare su ogni foglio) ─────────────────────────────── */
function PageFooter() {
  return (
    <div style={{
      borderTop:`1px solid rgba(102,242,223,0.12)`,
      paddingTop:"4mm",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"flex-start",
      flexShrink:0,
    }}>
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

/* ─── INTESTAZIONE DI PAGINA ────────────────────────────────────────────── */
function PageHeader({ title }: { title: string }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:"5mm", borderBottom:`1px solid rgba(102,242,223,0.1)`, marginBottom:"5mm", flexShrink:0 }}>
      <img src={logoImg} alt="DeNani" style={{ height:"20px", width:"auto", opacity:0.8 }} />
      <span style={{ color:A, fontFamily:F, fontSize:"0.55rem", letterSpacing:"0.14em", textTransform:"uppercase" }}>{title}</span>
    </div>
  );
}

/* ─── A4 PAGE SHELL ─────────────────────────────────────────────────────── */
function Page({ children, bg = BG, header }: { children: React.ReactNode; bg?: string; header: string }) {
  return (
    <div
      className="brochure-page"
      style={{
        width:"210mm", height:"297mm",
        background:bg,
        backgroundImage: GRID_BG,
        backgroundSize:"72px 72px",
        position:"relative", overflow:"hidden",
        boxSizing:"border-box",
        display:"flex", flexDirection:"column",
          padding:"10mm 13mm 9mm",
      }}
    >
      {/* Content */}
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
        <PageHeader title={header} />
        {/* Page body */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
          {children}
        </div>
        <PageFooter />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 1 – COVER
═══════════════════════════════════════════════════════════════════════════ */
function CoverPage() {
  return (
    <div
      className="brochure-page"
      style={{
        width:"210mm", height:"297mm",
        background:BG2,
        backgroundImage: GRID_BG,
        backgroundSize:"72px 72px",
        position:"relative", overflow:"hidden",
        boxSizing:"border-box",
        display:"flex", flexDirection:"column",
        padding:"10mm 13mm 9mm",
        pageBreakAfter:"always", breakAfter:"page",
      }}
    >
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column" }}>

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:"6mm", borderBottom:`1px solid rgba(102,242,223,0.12)`, marginBottom:"0", flexShrink:0 }}>
          <img src={logoImg} alt="DeNani S.r.l." style={{ height:"32px", width:"auto" }} />
          <span style={{ color:A, fontFamily:F, fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase" }}>Web Management &amp; Manutenzione</span>
        </div>

        {/* Hero — fills remaining space */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", padding:"0 6mm" }}>
          <div style={{ marginBottom:"5mm", textAlign:"center" }}>
            <img src={logoImg} alt="DeNani S.r.l." style={{ height:"24px", width:"auto", margin:"0 auto 3mm" }} />
            <div style={{ width:"42mm", height:"1px", background:`linear-gradient(90deg,transparent,${A},transparent)`, margin:"0 auto" }} />
          </div>
          <div className="pdf-fix-pill" style={{ display:"inline-flex", alignItems:"center", alignSelf:"center", width:"fit-content", height:"24px", padding:"0 16px", border:`1px solid ${A}`, borderRadius:"999px", color:A, fontFamily:F, fontSize:"0.58rem", letterSpacing:"0.14em", lineHeight:"1", textTransform:"uppercase", whiteSpace:"nowrap", textAlign:"center", background:"transparent", marginBottom:"6mm" }}>
            Digital Agency · Web Management
          </div>
          <h1 style={{ color:W, fontFamily:F, fontSize:"3rem", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.02em", marginBottom:"5mm" }}>
            <span style={{ color:A }}>Il tuo sito web sempre</span><br />operativo e aggiornato
          </h1>
          <p style={{ color:T, fontFamily:F, fontSize:"0.88rem", lineHeight:1.75, maxWidth:"115mm", marginBottom:"8mm" }}>
            Manutenzione tecnica, supporto continuativo ed evoluzione del tuo asset digitale. Affidati a chi conosce il codice dietro al tuo business.
          </p>
          <div style={{ width:"28mm", height:"1px", background:`linear-gradient(90deg,transparent,${A},transparent)`, marginBottom:"8mm" }} />
          <div style={{ display:"flex", gap:"16mm" }}>
            {[{v:"5+",l:"Anni di esperienza"},{v:"100%",l:"Supporto dedicato"},{v:"24/7",l:"Monitoraggio"}].map(s => (
              <div key={s.l} style={{ textAlign:"center" }}>
                <p style={{ color:A, fontFamily:F, fontSize:"2rem", fontWeight:700, lineHeight:1, marginBottom:"4px" }}>{s.v}</p>
                <p style={{ color:T, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pie di pagina cover */}
        <PageFooter />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 2 – PREMESSA
═══════════════════════════════════════════════════════════════════════════ */
function PremessaPage() {
  return (
    <Page header="Premessa &amp; Contesto — 02" bg={BG2}>
      <SectionLabel>Premessa &amp; Contesto</SectionLabel>
      <H2>Perché la manutenzione è <span style={{ color:A }}>essenziale</span></H2>
      <AccentLine />

      {/* 2 blocks */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5mm", marginBottom:"3.5mm", flexShrink:0 }}>
        {[
          { tag:"01", title:"Obiettivi del Contratto", items:[
            {icon:<Target size={13} color={A}/>,      l:"Continuità operativa del sito"},
            {icon:<RefreshCw size={13} color={A}/>,   l:"Adeguamento tecnologico costante"},
            {icon:<Lock size={13} color={A}/>,        l:"Sicurezza dati e infrastrutture"},
            {icon:<Zap size={13} color={A}/>,         l:"Supporto evolutivo nel tempo"},
          ]},
          { tag:"02", title:"Perché Aggiornare Adesso", items:[
            {icon:<RefreshCw size={13} color={A}/>,   l:"Linguaggi di programmazione (PHP)"},
            {icon:<Zap size={13} color={A}/>,         l:"Aggiornamento plug-in e dipendenze"},
            {icon:<ShieldAlert size={13} color={A}/>, l:"Normative GDPR e privacy"},
            {icon:<Lock size={13} color={A}/>,        l:"Sicurezza informatica aggiornata"},
          ]},
        ].map(b => (
          <div key={b.tag} style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"5mm 6mm" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3.5mm" }}>
              <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", opacity:0.6, letterSpacing:"0.1em" }}>{b.tag}</span>
              <div style={{ flex:1, height:"1px", background:"rgba(102,242,223,0.18)" }} />
            </div>
            <h3 style={{ color:W, fontFamily:F, fontSize:"0.88rem", fontWeight:700, marginBottom:"3.5mm" }}>{b.title}</h3>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"5px" }}>
              {b.items.map((item,i) => (
                <li key={i} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <span style={{ flexShrink:0 }}>{item.icon}</span>
                  <span style={{ color:T, fontFamily:F, fontSize:"0.78rem" }}>{item.l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Risks */}
      <div style={{ border:`1px solid rgba(102,242,223,0.28)`, background:"rgba(102,242,223,0.04)", borderRadius:"8px", padding:"5mm 6mm", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3.5mm" }}>
          <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", opacity:0.6, letterSpacing:"0.1em" }}>03</span>
          <div style={{ flex:1, height:"1px", background:"rgba(102,242,223,0.18)" }} />
        </div>
        <h3 style={{ color:W, fontFamily:F, fontSize:"0.88rem", fontWeight:700, marginBottom:"4mm" }}>Rischi in Assenza di Manutenzione</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"3.5mm", alignItems:"start" }}>
          {[
            {icon:<AlertTriangle size={18} color={A}/>, l:"Malfunzionamenti e downtime",   d:"Interruzioni operative con impatto diretto sul business."},
            {icon:<ShieldAlert size={18} color={A}/>,   l:"Vulnerabilità di sicurezza",     d:"Attacchi informatici, data breach e compromissione del sistema."},
            {icon:<TrendingDown size={18} color={A}/>,  l:"Perdita di performance",         d:"Rallentamenti, indicizzazione ridotta, peggioramento UX."},
            {icon:<FileX size={18} color={A}/>,         l:"Non conformità normativa",       d:"Rischio sanzioni per mancato rispetto GDPR e normative vigenti."},
          ].map((r,i) => (
            <div key={i} style={{ background:"rgba(0,0,0,0.45)", border:"1px solid rgba(102,242,223,0.1)", borderRadius:"6px", padding:"4mm", display:"flex", flexDirection:"column", gap:"5px" }}>
              {r.icon}
              <p style={{ color:W, fontFamily:F, fontSize:"0.76rem", fontWeight:600, lineHeight:1.3 }}>{r.l}</p>
              <p style={{ color:T, fontFamily:F, fontSize:"0.66rem", lineHeight:1.55 }}>{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 3 – SERVIZI (righe orizzontali, card a tutta larghezza)
═══════════════════════════════════════════════════════════════════════════ */
function ServiziPage() {
  return (
    <Page header="Servizi Proposti — 03" bg={BG2}>
      <SectionLabel>Servizi Proposti</SectionLabel>
      <H2>Tutto ciò di cui il tuo sito <span style={{ color:A }}>ha bisogno</span></H2>
      <AccentLine />

      <div style={{ display:"flex", flexDirection:"column", gap:"2.5mm", flex:1 }}>
        {servizi.map((s, i) => (
          <div key={s.num} style={{
            border:`1px solid ${CB}`,
            background: i % 2 === 0 ? CBG : "rgba(102,242,223,0.015)",
            borderRadius:"8px",
            padding:"4mm 5.5mm",
            display:"grid",
            gridTemplateColumns:"8mm 54mm 1fr auto",
            gap:"4mm",
            alignItems:"center",
            flex:1,
          }}>
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
   PAGE 4 – PACCHETTI
═══════════════════════════════════════════════════════════════════════════ */
function PacchettiPage() {
  return (
    <Page header="Listino Pacchetti — 04" bg={BG2}>
      <div style={{ textAlign:"center", marginBottom:"4mm", flexShrink:0 }}>
        <SectionLabel>Listino Pacchetti</SectionLabel>
        <H2>Scegli il piano <span style={{ color:A }}>più adatto</span></H2>
        <p style={{ color:T, fontFamily:F, fontSize:"0.78rem", lineHeight:1.6, marginTop:"-2mm" }}>
          Tre livelli di servizio pensati per far crescere la tua azienda.
        </p>
      </div>
      <AccentLine />

      {/* Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"4mm", alignItems:"start" }}>
        {pacchetti.map(p => (
          <div key={p.id} style={{
            border: p.featured ? `1.5px solid ${A}` : `1px solid ${CB}`,
            background: CBG,
            borderRadius:"10px",
            padding:"5.5mm",
            display:"flex",
            flexDirection:"column",
            position:"relative",
            boxShadow:"none",
          }}>
            <span className="pdf-fix-pill" style={{ display:"inline-flex", alignItems:"center", height:"18px", padding:"0 10px", borderRadius:"999px", color:A, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.12em", lineHeight:"1", textTransform:"uppercase", textAlign:"center", background:"transparent", border:`1px solid rgba(102,242,223,0.28)`, marginBottom:"3.5mm", alignSelf:"flex-start", whiteSpace:"nowrap" }}>
              {p.label}
            </span>
            <h3 style={{ color:W, fontFamily:F, fontSize:"0.98rem", fontWeight:700, marginBottom:"1.5px" }}>{p.titolo}</h3>
            <p style={{ color:A, fontFamily:F, fontSize:"0.72rem", marginBottom:"3.5mm" }}>{p.sub}</p>
            <div style={{ borderBottom:"1px solid rgba(102,242,223,0.12)", paddingBottom:"3.5mm", marginBottom:"3.5mm" }}>
              <span style={{ color:T, fontFamily:F, fontSize:"0.68rem" }}>Canone mensile</span>
              <div style={{ color:A, fontFamily:F, fontSize:"1.25rem", fontWeight:700, marginTop:"2px" }}>€ {p.prezzo}{" "}<span style={{ fontSize:"0.72rem", fontWeight:400, opacity:0.7 }}>/ mese</span></div>
            </div>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"4px" }}>
              {p.features.map((f,i) => (
                <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:"5px" }}>
                  <Check size={11} color={A} style={{ marginTop:"2px", flexShrink:0 }} />
                  <span style={{ color:T, fontFamily:F, fontSize:"0.7rem", lineHeight:1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ color:T, fontFamily:F, fontSize:"0.63rem", textAlign:"center", marginTop:"3mm", flexShrink:0 }}>
        * I prezzi verranno definiti in base alle specifiche esigenze del progetto. Contattaci per un preventivo personalizzato.
      </p>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 5 – MODULI + FOOTER AZIENDALE
════════════════════════════════��══════════════════════════════════════════ */
function ModuliPage() {
  return (
    <Page header="Moduli Aggiuntivi — 05" bg={BG2}>
      <SectionLabel>Moduli Aggiuntivi</SectionLabel>
      <H2>Espandi il tuo <span style={{ color:A }}>piano di servizio</span></H2>
      <AccentLine />

      {/* Rimando al sito per personalizzazioni */}
      <div style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"7mm", marginBottom:"4mm", textAlign:"center" }}>
        <p style={{ color:T, fontFamily:F, fontSize:"0.78rem", lineHeight:1.7, margin:0 }}>
          Per ulteriori moduli, aggiunte e personalizzazioni del piano, visita{" "}
          <span style={{ color:A, fontWeight:600 }}>denani.it/pacchetti</span>
        </p>
      </div>

      {/* Footer aziendale — spinto in fondo con margin-top:auto */}
      <div style={{ marginTop:"auto" }}>
        <div style={{ borderTop:`1px solid rgba(102,242,223,0.15)`, paddingTop:"4mm", display:"grid", gridTemplateColumns:"1.2fr 1fr 1.15fr 1fr", gap:"5mm", marginBottom:"4mm" }}>
          {/* Brand */}
          <div>
            <img src={logoImg} alt="DeNani S.r.l." style={{ height:"24px", width:"auto", marginBottom:"3.5mm" }} />
            <p style={{ color:T, fontFamily:F, fontSize:"0.65rem", lineHeight:1.75 }}>Digitalizza<br />La tua immagine<br />La tua comunicazione<br />La tua produzione</p>
          </div>
          {/* Contatti */}
          <div>
            <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Contatti</p>
            <div style={{ marginBottom:"4px" }}>
              <span style={{ color:T, fontFamily:F, fontSize:"0.66rem" }}>support@denani.it</span>
            </div>
            <div>
              <span style={{ color:T, fontFamily:F, fontSize:"0.66rem" }}>denani@pec.it</span>
            </div>
          </div>
          {/* Sedi */}
          <div>
            <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Sedi</p>
            <div style={{ marginBottom:"3.5mm" }}>
              <p style={{ color:A, fontFamily:F, fontSize:"0.54rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"1.5px" }}>Sede Legale</p>
              <p style={{ color:T, fontFamily:F, fontSize:"0.65rem", lineHeight:1.5, margin:0 }}>Via Camozzi 1/C – 24027 Nembro (BG)</p>
            </div>
            <div>
              <p style={{ color:A, fontFamily:F, fontSize:"0.54rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"1.5px" }}>Sede Operativa</p>
              <p style={{ color:T, fontFamily:F, fontSize:"0.65rem", lineHeight:1.5, margin:0 }}>Via Galimberti 6A – 24124 Bergamo</p>
            </div>
          </div>
          {/* Dati aziendali */}
          <div>
            <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Info Azienda</p>
            {[{label:"P.I/CF",value:"04432260166"},{label:"REA",value:"BG-462479"},{label:"Cap. Sociale",value:"€ 12.500,00 i.v."}].map(item => (
              <div key={item.label} style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" }}>{item.label}</span>
                <span style={{ color:T, fontFamily:F, fontSize:"0.65rem" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BROCHURE PAGES (no controls – used by generateBrochurePdf)
═══════════════════════════════════════════════════════════════════════════ */
function BrochurePages({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    // Wait 3 frames after DOM commit to ensure fonts + layout are stable
    let id1: number, id2: number, id3: number;
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => {
        id3 = requestAnimationFrame(() => onReady?.());
      });
    });
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); cancelAnimationFrame(id3); };
  }, []);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px", padding:"24px", background:"#111" }}>
      <CoverPage />
      <PremessaPage />
      <ServiziPage />
      <PacchettiPage />
      <ModuliPage />
    </div>
  );
}

/* ─── CSS VAR PATCH applied during pdf capture ──────────────────────────── */
const PDF_COLOR_PATCH_CSS = `
  :root {
    --foreground:#252525;--card-foreground:#252525;--popover:#ffffff;
    --popover-foreground:#252525;--primary-foreground:#ffffff;
    --secondary:#eff1f4;--ring:#b3b3b3;
  }
  .dark {
    --background:#252525;--foreground:#fafafa;--card:#252525;
    --card-foreground:#fafafa;--popover:#252525;--popover-foreground:#fafafa;
    --primary:#fafafa;--primary-foreground:#333333;--secondary:#454545;
    --secondary-foreground:#fafafa;--muted:#454545;--muted-foreground:#b3b3b3;
    --accent:#454545;--accent-foreground:#fafafa;--destructive:#8f3232;
    --destructive-foreground:#d66d6d;--border:#454545;--input:#454545;
    --ring:#707070;
  }
`;

function fixPills(container: HTMLElement) {
  // Pills are already defined with inline-flex + alignItems in the JSX.
  // This is a safeguard pass to ensure lineHeight is correct before html2canvas capture.
  container.querySelectorAll<HTMLElement>(".pdf-fix-pill").forEach((el) => {
    el.style.alignItems = "center";
    el.style.lineHeight = "1";
    el.style.border = "none";
    el.style.background = "transparent";
    el.style.boxShadow = "none";
  });
}

/* ─── EXPORTED PDF GENERATOR ────────────────────────────────────────────── */
export async function generateBrochurePdf(): Promise<void> {
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
    // Render pages and wait for mount
    await new Promise<void>((resolve) => {
      root.render(<BrochurePages onReady={resolve} />);
    });

    // Wait for fonts
    if ("fonts" in document) {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
    }
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    if ("fonts" in document) {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
    }

    const pages = Array.from(stage.querySelectorAll<HTMLElement>(".brochure-page"));
    if (pages.length === 0) throw new Error("Nessuna pagina brochure trovata");

    // Fix pills on every page before capture
    pages.forEach(fixPills);
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    const renderScale = Math.min(2.2, Math.max(1.8, window.devicePixelRatio || 2));
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    pdf.setProperties({ title: "Denani Brochure website" });

    const pageWidth  = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const rect = page.getBoundingClientRect();
      const width  = Math.round(rect.width);
      const height = Math.round(rect.height);

      const canvas = await html2canvas(page, {
        scale: renderScale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#000000",
        logging: false,
        imageTimeout: 15000,
        removeContainer: false,
        scrollX: 0,
        scrollY: 0,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
      });

      if (i > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
    }

    const blob = pdf.output("blob");
    const namedPdfFile = new File([blob], "Denani Brochure website.pdf", { type: "application/pdf" });
    const url = URL.createObjectURL(namedPdfFile);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
      // Fallback: if popup is blocked, trigger a direct file download.
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "Denani Brochure website.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      return;
    }

    const applyWindowTitle = () => {
      try {
        win.document.title = "Denani Brochure website";
      } catch {
        // Some browsers lock title access for PDF viewer contexts.
      }
    };

    try {
      if (win.document.readyState === "complete") {
        applyWindowTitle();
      } else {
        win.addEventListener("load", applyWindowTitle, { once: true });
      }
    } catch {
      // Best effort only: PDF may already be open even if the viewer context is locked.
    }

    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } finally {
    patch.remove();
    root.unmount();
    stage.remove();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export function BrochurePage() {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const isExportingPdfRef = useRef(false);

  const handleSavePdf = async () => {
    if (isExportingPdfRef.current) return;
    isExportingPdfRef.current = true;
    setIsExportingPdf(true);
    try {
      await generateBrochurePdf();
    } catch (error) {
      console.error("Errore durante il salvataggio PDF:", error);
      const details = error instanceof Error ? `\nDettagli: ${error.message}` : "";
      alert(`Non sono riuscito a generare il PDF. Riprova tra qualche secondo.${details}`);
    } finally {
      isExportingPdfRef.current = false;
      setIsExportingPdf(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #111; }

        .brochure-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 24px;
        }
        .brochure-page { box-shadow: 0 8px 48px rgba(0,0,0,0.7); }

        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          @page { size: A4; margin: 0; }
          body { background: #000 !important; }
          .brochure-wrapper { gap: 0 !important; padding: 0 !important; }
          .brochure-page { box-shadow: none !important; page-break-after: always !important; break-after: page !important; }
          .brochure-page:last-child { page-break-after: auto !important; break-after: auto !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Controls */}
      <div className="no-print" style={{ position:"fixed", top:"16px", left:"16px", zIndex:999, display:"flex", gap:"8px" }}>
        <button
          onClick={() => window.print()}
          style={{ background:"rgba(0,0,0,0.85)", border:`1px solid ${A}`, color:A, fontFamily:F, fontSize:"0.8rem", fontWeight:700, padding:"8px 16px", borderRadius:"6px", cursor:"pointer" }}
        >
          Stampa
        </button>
        <button
          onClick={handleSavePdf}
          disabled={isExportingPdf}
          style={{ background:A, border:"none", color:"#000", fontFamily:F, fontSize:"0.8rem", fontWeight:700, padding:"8px 16px", borderRadius:"6px", cursor:"pointer" }}
        >
          {isExportingPdf ? "Generazione PDF..." : "Salva PDF"}
        </button>
      </div>

      <div className="brochure-wrapper">
        <CoverPage />
        <PremessaPage />
        <ServiziPage />
        <PacchettiPage />
        <ModuliPage />
      </div>
    </>
  );
}