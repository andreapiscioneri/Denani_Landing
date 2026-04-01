import logoImg from "../../imports/STICKY-LOGO3.png";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Shield, Headphones, GraduationCap, Layers, Server,
  Target, RefreshCw, ShieldAlert, Zap, AlertTriangle, Lock, TrendingDown, FileX,
  Check, Star, Clock, BookOpen, Paintbrush, Globe, Mail, MapPin,
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
  { id:"base",    label:"Base",    titolo:"Pacchetto Base",    sub:"Manutenzione Essenziale", featured:false, features:["Aggiornamenti tecnici periodici","Monitoraggio funzionalità sito","Verifica sicurezza e vulnerabilità","Report mensile dello stato","Aggiornamento PHP e plug-in"] },
  { id:"plus",    label:"Plus",    titolo:"Pacchetto Plus",    sub:"Manutenzione + Supporto",  featured:true,  features:["Tutto il Pacchetto Base incluso","Ore di assistenza incluse/mese","Supporto prioritario dedicato","Correzioni tecniche su richiesta","Aggiornamento contenuti editoriali","Interventi urgenti garantiti"] },
  { id:"premium", label:"Premium", titolo:"Pacchetto Premium", sub:"Gestione Completa",        featured:false, features:["Tutto il Pacchetto Plus incluso","Pacchetto ore ampliato mensile","Monitoraggio avanzato 24/7","Consulenza evolutiva strategica","Analisi performance e UX","Pianificazione roadmap digitale","Report avanzato e KPI tracking"] },
];

const moduli = [
  { icon:<Clock size={20} color={A} />,      label:"A", titolo:"Pacchetti Ore Assistenza",    desc:"Ore aggiuntive dedicabili a interventi migliorativi, sviluppo di nuove funzionalità o risoluzione di problematiche specifiche.", punti:["Interventi migliorativi","Nuove funzionalità","Sviluppo custom"] },
  { icon:<BookOpen size={20} color={A} />,   label:"B", titolo:"Pacchetti Formazione",         desc:"Sessioni formative strutturate per l'utilizzo del CMS e dei tool interni, per raggiungere piena autonomia operativa.", punti:["Utilizzo CMS avanzato","Autonomia operativa","Sessioni personalizzate"] },
  { icon:<Paintbrush size={20} color={A} />, label:"C", titolo:"Restyling Sito",               desc:"Aggiornamento completo dell'immagine grafica, revisione dell'esperienza utente e adeguamento agli standard UX/UI attuali.", punti:["Aggiornamento grafico","Revisione UX/UI","Design moderno"] },
  { icon:<Globe size={20} color={A} />,      label:"D", titolo:"Gestione Hosting & Dominio",   desc:"Ottimizzazione dell'infrastruttura tecnica, gestione del dominio e supporto specializzato su configurazioni server.", punti:["Ottimizzazione infrastruttura","Gestione dominio","Supporto tecnico"] },
];

