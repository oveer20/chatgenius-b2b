"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

export default function CTA() {
  const { lang, t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative mx-auto max-w-[900px] px-[clamp(1.5rem,5vw,4rem)] py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div
          onMouseEnter={() => setHovered("box")}
          onMouseLeave={() => setHovered(null)}
          className="relative overflow-hidden rounded-3xl border border-accent/20 bg-bg/70 p-[clamp(3rem,6vw,5rem)] backdrop-blur-xl"
          style={{
            transition: 'all 0.4s ease',
            boxShadow: hovered === "box"
              ? '0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(212,175,55,0.12)'
              : '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[13px] font-medium text-emerald-500"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"
            />
            <span className="font-semibold">+1,847</span>
            {lang === "es" ? "empresas ya automatizaron" : "companies already automated"}
          </motion.div>

          <motion.h2 className="relative mb-4 font-serif text-4xl md:text-5xl font-bold tracking-tighter text-text-primary">
            {t.cta.title}<br />
            <em className="italic text-accent">{t.cta.titleEm}</em>
          </motion.h2>

          <motion.p className="relative mx-auto mb-10 max-w-[460px] text-[16px] text-text-secondary">
            {t.cta.subtitle}
          </motion.p>

          <motion.div className="relative mb-8 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/login"
                className="inline-block rounded-xl bg-gradient-to-br from-accent to-[#E5C555] px-9 py-4 text-[15px] font-bold text-[#030a05] no-underline shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)] animate-[glowPulse_3s_ease-in-out_infinite]"
              >
                {t.cta.cta1}
              </Link>
            </motion.div>
            <motion.a
              href="https://wa.me/573159269287?text=Hola!%20Quiero%20agendar%20una%20demo%20de%20Stratix"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block rounded-xl border-2 border-accent bg-accent/10 px-9 py-4 text-[15px] font-bold text-accent no-underline transition-all duration-300 hover:bg-accent hover:text-black"
            >
              {lang === "es" ? "Agendar Demo →" : "Book a Demo →"}
            </motion.a>
          </motion.div>

          <motion.div className="relative mb-6 flex flex-wrap items-center justify-center gap-8 font-mono text-[12px] text-text-muted">
            <span className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              {t.cta.meta1}
            </span>
            <span className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              {lang === "es" ? "Sin tarjeta" : "No card needed"}
            </span>
            <span className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {t.cta.meta3}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative mt-8 flex items-center justify-center gap-4 border-t border-white/7 pt-6"
          >
            <span className="font-sans text-[13px] text-text-secondary">{lang === "es" ? "Fundado por" : "Founded by"}</span>
            <motion.a
              href="https://www.linkedin.com/in/jose-gaviriap/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-[10px] rounded-xl border border-[rgba(10,102,194,0.3)] bg-[rgba(10,102,194,0.1)] px-4 py-2 no-underline transition-all duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0A66C2] to-[#004182] font-sans text-[12px] font-bold text-white">JG</div>
              <div className="text-left">
                <div className="font-sans text-[14px] font-semibold text-text-primary">Jose Gaviria</div>
                <div className="font-sans text-[11px] text-text-secondary">{lang === "es" ? "Founder & CEO" : "Founder & CEO"}</div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
