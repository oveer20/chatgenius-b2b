"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

export default function CTA() {
  const { lang, t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);

  const contactLinks = [
    { key: "email", label: "Email", icon: "M2 4l10 7 10-7", href: "mailto:stratixintelligence@gmail.com" },
    { key: "wa", label: "WhatsApp", icon: "M17.472 14.382c-.297-.149-1.758-.617-2.030-.617-.77.001-3.855.293-6.162 1.393C6.963 17.5 6 18.463 6 19.453v1.034c0 .768.488 1.47 1.156 1.953l.73 1.297c.178.316.527.5.902.5l2.35-.001c.5 0 .973-.254 1.201-.643l2.156-3.373", href: "https://wa.me/573159269287" },
    { key: "fb", label: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12-6.627 0-12 5.373-12 12 0 5.99 4.388 10.954 10.125 11.854v-8.09h-3.047v-3.085h3.047v-2.644c0-3.022 1.812-4.697 4.56-4.697 1.33 0 2.708.264 2.708.264v2.956h-1.528c-1.502 0-1.972.932-1.972 1.886v2.19h3.333l-.532 3.085h-2.801v8.09", href: "https://www.facebook.com/share/1NAMx3GSWv/?mibextid=wwXIfr" },
    { key: "li", label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", href: "https://www.linkedin.com/in/jose-gaviriap/" },
  ];

  return (
    <section className="relative mx-auto max-w-[900px] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,10vw,8rem)] text-center">
      {/* Aurora background */}
      <div
        className="pointer-events-none absolute inset-[-60px] blur-2xl"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.05) 0%, transparent 50%)',
          animation: 'aurora 8s ease-in-out infinite alternate',
        }}
      />

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
              ? '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.1)'
              : '0 16px 50px rgba(0,0,0,0.4)',
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Social proof badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[13px] font-medium text-emerald-500"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" style={{ animation: 'pulse-glow 2s infinite' }} />
            {lang === "es" ? "+500 empresas ya automatizaron" : "+500 companies already automated"}
          </motion.div>

          <motion.h2 className="relative mb-4 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-text-primary">
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
                className="inline-block rounded-xl bg-gradient-to-br from-accent to-[#E5C555] px-9 py-4 text-[15px] font-bold text-[#030a05] no-underline shadow-[0_4px_20px_rgba(212,175,55,0.4),0_0_40px_rgba(212,175,55,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.5),0_0_60px_rgba(212,175,55,0.2)]"
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
              className="inline-block rounded-xl border-2 border-accent bg-accent/10 px-9 py-4 text-[15px] font-bold text-accent no-underline shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)]"
            >
              {lang === "es" ? "Agendar Demo →" : "Book a Demo →"}
            </motion.a>
          </motion.div>

          <motion.div className="relative mb-6 flex flex-wrap items-center justify-center gap-3">
            {contactLinks.map((link) => (
              <motion.a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHovered(link.key)}
                onMouseLeave={() => setHovered(null)}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-[10px] text-[14px] font-medium no-underline transition-all duration-300"
                style={{
                  border: hovered === link.key ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.15)',
                  color: hovered === link.key ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  background: hovered === link.key ? 'var(--color-accent-dim)' : 'var(--color-surface)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.icon} />
                </svg>
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="relative flex flex-wrap items-center justify-center gap-6 font-mono text-[12px] text-text-muted">
            <span>{t.cta.meta1}</span>
            <span>•</span>
            <span>{t.cta.meta2}</span>
            <span>•</span>
            <span>{t.cta.meta3}</span>
          </motion.div>

          {/* Founder card */}
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

      <style>{`
        @keyframes aurora {
          0% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.05) rotate(2deg); }
          100% { opacity: 0.7; transform: scale(1.02) rotate(-1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px #10b981; }
          50% { box-shadow: 0 0 12px #10b981; }
        }
      `}</style>
    </section>
  );
}
