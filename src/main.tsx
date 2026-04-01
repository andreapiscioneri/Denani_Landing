import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrochurePage } from "./app/components/BrochurePage.tsx";
import "./styles/index.css";

const searchParams = new URLSearchParams(window.location.search);
const isBrochure =
  window.location.pathname === "/brochure" ||
  window.location.pathname === "/brochure/" ||
  searchParams.get("brochure") === "1" ||
  window.location.hash === "#brochure";

createRoot(document.getElementById("root")!).render(
  isBrochure ? <BrochurePage /> : <App />
);