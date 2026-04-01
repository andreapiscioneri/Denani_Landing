import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrochurePage } from "./app/components/BrochurePage.tsx";
import "./styles/index.css";

const searchParams = new URLSearchParams(window.location.search);
const isBrochure =
  window.location.pathname === "/Denani-brochure" ||
  window.location.pathname === "/Denani-brochure/" ||
  window.location.pathname === "/brochure" ||
  window.location.pathname === "/brochure/" ||
  searchParams.get("brochure") === "1" ||
  window.location.hash === "#brochure";

if (isBrochure) {
  document.title = "Denani Brochure";

  const url = new URL(window.location.href);
  if (url.searchParams.get("brochure") === "1") {
    url.searchParams.delete("brochure");
    if (url.pathname === "/") {
      url.pathname = "/Denani-brochure";
    }
    const next = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", next);
  }
}

createRoot(document.getElementById("root")!).render(
  isBrochure ? <BrochurePage /> : <App />
);