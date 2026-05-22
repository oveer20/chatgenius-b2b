"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

const SCREENS = {
  es: [
    {
      title: "Dashboard de métricas",
      desc: "Ve en tiempo real cuántos leads llegan, su calificación y conversiones.",
      color: "#D4AF37",
    },
    {
      title: "Configuración del bot",
      desc: "Personaliza el tono, conocimiento y comportamiento en minutos.",
      color: "#10b981",
    },
    {
      title: "Leads calificados automáticamente",
      desc: "El bot打分 cada lead y solo pasa los HOT a tu equipo.",
      color: "#3B82F6",
    },
    {
      title: "WhatsApp real en acción",
      desc: "Respuestas automáticas en segundos, 24/7, en WhatsApp.",
      color: "#25D366",
    },
  ],
  en: [
    {
      title: "Metrics dashboard",
      desc: "See in real-time how many leads arrive, their scoring and conversions.",
      color: "#D4AF37",
    },
    {
      title: "Bot configuration",
      desc: "Customize tone, knowledge and behavior in minutes.",
      color: "#10b981",
    },
    {
      title: "Automatically scored leads",
      desc: "The bot scores every lead and only passes HOT ones to your team.",
      color: "#3B82F6",
    },
    {
      title: "Real WhatsApp in action",
      desc: "Automatic responses in seconds, 24/7, on WhatsApp.",
      color: "#25D366",
    },
  ],
};

const SCREEN_ICONS = [
  "📊",
  "⚙️",
  "🎯",
  "💬",
];

export default function ScreensShowcase() {
  const { lang } = useLang();
  const screens = SCREENS[lang as 'es' | 'en'];
  const [active, setActive] = useState(0);

  const next = () => setActive(a => (a + 1) % screens.length);
  const prev = () => setActive(a => (a - 1 + screens.length) % screens.length);

  const title = lang === "es" ? "Tu escritorio de ventas,potenciado con IA" : "Your sales desk, powered by AI";
  const subtitle = lang === "es" ? "Todo lo que ves aquí es tu dashboard real de Stratix" : "Everything you see here is your real Stratix dashboard";

  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,10vw,6rem)] max-w-[1000px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-text-primary mb-3">
          {title.split(',')[0]},<br />
          <em className="text-accent italic">{title.split(',')[1]}</em>
        </h2>
        <p className="text-text-secondary text-base">{subtitle}</p>
      </motion.div>

      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className={`bg-bg2 backdrop-blur-xl rounded-[20px] p-[clamp(2rem,5vw,3rem)] ${
              active === 0 ? 'border-[#D4AF3733] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_40px_#D4AF3715]' :
              active === 1 ? 'border-[#10b98133] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_40px_#10b98115]' :
              active === 2 ? 'border-[#3B82F633] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_40px_#3B82F615]' :
              'border-[#25D36633] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_40px_#25D36615]'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1.5">
                <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
              </div>
              <span className={`font-mono text-[11px] tracking-[1px] ${
                active === 0 ? 'text-[#D4AF37]' :
                active === 1 ? 'text-[#10b981]' :
                active === 2 ? 'text-[#3B82F6]' :
                'text-[#25D366]'
              }`}>
                STRATIX DASHBOARD
              </span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-[28px] shrink-0 ${
                  active === 0 ? 'bg-[#D4AF3720] border-[#D4AF3740]' :
                  active === 1 ? 'bg-[#10b98120] border-[#10b98140]' :
                  active === 2 ? 'bg-[#3B82F620] border-[#3B82F640]' :
                  'bg-[#25D36620] border-[#25D36640]'
                }`}>
                  {SCREEN_ICONS[active]}
                </div>
                <div>
                  <h3 className="font-serif text-[1.3rem] text-text-primary mb-2">
                    {screens[active].title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-[1.6]">
                    {screens[active].desc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: lang === "es" ? "Leads hoy" : "Leads today", val: "47", color: "#D4AF37" },
                  { label: lang === "es" ? "HOT" : "HOT", val: "12", color: "#10b981" },
                  { label: lang === "es" ? "Tiempo avg" : "Avg time", val: "1.8s", color: "#3B82F6" },
                  { label: lang === "es" ? "Conversión" : "Conversion", val: "68%", color: "#D4AF37" },
                ].map((m, i) => (
                  <div key={i} className="p-4 bg-black/30 rounded-xl border border-white/5 text-center">
                    <div className={`font-serif text-2xl font-bold ${
                      m.color === '#D4AF37' ? 'text-accent' :
                      m.color === '#10b981' ? 'text-[#10b981]' :
                      'text-[#3B82F6]'
                    }`}>{m.val}</div>
                    <div className="text-[11px] text-text-muted mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8 items-center">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-text-secondary cursor-pointer flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="flex gap-2">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-sm border-0 cursor-pointer transition-all duration-300 ${
                  i === active ? 'w-6 bg-accent' : 'w-2 bg-white/10'
                }`}
              />
            ))}
          </div>

          <button onClick={next} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-text-secondary cursor-pointer flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
