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
      className="bg-gradient-to-br from-[rgba(212,175,55,0.12)] to-[rgba(16,185,129,0.08)] border-t border-[rgba(212,175,55,0.2)] border-b border-[rgba(16,185,129,0.15)] px-[clamp(1.5rem,5vw,3rem)] py-3 text-center"
    >
      <div className="max-w-[900px] mx-auto flex items-center justify-center gap-[clamp(12px,3vw,24px)] flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-black tracking-[2px] text-accent bg-accent/10 px-[10px] py-1 rounded-md">
            {c.label}
          </span>
        </div>
        <span className="text-[15px] font-semibold text-text-primary">
          {c.title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#10b981]">✓</span>
          <span className="text-[13px] text-text-secondary">{c.badge}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-accent">🛡</span>
          <span className="text-[13px] text-text-secondary">{c.desc}</span>
        </div>
      </div>
    </motion.div>
  );
}
