import { useScroll, useSpring, motion } from "motion/react";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { PremessaSection } from "./components/PremessaSection";
import { ServiziSection } from "./components/ServiziSection";
import { PacchettiSection } from "./components/PacchettiSection";
import { ModuliSection } from "./components/ModuliSection";
import { FooterSection } from "./components/FooterSection";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div style={{ background: "#000000", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "#66F2DF",
          zIndex: 100,
          boxShadow: "0 0 12px rgba(102,242,223,0.6)",
        }}
      />
      <NavBar />
      <HeroSection />
      <PremessaSection />
      <ServiziSection />
      <PacchettiSection />
      <ModuliSection />
      <FooterSection />
    </div>
  );
}
