"use client";

import { useLang } from "@/components/LangContext";
import { motion } from "framer-motion";

export default function VideoDemo() {
  const { lang } = useLang();

  const title = lang === "es"
    ? "Mira cómo funciona en 60 segundos"
    : "See how it works in 60 seconds";
  const sub = lang === "es"
    ? "Automatización real, no simulaciones"
    : "Real automation, not simulations";

  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,10vw,6rem)] max-w-[900px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-text-primary mb-3">
          {title}
        </h2>
        <p className="text-text-secondary text-base">{sub}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden cursor-pointer aspect-video bg-bg border border-white/5 max-w-[800px] mx-auto"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-[#B8860B] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.5)] cursor-pointer"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7z" fill="#000" />
            </svg>
          </motion.div>
          <div>
            <div className="font-serif text-xl text-text-primary mb-1">
              {lang === "es" ? "Ver video de demo" : "Watch demo video"}
            </div>
            <div className="font-mono text-xs text-accent tracking-[2px]">
              ▶ 0:60
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-3">
          {["ES", "EN", "PT"].map((lang_code, i) => (
            <span key={lang_code} className={`font-mono text-[10px] font-bold px-2 py-1 rounded cursor-pointer ${i === 0 ? "text-accent bg-accent/20" : "text-text-muted bg-transparent"}`}>
              {lang_code}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
