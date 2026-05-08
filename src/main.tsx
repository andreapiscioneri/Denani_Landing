import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrochurePage } from "./app/components/BrochurePage.tsx";
import { BrochureNuoviClienti, BrochureClientiEssere } from "./app/components/BrochureCommerciale.tsx";
import { LandingNuoviClienti, LandingClientiEssere } from "./app/components/LandingCommerciale.tsx";
import { NotFound } from "./app/components/NotFound.tsx";
import "./styles/index.css";

const path = window.location.pathname.replace(/\/$/, "");
const searchParams = new URLSearchParams(window.location.search);

// ── PDF / stamp brochure (A4) ──────────────────────────────────────────────
const isBrochure =
  path === "/Denani-brochure" ||
  path === "/brochure" ||
  searchParams.get("brochure") === "1" ||
  window.location.hash === "#brochure";

const isBrochureNuovi  = path === "/brochure-nuovi-clienti"  || searchParams.get("brochure") === "nuovi";
const isBrochureEssere = path === "/brochure-clienti-essere" || searchParams.get("brochure") === "essere";

// ── Landing page web ───────────────────────────────────────────────────────
const isLandingNuovi  = path === "/nuovi-clienti"    || searchParams.get("landing") === "nuovi";
const isLandingEssere = path === "/clienti-in-essere" || searchParams.get("landing") === "essere";

const knownPaths = ["", "/", "/nuovi-clienti", "/clienti-in-essere", "/brochure-nuovi-clienti", "/brochure-clienti-essere", "/Denani-brochure", "/brochure"];
const is404 = !knownPaths.includes(path) && !searchParams.get("brochure") && !searchParams.get("landing");

if (isBrochure) {
  document.title = "Denani Brochure";
  const url = new URL(window.location.href);
  if (url.searchParams.get("brochure") === "1") {
    url.searchParams.delete("brochure");
    if (url.pathname === "/") url.pathname = "/Denani-brochure";
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }
}
if (isBrochureNuovi)  document.title = "Denani — Brochure Nuovi clienti (PDF)";
if (isBrochureEssere) document.title = "Denani — Brochure Clienti in essere (PDF)";
if (isLandingNuovi)   document.title = "DeNani — Nuovi clienti";
if (isLandingEssere)  document.title = "DeNani — Clienti in essere";

const root = document.getElementById("root")!;

if (is404) {
  document.title = "404 — DeNani";
  createRoot(root).render(<NotFound />);
} else if (isLandingNuovi) {
  createRoot(root).render(<LandingNuoviClienti />);
} else if (isLandingEssere) {
  createRoot(root).render(<LandingClientiEssere />);
} else if (isBrochureNuovi) {
  createRoot(root).render(<BrochureNuoviClienti />);
} else if (isBrochureEssere) {
  createRoot(root).render(<BrochureClientiEssere />);
} else {
  createRoot(root).render(isBrochure ? <BrochurePage /> : <App />);
}