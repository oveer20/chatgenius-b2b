"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

const PHONE_CONTENT = {
  es: {
    without: {
      title: "Sin Stratix",
      subtitle: "Atención manual · 20min respuesta",
      messages: [
        { side: "right", text: "Hola, ¿tienen disponible el apto 304?" },
        { side: "left", text: "Sí, está disponible. ¿En qué más puedo ayudarte?", delay: 2, slow: true },
        { side: "right", text: "¿Precio y metros?", delay: 0.5 },
        { side: "left", text: "Un momento, consulto...", delay: 3, slow: true },
        { side: "system", text: "⏱ Cliente abandonó después de 15 min de espera", delay: 1 },
      ],
      lost: true,
    },
    with: {
      title: "Con Stratix",
      subtitle: "IA instantánea · 1.8s respuesta",
      messages: [
        { side: "right", text: "Hola, ¿tienen disponible el apto 304?" },
        { side: "left", text: "¡Hola! Sí, el apartamento 304, 75m², $380M, está disponible con entrega inmediata. ¿Te gustaría agendar una visita?", ai: true },
        { side: "right", text: "Sí, mañana a las 11am", delay: 0.3 },
        { side: "left", text: "✅ Perfecto, agenda confirmada para mañana 11am. Te enviaré un recordatorio. ¿Algo más?", ai: true },
        { side: "right", text: "¡Gracias!", delay: 0.2 },
        { side: "system", text: "🎯 Lead capturado · Cita agendada en 8 segundos", delay: 0.5 },
      ],
    },
  },
  en: {
    without: {
      title: "Without Stratix",
      subtitle: "Manual support · 20min response",
      messages: [
        { side: "right", text: "Hi, is unit 304 available?" },
        { side: "left", text: "Yes, it's available. How can I help you?", delay: 2, slow: true },
        { side: "right", text: "Price and sqft?", delay: 0.5 },
        { side: "left", text: "One moment, let me check...", delay: 3, slow: true },
        { side: "system", text: "⏱ Lead left after 15 min waiting", delay: 1 },
      ],
      lost: true,
    },
    with: {
      title: "With Stratix",
      subtitle: "Instant AI · 1.8s response",
      messages: [
        { side: "right", text: "Hi, is unit 304 available?" },
        { side: "left", text: "Hi! Yes, unit 304, 75m², $380M, is available with immediate delivery. Would you like to schedule a visit?", ai: true },
        { side: "right", text: "Yes, tomorrow at 11am", delay: 0.3 },
        { side: "left", text: "✅ Perfect, confirmed for tomorrow 11am. I'll send a reminder. Anything else?", ai: true },
        { side: "right", text: "Thanks!", delay: 0.2 },
        { side: "system", text: "🎯 Lead captured · Appointment booked in 8 seconds", delay: 0.5 },
      ],
    },
  },
};

function PhoneMockup({ data }: { data: { title: string; subtitle: string; messages: any[]; lost?: boolean } }) {
  const [visibleMessages, setVisibleMessages] = useState(0);

  const startAnimation = () => {
    setVisibleMessages(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleMessages(i);
      if (i >= data.messages.length) clearInterval(id);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={startAnimation}
      className="relative"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-[300px] bg-[#0d1017] rounded-[32px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="h-7 bg-[#0d1017] flex items-center justify-center">
            <div className="w-24 h-1.5 rounded-full bg-white/10" />
          </div>
          <div className="px-3 pb-2 pt-1 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${data.lost ? 'bg-red-500/20 text-red-400' : 'bg-accent/20 text-accent'}`}>
                {data.lost ? '✕' : '✓'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-text-primary truncate">{data.title}</div>
                <div className="text-[8px] text-text-muted">{data.subtitle}</div>
              </div>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
          <div className="p-3 min-h-[380px] flex flex-col gap-2">
            {(data.messages as any[]).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={visibleMessages > i ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`${msg.side === "system" ? "flex justify-center" : `flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}`}
              >
                {msg.side === "system" ? (
                  <div className="text-[9px] text-text-muted font-mono bg-white/[0.02] px-2.5 py-1.5 rounded-full border border-white/5 whitespace-nowrap">
                    {msg.text}
                  </div>
                ) : (
                  <div className={`max-w-[85%] px-3 py-2 text-[11px] leading-[1.4] ${
                    msg.side === "right"
                      ? "bg-accent/20 border border-accent/20 text-text-primary rounded-[14px_14px_4px_14px]"
                      : msg.ai
                        ? "bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 text-text-primary rounded-[14px_14px_14px_4px]"
                        : "bg-white/5 border border-white/5 text-text-primary rounded-[14px_14px_14px_4px]"
                  }`}>
                    {msg.slow && (
                      <span className="block text-[8px] text-text-muted mb-1 font-mono">⏳ 20 min después...</span>
                    )}
                    {msg.text}
                    {msg.ai && (
                      <span className="block text-[8px] text-accent mt-1 font-mono">✦ IA</span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
            {visibleMessages <= data.messages.length && visibleMessages > 0 && visibleMessages < data.messages.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="flex justify-start"
              >
                <div className="flex gap-0.5 px-3 py-2 rounded-full bg-white/5">
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                </div>
              </motion.div>
            )}
          </div>
          <div className="px-3 py-2 border-t border-white/5 flex items-center gap-2">
            <div className="flex-1 h-6 rounded-full bg-white/5 border border-white/5" />
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${data.lost ? 'bg-red-500/20' : 'bg-accent'}`}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M6 2l3 3-3 3" stroke={data.lost ? "#ef4444" : "#000"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BeforeAfter() {
  const { lang } = useLang();
  const content = PHONE_CONTENT[lang as keyof typeof PHONE_CONTENT];

  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] py-32 max-w-[1100px] mx-auto relative">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_60%)] blur-[60px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block bg-error/10 text-error text-[13px] font-semibold px-4 py-[6px] rounded-full mb-4 tracking-[0.5px] font-mono">
          {lang === "es" ? "SIN STRATIX VS CON STRATIX" : "WITHOUT STRATIX VS WITH STRATIX"}
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-text-primary">
          {lang === "es" ? "Dos realidades, una" : "Two realities, one"}{" "}
          <em className="text-accent italic">{lang === "es" ? "decisión" : "decision"}</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error/10 border border-error/20 text-error text-xs font-semibold font-mono">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              {lang === "es" ? "Lead perdido" : "Lost lead"}
            </div>
          </div>
          <PhoneMockup data={content.without} />
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold font-mono">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              {lang === "es" ? "Lead capturado" : "Lead captured"}
            </div>
          </div>
          <PhoneMockup data={content.with} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-3 gap-6 max-w-[600px] mx-auto"
      >
        {[
          { val: "40%", label: lang === "es" ? "Más leads" : "More leads", icon: "↑" },
          { val: "1.8s", label: lang === "es" ? "Respuesta" : "Response time", icon: "⚡" },
          { val: "24/7", label: lang === "es" ? "Disponibilidad" : "Availability", icon: "◉" },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-4 rounded-xl bg-bg/60 backdrop-blur-lg border border-accent/10"
          >
            <div className="font-serif text-2xl font-bold text-accent">{m.val}</div>
            <div className="text-[11px] text-text-secondary mt-1">{m.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
