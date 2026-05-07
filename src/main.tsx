import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrochurePage } from "./app/components/BrochurePage.tsx";
import { BrochureNuoviClienti, BrochureClientiEssere } from "./app/components/BrochureCommerciale.tsx";
import "./styles/index.css";

const path = window.location.pathname.replace(/\/$/, "");
const searchParams = new URLSearchParams(window.location.search);

const isBrochure =
  path === "/Denani-brochure" ||
  path === "/brochure" ||
  searchParams.get("brochure") === "1" ||
  window.location.hash === "#brochure";

const isNuoviClienti =
  path === "/brochure-nuovi-clienti" ||
  searchParams.get("brochure") === "nuovi";

const isClientiEssere =
  path === "/brochure-clienti-essere" ||
  searchParams.get("brochure") === "essere";

if (isBrochure) {
  document.title = "Denani Brochure";
  const url = new URL(window.location.href);
  if (url.searchParams.get("brochure") === "1") {
    url.searchParams.delete("brochure");
    if (url.pathname === "/") url.pathname = "/Denani-brochure";
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }
}
if (isNuoviClienti) document.title = "Denani — Brochure Nuovi Clienti";
if (isClientiEssere) document.title = "Denani — Brochure Clienti in Essere";

const root = document.getElementById("root")!;

if (isNuoviClienti) {
  createRoot(root).render(<BrochureNuoviClienti />);
} else if (isClientiEssere) {
  createRoot(root).render(<BrochureClientiEssere />);
} else {
  createRoot(root).render(isBrochure ? <BrochurePage /> : <App />);
}