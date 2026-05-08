import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { FooterSection } from "./components/FooterSection";
import { Loader } from "./components/Loader";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      <Loader onDone={() => setLoaded(true)} />
      <div style={{ background: "#000000", minHeight: "100vh", overflowX: "hidden", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <NavBar />
        <HeroSection />
        <FooterSection />
      </div>
    </>
  );
}
