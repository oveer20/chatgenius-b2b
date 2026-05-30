"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

function TypingIndicator() {
  return (
    <span className="flex gap-1 items-center py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const [aiText, setAiText] = useState("");
  const [typing, setTyping] = useState(true);
  const indexRef = useRef(0);

  const DEMO_TEXT = lang === "es"
    ? "¡Perfecto! Tenemos apartamento de $520M en Chapinero, 85m², 3 habitaciones. ¿Te agendo una visita mañana?"
    : "Perfect! We have an apartment for $520M in Chapinero, 85m², 3 bedrooms. Can I schedule a visit tomorrow?";

  useEffect(() => {
    indexRef.current = 0;
    setAiText("");
    setTyping(true);

    const timer = setTimeout(() => {
      setTyping(false);
      const interval = setInterval(() => {
        if (indexRef.current < DEMO_TEXT.length) {
          setAiText(DEMO_TEXT.slice(0, indexRef.current + 1));
          indexRef.current += 1;
        } else {
          clearInterval(interval);
        }
      }, 18);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [lang]);

  const DEMO_USER = lang === "es" ? "Hola, busco apartamento en Bogotá $500-550M" : "Hi, I'm looking for an apartment in Bogotá $500-550M";
  const DEMO_TAB = lang === "es" ? "Stratix Intelligence · Agente Demo" : "Stratix Intelligence · Demo Agent";

  const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: "easeOut" as const, delay } });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(5rem,8vh,7rem)] overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse 80% 30% at 50% 100%, rgba(212,175,55,0.03) 0%, transparent 50%), var(--color-bg)' }}
    >
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 15%,rgba(212,175,55,0.08) 0%,transparent 70%)' }}
      />
      <div className="absolute top-[10%] -left-[10%] w-[300px] h-[300px] rounded-full bg-accent/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-[10%] w-[250px] h-[250px] rounded-full bg-accent/2 blur-[80px] pointer-events-none" />

      <motion.div {...fadeUp()} className="relative z-2 flex flex-col items-center w-full max-w-[1200px]">
        <motion.div {...fadeUp()} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-dim border border-accent/30 text-accent text-xs font-semibold font-mono tracking-wider uppercase backdrop-blur-sm mb-6">
          {t.hero.badge}
        </motion.div>

        <motion.h1 {...fadeUp()} className="font-serif text-[clamp(2.8rem,8vw,6rem)] leading-[1.05] tracking-[-0.03em] mb-6 text-text-primary max-w-[1000px]">
          {t.hero.titleLine1}<br /><em className="text-accent not-italic">{t.hero.titleLine2}</em>
        </motion.h1>

        <motion.p {...fadeUp()} className="text-base md:text-lg text-text-secondary max-w-[560px] leading-[1.6] mb-10">
          {t.hero.subtitle}
        </motion.p>

        <motion.div {...fadeUp()} className="flex items-center gap-4 flex-wrap justify-center mb-16">
          <motion.a
            href="/login"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-accent text-[#030a05] text-[15px] font-bold px-8 py-3.5 rounded-xl no-underline shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] transition-shadow duration-300"
          >
            {t.hero.cta1}
          </motion.a>
          <motion.a
            href="/widget"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/3 text-text-primary text-[15px] font-medium no-underline hover:bg-white/8 hover:border-white/25 transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/></svg>
            {t.hero.cta2}
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
          className="relative w-full max-w-[700px]"
        >
          <div className="pointer-events-none absolute inset-[-40px] blur-xl" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 80%,rgba(212,175,55,0.12) 0%,transparent 70%)' }} />

          <motion.div
            whileHover={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 60px rgba(212,175,55,0.15)' }}
            className="bg-[rgba(17,21,32,0.7)] backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.08)]"
          >
            <div className="flex items-center gap-2 px-[18px] py-3.5 border-b border-white/7 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-text-muted bg-white/3 border border-white/7 px-3 py-1 rounded-[6px]">{DEMO_TAB}</span>
            </div>

            <div className="flex flex-col gap-4 p-6 min-h-[260px]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex flex-row-reverse items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold font-mono bg-white/10 border border-white/7 text-text-secondary shrink-0">{lang === "es" ? "TÚ" : "YOU"}</div>
                <div className="max-w-[75%] px-4 py-3 rounded-[16px_16px_4px_16px] text-sm leading-[1.5] bg-white/6 border border-white/7 text-text-primary font-sans">
                  {DEMO_USER}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold font-mono bg-gradient-to-br from-accent to-[#B8860B] text-black shadow-[0_2px_8px_rgba(212,175,55,0.3)] shrink-0">AI</div>
                <div className="max-w-[75%] px-4 py-3 rounded-[16px_16px_16px_4px] text-sm leading-[1.5] bg-accent/8 border border-accent/15 text-text-primary font-sans min-h-[40px]">
                  {typing ? <TypingIndicator /> : aiText}
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 border-t border-white/7 bg-white/[0.02]">
              <span className="flex-1 text-sm text-text-muted font-sans">{lang === "es" ? "Escribe tu mensaje..." : "Type your message..."}</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent shadow-[0_2px_10px_rgba(212,175,55,0.3)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
