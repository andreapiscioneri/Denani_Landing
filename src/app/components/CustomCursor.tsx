import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const ACCENT = "#66F2DF";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotX   = useMotionValue(-100);
  const dotY   = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 });

  const isPointer = useRef(false);
  const ringScale = useMotionValue(1);
  const ringScaleSpring = useSpring(ringScale, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const checkPointer = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const cursor = el ? getComputedStyle(el).cursor : "default";
      const hovering = cursor === "pointer" || cursor === "text";
      if (hovering !== isPointer.current) {
        isPointer.current = hovering;
        ringScale.set(hovering ? 1.6 : 1);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkPointer);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkPointer);
    };
  }, [mouseX, mouseY, dotX, dotY, ringScale]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot — segue il mouse esattamente */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 99999,
          pointerEvents: "none",
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          width: "6px", height: "6px", borderRadius: "50%",
          background: ACCENT,
        }}
      />

      {/* Ring — segue con spring */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 99998,
          pointerEvents: "none",
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          width: "32px", height: "32px", borderRadius: "50%",
          border: `1.5px solid ${ACCENT}`,
          scale: ringScaleSpring,
          opacity: 0.75,
        }}
      />
    </>
  );
}
