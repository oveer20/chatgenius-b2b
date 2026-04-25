"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

const AI_RESPONSE =
  "Por supuesto. El Q3 mostró un crecimiento del 34% en ingresos respecto al trimestre anterior, impulsado principalmente por el segmento enterprise (+67%). Los principales desafíos fueron el churn en SMBs (8.2%) y presión en márgenes por costos de infraestructura. Recomiendo focalizar Q4 en retención y expansión de cuentas existentes. ¿Quieres que genere el informe completo con gráficos?";

function TypingIndicator() {
  return (
    <span className="flex gap-1 items-center py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]"
          style={{
            animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const [aiText, setAiText] = useState("");
  const [typing, setTyping] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTyping(false);
      const interval = setInterval(() => {
        if (indexRef.current < AI_RESPONSE.length) {
          setAiText(AI_RESPONSE.slice(0, indexRef.current + 1));
          indexRef.current += 1;
        } else {
          clearInterval(interval);
        }
      }, 18);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 pt-32 pb-20 overflow-hidden">
      {/* Badge */}
      <motion.div {...fadeUp(0.2)}
        className="inline-flex items-center gap-2 border border-[rgba(0,229,160,0.25)]
          bg-[rgba(0,229,160,0.06)] text-[#00e5a0] font-mono text-[11px]
          tracking-[0.08em] px-4 py-1.5 rounded-full mb-10"
      >
        ✦ &nbsp; NUEVO — Modelo v3 disponible &nbsp; ✦
      </motion.div>

      {/* Title */}
      <motion.h1 {...fadeUp(0.4)}
        className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.05]
          tracking-[-0.03em] text-[var(--text-primary)] max-width-[900px] mb-8"
        style={{ maxWidth: "900px" }}
      >
        La IA que hace tu{" "}
        <em className="text-[#00e5a0] not-italic">equipo imparable</em>
      </motion.h1>

      {/* Sub */}
      <motion.p {...fadeUp(0.6)}
        className="text-[clamp(1rem,2vw,1.2rem)] text-[var(--text-secondary)]
          max-w-[560px] leading-[1.7] font-light mb-12"
      >
        ChatGenius automatiza conversaciones, responde al instante y convierte cada
        interacción en una oportunidad. Sin código. Sin fricción.
      </motion.p>

      {/* Actions */}
      <motion.div {...fadeUp(0.8)} className="flex items-center gap-4 flex-wrap justify-center mb-20">
        <Button variant="primary" size="lg">Probar gratis 14 días →</Button>
        <Button variant="outline" size="lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/>
          </svg>
          Ver demo
        </Button>
      </motion.div>

      {/* Chat Demo */}
      <motion.div
        {...fadeUp(1.0)}
        className="relative w-full max-w-[760px]"
      >
        {/* Glow behind card */}
        <div
          className="absolute inset-[-40px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(0,229,160,0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            boxShadow:
              "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Topbar */}
          <div
            className="flex items-center gap-2 px-4 py-3.5 border-b"
            style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span
              className="ml-3 font-mono text-[11px] text-[var(--text-muted)]
                px-3 py-0.5 rounded-md"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              ChatGenius — Workspace
            </span>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-4 p-6 min-h-[280px]">
            {/* User */}
            <div className="flex flex-row-reverse items-start gap-2.5">
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center
                  flex-shrink-0 font-mono text-[10px] font-semibold text-[var(--text-secondary)]"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid var(--border)" }}
              >
                TÚ
              </div>
              <div
                className="max-w-[75%] px-4 py-2.5 rounded-[14px] rounded-br-[4px]
                  text-[13px] leading-[1.55] text-[var(--text-primary)]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)" }}
              >
                ¿Puedes analizar las ventas del Q3 y redactar un resumen ejecutivo?
              </div>
            </div>

            {/* AI */}
            <div className="flex items-start gap-2.5">
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center
                  flex-shrink-0 font-mono text-[10px] font-bold text-black"
                style={{ background: "linear-gradient(135deg, #00e5a0, #0080ff)" }}
              >
                CG
              </div>
              <div
                className="max-w-[75%] px-4 py-2.5 rounded-[14px] rounded-bl-[4px]
                  text-[13px] leading-[1.55] text-[var(--text-primary)]"
                style={{
                  background: "rgba(0,229,160,0.08)",
                  border: "1px solid rgba(0,229,160,0.15)",
                  minHeight: "2.5rem",
                }}
              >
                {typing ? <TypingIndicator /> : aiText || <TypingIndicator />}
              </div>
            </div>
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
          >
            <span className="flex-1 font-sans text-[13px] text-[var(--text-muted)]">
              Escribe tu pregunta...
            </span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer flex-shrink-0"
              style={{ background: "#00e5a0" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
