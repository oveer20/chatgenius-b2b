"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function ROICalculator() {
  const { t } = useLang();
  const [leads, setLeads] = useState(50);
  const [value, setValue] = useState(200000);
  const [responseTime, setResponseTime] = useState(60);

  const lossRate = Math.min(0.15 + (responseTime / 120) * 0.45, 0.6);
  const missedLeads = Math.round(leads * lossRate);
  const lostRevenue = missedLeads * value;
  const stratixCost = 79000;

  return (
    <section id="calculadora" className="border-y border-accent/10 bg-gradient-to-b from-bg via-bg3 to-bg px-[clamp(1.5rem,5vw,4rem)] py-32">
      <div className="mx-auto max-w-[1000px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 inline-block rounded-full bg-[rgba(255,95,86,0.15)] px-4 py-1.5 font-sans text-[13px] font-semibold tracking-[0.05em] text-[#ff5f56]"
        >
          {t.roi.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-serif text-4xl md:text-5xl font-bold tracking-tighter text-text-primary"
        >
          {t.roi.titlePart1} <span className="italic text-[#ff5f56]">{t.roi.titlePart2}</span> hoy?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-[50px] max-w-[600px] font-sans text-base leading-relaxed text-text-secondary"
        >
          {t.roi.subtitle}
        </motion.p>

        <div className="mb-[50px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 text-left">
          <div className="rounded-2xl border border-white/10 bg-bg/60 backdrop-blur-lg p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <label className="mb-3 block font-sans text-sm font-medium text-text-secondary">
              {t.roi.leadsLabel}
            </label>
            <input
              type="range" min="10" max="500" value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              className="mb-2.5 w-full accent-[#D4AF37]"
            />
            <div className="font-serif text-2xl font-bold text-text-primary">
              {leads}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-bg/60 backdrop-blur-lg p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <label className="mb-3 block font-sans text-sm font-medium text-text-secondary">
              {t.roi.valueLabel}
            </label>
            <input
              type="range" min="50000" max="5000000" step="50000" value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="mb-2.5 w-full accent-[#D4AF37]"
            />
            <div className="font-serif text-2xl font-bold text-text-primary">
              ${value.toLocaleString('es-CO')}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-bg/60 backdrop-blur-lg p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <label className="mb-3 block font-sans text-sm font-medium text-text-secondary">
              {t.roi.timeLabel} ({t.roi.timeSuffix})
            </label>
            <input
              type="range" min="5" max="120" value={responseTime}
              onChange={(e) => setResponseTime(Number(e.target.value))}
              className="mb-2.5 w-full accent-[#D4AF37]"
            />
            <div className="font-serif text-2xl font-bold text-text-primary">
              {responseTime} {t.roi.timeSuffix}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-[rgba(13,16,23,0.8)] p-[clamp(2rem,5vw,3rem)] text-center shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(212,175,55,0.06)]">
          <div>
            <div className="mb-2 font-sans text-sm font-semibold uppercase tracking-[1px] text-[#ff5f56]">{t.roi.missedLeadsLabel}</div>
            <div className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.1] text-white">
              -{missedLeads}
            </div>
            <div className="mt-2 font-sans text-[13px] text-text-secondary">{t.roi.missedLeadsDesc}</div>
          </div>

          <div>
            <div className="mb-2 font-sans text-sm font-semibold uppercase tracking-[1px] text-[#ff5f56]">{t.roi.lostMoneyLabel}</div>
            <div className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold leading-[1.1] text-white">
              -${lostRevenue.toLocaleString('es-CO')}
            </div>
            <div className="mt-2 font-sans text-[13px] text-text-secondary">{t.roi.lostMoneyDesc}</div>
          </div>

          <div className="relative">
            <div className="mb-2 font-sans text-sm font-semibold uppercase tracking-[1px] text-accent">{t.roi.stratixCostLabel}</div>
            <div className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold leading-[1.1] text-accent">
              ${stratixCost.toLocaleString('es-CO')}
            </div>
            <div className="mt-2 font-sans text-[13px] text-text-secondary">{t.roi.stratixCostDesc}</div>
          </div>
        </div>

        <motion.a
          href="/login"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-block rounded-xl bg-accent px-8 py-4 font-sans text-base font-bold text-bg no-underline shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-transform duration-200"
        >
          {t.roi.cta}
        </motion.a>
      </div>
    </section>
  );
}
