import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgb(102, 242, 223)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <motion.img
            src="/logo.webp"
            alt="DeNani"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            style={{ height: "52px", width: "auto", filter: "brightness(0)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
