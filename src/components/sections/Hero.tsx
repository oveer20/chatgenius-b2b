"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangContext";
import AIPlayground from "./AIPlayground";

function TypingIndicator() {
  return (
    <span className="flex gap-1 items-center py-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
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
      return () => clearInterval(interval);
    }, 2500);
    return () => clearTimeout(timer);
  }, [lang]);

  const DEMO_USER = lang === "es" ? "Hola, busco apartamento en Bogotá $500-550M" : "Hi, I'm looking for an apartment in Bogotá $500-550M";
  const DEMO_TAB = lang === "es" ? "Stratix Intelligence · Agente Demo" : "Stratix Intelligence · Demo Agent";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-[clamp(1.5rem,5vw,4rem)] pt-[120px] pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(212,175,55,0.1)_0%,transparent_70%)]" />

      <div className="inline-flex items-center gap-2 border border-accent/25 bg-accent-dim text-accent font-mono text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase mb-6">
        {t.hero.badge}
      </div>

      <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.05] tracking-[-0.03em] mb-8 text-text-primary">
        {t.hero.titleLine1}<br /><em className="text-accent not-italic">{t.hero.titleLine2}</em>
      </h1>

      <p className="text-lg text-text-secondary max-w-[560px] leading-relaxed mb-12">
        {t.hero.subtitle}
      </p>

      <div className="flex items-center gap-4 flex-wrap justify-center mb-20">
        <a href="/login"
          className="bg-accent text-[#030a05] text-[15px] font-semibold px-8 py-3.5 rounded-xl no-underline inline-block shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-shadow duration-200 hover:shadow-[0_8px_40px_rgba(212,175,55,0.5)]">
          {t.hero.cta1}
        </a>
        <a href="/widget"
          className="px-7 py-[13px] border border-white/15 rounded-xl font-medium no-underline text-text-primary flex items-center gap-2 bg-white/[0.03] text-[15px] transition-all duration-200 hover:border-accent/40 hover:bg-accent/5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/></svg>
          {t.hero.cta2}
        </a>
        <AIPlayground />
      </div>

      <div className="relative w-full max-w-[700px]">
        <div className="absolute inset-[-40px] bg-[radial-gradient(ellipse_60%_40%_at_50%_80%,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-[20px] pointer-events-none" />

        <div className="bg-[rgba(17,21,32,0.7)] backdrop-blur-xl border border-white/10 rounded-[20px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.08)]">
          <div className="flex items-center gap-2 px-[18px] py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
            <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-text-muted bg-white/[0.03] border border-white/[0.07] px-3 py-1 rounded-[6px]">{DEMO_TAB}</span>
          </div>

          <div className="flex flex-col gap-4 p-6 min-h-[260px]">
            <div className="flex flex-row-reverse items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold font-mono bg-white/10 border border-white/[0.07] text-text-secondary">{lang === "es" ? "TÚ" : "YOU"}</div>
              <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br text-sm leading-relaxed bg-white/[0.06] border border-white/[0.07] text-text-primary font-sans">
                {DEMO_USER}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold font-mono bg-gradient-to-br from-accent to-accent2 text-black shadow-[0_2px_8px_rgba(212,175,55,0.3)]">AI</div>
              <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl text-sm leading-relaxed bg-accent/8 border border-accent/15 text-text-primary font-sans min-h-[40px]">
                {typing ? <TypingIndicator /> : aiText}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 border-t border-white/[0.07] bg-white/[0.02]">
            <span className="flex-1 text-sm text-text-muted font-sans">{lang === "es" ? "Escribe tu mensaje..." : "Type your message..."}</span>
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center bg-accent shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
