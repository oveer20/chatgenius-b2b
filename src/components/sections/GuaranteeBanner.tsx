"use client";

import { useLang } from "@/components/LangContext";
import { motion } from "framer-motion";

const CONTENT = {
  es: {
    label: "RIESGO CERO",
    title: "7 días gratis · Sin tarjeta · Cancela cuando quieras",
    badge: "Garantía de devolución 100%",
    desc: "Si Stratix no genera resultados en 30 días, te devolvemos el 100% de tu inversión.",
  },
  en: {
    label: "ZERO RISK",
    title: "7 days free · No card needed · Cancel anytime",
    badge: "100% money-back guarantee",
    desc: "If Stratix doesn't generate results in 30 days, we refund 100% of your investment.",
  },
};

export default function GuaranteeBanner() {
  const { lang } = useLang();
  const c = CONTENT[lang as 'es' | 'en'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-accent/10 to-success/6 border-t border-accent/15 border-b border-white/5 px-[clamp(1.5rem,5vw,3rem)] py-3 text-center"
    >
      <div className="max-w-[900px] mx-auto flex items-center justify-center gap-[clamp(12px,3vw,24px)] flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-black tracking-[2px] text-accent bg-accent/15 px-[10px] py-1 rounded-md">
            {c.label}
          </span>
        </div>
        <span className="text-[15px] font-semibold text-text-primary">
          {c.title}
        </span>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M20 6L9 17l-5-5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[13px] text-text-secondary">{c.badge}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[13px] text-text-secondary">{c.desc}</span>
        </div>
      </div>
    </motion.div>
  );
}
