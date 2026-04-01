import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import logoImg from "../../imports/STICKY-LOGO3.png";

const ACCENT = "#66F2DF";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + ((i * 5.7 + 3) % 90),
  y: 5 + ((i * 7.3 + 10) % 88),
  size: 1 + (i % 3),
  duration: 9 + (i % 6) * 2,
  delay: (i % 5) * 1.3,
  opacity: 0.12 + (i % 4) * 0.04,
}));

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const controls = animate(0, target, {
            duration: 1.8,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            onUpdate: (v) => setValue(Math.round(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <p
      ref={ref}
      style={{
        color: ACCENT,
        fontFamily: "'Roboto', sans-serif",
        fontSize: "1.6rem",
        fontWeight: 700,
        lineHeight: 1,
        marginBottom: "0.4rem",
      }}
    >
      {value}
      {suffix}
    </p>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.14);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.14);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{ background: "#000000", fontFamily: "'Roboto', sans-serif" }}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 overflow-hidden"
    >
      {/* Background grid */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.14 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(102,242,223,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(102,242,223,0.7) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: ACCENT,
          }}
          animate={{
            y: [0, -24, 0],
            opacity: [p.opacity, p.opacity * 0.25, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse-tracking glow */}
      <motion.div
        className="absolute w-[600px] h-[400px] rounded-full pointer-events-none blur-3xl"
        style={{
          top: "calc(33% - 200px)",
          left: "calc(50% - 300px)",
          x: springX,
          y: springY,
          background: "radial-gradient(ellipse, #66F2DF 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.13, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Logo / Brand */}
      <motion.div
        className="relative z-10 mb-12 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <img
            src={logoImg}
            alt="DeNani S.r.l."
            style={{ height: "52px", width: "auto", objectFit: "contain" }}
          />
        </div>
        <motion.div
          style={{ height: "1px", background: "#66F2DF" }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          className="inline-block px-4 py-1 rounded-full mb-8 text-xs tracking-widest uppercase cursor-default"
          style={{
            border: "1px solid #66F2DF",
            color: ACCENT,
            background: "rgba(102,242,223,0.06)",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.06, backgroundColor: "rgba(102,242,223,0.12)" }}
        >
          Agenzia Tech · Web Management
        </motion.div>

        {/* Main heading */}
        <motion.h1
          style={{
            color: "#FFFFFF",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        >
         <span style={{ color: ACCENT }}> Il tuo sito web{" "}</span>
          <span style={{ color: ACCENT }}>sempre</span>
          <br />
          operativo e aggiornato
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{
            color: "rgb(219, 219, 219)",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            lineHeight: 1.7,
            maxWidth: "640px",
            margin: "0 auto 2.5rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          Manutenzione tecnica, supporto continuativo ed evoluzione del tuo asset digitale.
          Affidati a chi conosce il codice dietro al tuo business.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <motion.a
            href="mailto:support@denani.it"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded"
            style={{
              background: ACCENT,
              color: "#000000",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
            whileHover={{ scale: 1.07, boxShadow: "0 0 40px rgba(102,242,223,0.55)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            Richiedi Preventivo
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "flex" }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.a>
          <motion.a
            href="#servizi"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded"
            style={{
              border: "1px solid rgba(102,242,223,0.35)",
              color: "rgb(219, 219, 219)",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
            whileHover={{
              borderColor: ACCENT,
              color: "#fff",
              backgroundColor: "rgba(102,242,223,0.06)",
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Scopri i Servizi
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-4 sm:gap-6 max-w-xs sm:max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          {[
            { numeric: 5, suffix: "+", label: "Anni esperienza" },
            { numeric: 100, suffix: "%", label: "Supporto dedicato" },
            { numeric: null, display: "24/7", label: "Monitoraggio" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              {stat.numeric !== null ? (
                <CountUp target={stat.numeric} suffix={stat.suffix ?? ""} />
              ) : (
                <p
                  style={{
                    color: ACCENT,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {stat.display}
                </p>
              )}
              <p
                style={{
                  color: "rgb(219, 219, 219)",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span
          style={{
            color: "rgb(219, 219, 219)",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Scorri
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} color="#66F2DF" />
        </motion.div>
      </motion.div>
    </section>
  );
}