/* ─── SHARED HELPERS ────────────────────────────────────────────────────── */
const Tag = ({ t }: { t: string }) => (
  <span className="pdf-fix-pill" style={{ border:`1px solid rgba(102,242,223,0.28)`, color:A, fontFamily:F, fontSize:"0.55rem", height:"18px", padding:"0 7px", borderRadius:"3px", letterSpacing:"0.06em", display:"inline-block", lineHeight:"18px", whiteSpace:"nowrap", textAlign:"center" }}>{t}</span>
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
          <div className="pdf-fix-pill" style={{ display:"inline-block", height:"24px", padding:"0 16px", border:`1px solid ${A}`, borderRadius:"999px", color:A, fontFamily:F, fontSize:"0.58rem", letterSpacing:"0.14em", lineHeight:"24px", textTransform:"uppercase", whiteSpace:"nowrap", textAlign:"center", background:"rgba(102,242,223,0.06)", marginBottom:"6mm" }}>
            Agenzia Tech · Web Management
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
            background: p.featured ? "rgba(102,242,223,0.07)" : CBG,
            borderRadius:"10px",
            padding:"5.5mm",
            display:"flex",
            flexDirection:"column",
            position:"relative",
            boxShadow: p.featured ? `0 0 24px rgba(102,242,223,0.12)` : "none",
          }}>
            {p.featured && (
              <div style={{ position:"absolute", top:"-11px", left:"50%", transform:"translateX(-50%)", background:A, color:"#000", fontFamily:F, fontWeight:700, fontSize:"0.56rem", letterSpacing:"0.06em", padding:"0 12px", height:"18px", borderRadius:"999px", display:"inline-flex", alignItems:"center", gap:"4px", lineHeight:"18px", whiteSpace:"nowrap" }}>
                <Star size={8} fill="#000" /> Più Scelto
              </div>
            )}
            <span className="pdf-fix-pill" style={{ display:"inline-block", height:"18px", padding:"0 10px", borderRadius:"999px", color:A, fontFamily:F, fontSize:"0.56rem", letterSpacing:"0.12em", lineHeight:"18px", textTransform:"uppercase", textAlign:"center", background: p.featured ? "rgba(102,242,223,0.18)" : "transparent", border: p.featured ? "none" : `1px solid rgba(102,242,223,0.28)`, marginBottom:"3.5mm", alignSelf:"flex-start", whiteSpace:"nowrap" }}>
              {p.label}
            </span>
            <h3 style={{ color:W, fontFamily:F, fontSize:"0.98rem", fontWeight:700, marginBottom:"1.5px" }}>{p.titolo}</h3>
            <p style={{ color:A, fontFamily:F, fontSize:"0.72rem", marginBottom:"3.5mm" }}>{p.sub}</p>
            <div style={{ borderBottom:"1px solid rgba(102,242,223,0.12)", paddingBottom:"3.5mm", marginBottom:"3.5mm" }}>
              <span style={{ color:T, fontFamily:F, fontSize:"0.68rem" }}>Canone mensile</span>
              <div style={{ color:A, fontFamily:F, fontSize:"1.25rem", fontWeight:700, marginTop:"2px" }}>[Euro]</div>
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
═══════════════════════════════════════════════════════════════════════════ */
function ModuliPage() {
  return (
    <Page header="Moduli Aggiuntivi — 05" bg={BG2}>
      <SectionLabel>Moduli Aggiuntivi</SectionLabel>
      <H2>Espandi il tuo <span style={{ color:A }}>piano di servizio</span></H2>
      <AccentLine />

      {/* Module cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"3.5mm", marginBottom:"4mm", flex:"0 0 auto" }}>
        {moduli.map(m => (
          <div key={m.label} style={{ border:`1px solid ${CB}`, background:CBG, borderRadius:"8px", padding:"4.5mm", display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"3.5mm" }}>
              {m.icon}
              <span className="pdf-fix-pill" style={{ border:`1px solid rgba(102,242,223,0.28)`, color:A, fontFamily:F, fontSize:"0.56rem", height:"20px", padding:"0 8px", borderRadius:"999px", display:"inline-block", lineHeight:"20px", whiteSpace:"nowrap", textAlign:"center" }}>Modulo {m.label}</span>
            </div>
            <h3 style={{ color:W, fontFamily:F, fontSize:"0.8rem", fontWeight:700, lineHeight:1.3, marginBottom:"2.5mm" }}>{m.titolo}</h3>
            <div style={{ borderBottom:"1px solid rgba(102,242,223,0.1)", paddingBottom:"2.5mm", marginBottom:"2.5mm" }}>
              <span style={{ color:T, fontFamily:F, fontSize:"0.56rem", textTransform:"uppercase", letterSpacing:"0.1em", display:"block" }}>A partire da</span>
              <span style={{ color:A, fontFamily:F, fontSize:"0.95rem", fontWeight:700 }}>[EURO]</span>
            </div>
            <p style={{ color:T, fontFamily:F, fontSize:"0.66rem", lineHeight:1.6, flex:1, marginBottom:"2.5mm" }}>{m.desc}</p>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"3px" }}>
              {m.punti.map((p,i) => (
                <li key={i} style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <div style={{ width:"3px", height:"3px", borderRadius:"50%", background:A, flexShrink:0 }} />
                  <span style={{ color:"rgba(102,242,223,0.85)", fontFamily:F, fontSize:"0.62rem" }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
            <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"4px" }}>
              <Mail size={10} color={A} />
              <span style={{ color:T, fontFamily:F, fontSize:"0.66rem" }}>support@denani.it</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
              <span style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:700 }}>PEC</span>
              <span style={{ color:T, fontFamily:F, fontSize:"0.66rem" }}>denani@pec.it</span>
            </div>
          </div>
          {/* Sedi */}
          <div>
            <p style={{ color:A, fontFamily:F, fontSize:"0.56rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"2.5mm" }}>Sedi</p>
            <div style={{ marginBottom:"3.5mm" }}>
              <p style={{ color:A, fontFamily:F, fontSize:"0.54rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"1.5px" }}>Sede Legale</p>
              <div style={{ display:"flex", alignItems:"flex-start", gap:"3px" }}>
                <MapPin size={9} color={A} style={{ marginTop:"1px", flexShrink:0 }} />
                <span style={{ color:T, fontFamily:F, fontSize:"0.65rem", lineHeight:1.5 }}>Via Camozzi 1/C – 24027 Nembro (BG)</span>
              </div>
            </div>
            <div>
              <p style={{ color:A, fontFamily:F, fontSize:"0.54rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"1.5px" }}>Sede Operativa</p>
              <div style={{ display:"flex", alignItems:"flex-start", gap:"3px" }}>
                <MapPin size={9} color={A} style={{ marginTop:"1px", flexShrink:0 }} />
                <span style={{ color:T, fontFamily:F, fontSize:"0.65rem", lineHeight:1.5 }}>Via Galimberti 6A – 24124 Bergamo</span>
              </div>
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
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export function BrochurePage() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const isExportingPdfRef = useRef(false);

  const handleSavePdf = async () => {
    if (!wrapperRef.current || isExportingPdfRef.current) return;

    isExportingPdfRef.current = true;
    setIsExportingPdf(true);
    const pdfColorPatch = document.createElement("style");
    pdfColorPatch.setAttribute("data-pdf-color-patch", "true");
    pdfColorPatch.textContent = `
      :root {
        --foreground: #252525;
        --card-foreground: #252525;
        --popover: #ffffff;
        --popover-foreground: #252525;
        --primary-foreground: #ffffff;
        --secondary: #eff1f4;
        --ring: #b3b3b3;
        --chart-1: #b86f42;
        --chart-2: #3f9a9a;
        --chart-3: #4f617b;
        --chart-4: #d0ab45;
        --chart-5: #d59448;
        --sidebar: #fafafa;
        --sidebar-foreground: #252525;
        --sidebar-primary-foreground: #fafafa;
        --sidebar-accent: #f2f2f2;
        --sidebar-accent-foreground: #333333;
        --sidebar-border: #e6e6e6;
        --sidebar-ring: #b3b3b3;
      }
      .dark {
        --background: #252525;
        --foreground: #fafafa;
        --card: #252525;
        --card-foreground: #fafafa;
        --popover: #252525;
        --popover-foreground: #fafafa;
        --primary: #fafafa;
        --primary-foreground: #333333;
        --secondary: #454545;
        --secondary-foreground: #fafafa;
        --muted: #454545;
        --muted-foreground: #b3b3b3;
        --accent: #454545;
        --accent-foreground: #fafafa;
        --destructive: #8f3232;
        --destructive-foreground: #d66d6d;
        --border: #454545;
        --input: #454545;
        --ring: #707070;
        --chart-1: #4a6eff;
        --chart-2: #5eb9a5;
        --chart-3: #d59448;
        --chart-4: #9d57c4;
        --chart-5: #c75a4d;
        --sidebar: #333333;
        --sidebar-foreground: #fafafa;
        --sidebar-primary: #4a6eff;
        --sidebar-primary-foreground: #fafafa;
        --sidebar-accent: #454545;
        --sidebar-accent-foreground: #fafafa;
        --sidebar-border: #454545;
        --sidebar-ring: #707070;
      }
    `;
    document.head.appendChild(pdfColorPatch);
    try {
      document.title = "Denani Brochure";
      if ("fonts" in document) {
        await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      }
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

      const pages = Array.from(wrapperRef.current.querySelectorAll<HTMLElement>(".brochure-page"));
      if (pages.length === 0) {
        throw new Error("Nessuna pagina brochure trovata");
      }

      const renderScale = Math.min(2.2, Math.max(1.8, window.devicePixelRatio || 2));
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      pdf.setProperties({ title: "Denani Brochure" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i += 1) {
        const sourcePage = pages[i];
        const rect = sourcePage.getBoundingClientRect();
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);

        const stage = document.createElement("div");
        stage.style.position = "fixed";
        stage.style.left = "-10000px";
        stage.style.top = "0";
        stage.style.zIndex = "-1";
        stage.style.padding = "0";
        stage.style.margin = "0";
        stage.style.background = "#000000";

        const pageClone = sourcePage.cloneNode(true) as HTMLElement;
        pageClone.style.margin = "0";
        pageClone.style.transform = "none";
        pageClone.style.boxShadow = "none";
        pageClone.style.width = `${width}px`;
        pageClone.style.height = `${height}px`;

        pageClone.querySelectorAll<HTMLElement>(".pdf-fix-pill").forEach((el) => {
          const h = parseFloat(el.style.height || "0");
          el.style.display = "inline-flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.textAlign = "center";
          el.style.whiteSpace = "nowrap";
          el.style.verticalAlign = "middle";
          el.style.paddingTop = "0";
          el.style.paddingBottom = "0";
          if (h > 0) {
            el.style.lineHeight = `${h}px`;
          }
        });

        stage.appendChild(pageClone);
        document.body.appendChild(stage);
        await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

        const canvas = await html2canvas(pageClone, {
          scale: renderScale,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#000000",
          logging: false,
          imageTimeout: 15000,
          removeContainer: true,
          scrollX: 0,
          scrollY: 0,
          width,
          height,
          windowWidth: width,
          windowHeight: height,
        });

        stage.remove();

        const imageData = canvas.toDataURL("image/png");
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imageData, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
      }

      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const opened = window.open(pdfUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        URL.revokeObjectURL(pdfUrl);
        throw new Error("Popup bloccato dal browser");
      }
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
    } catch (error) {
      console.error("Errore durante il salvataggio PDF:", error);
      const details = error instanceof Error ? `\nDettagli: ${error.message}` : "";
      alert(`Non sono riuscito a generare il PDF. Riprova tra qualche secondo.${details}`);
    } finally {
      pdfColorPatch.remove();
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

      <div ref={wrapperRef} className="brochure-wrapper">
        <CoverPage />
        <PremessaPage />
        <ServiziPage />
        <PacchettiPage />
        <ModuliPage />
      </div>
    </>
  );
}