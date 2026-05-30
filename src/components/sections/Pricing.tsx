"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState, useEffect } from "react";
import { PRICING_PLANS } from "@/lib/constants";

function safeFormatPrice(value: number | undefined, isUSD: boolean): string {
  if (value == null || isNaN(value)) return isUSD ? "0" : "0";
  try {
    return value.toLocaleString(isUSD ? "en-US" : "es-CO");
  } catch {
    return String(value);
  }
}

export default function Pricing() {
  const { t, lang, showUSD } = useLang();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const isUSD = showUSD;

  const getPrice = (plan: typeof PRICING_PLANS[0]): number => {
    if (!isClient) return 0;
    const val = isUSD
      ? (isAnnual ? plan.priceUsdAnnual : plan.priceUsd)
      : (isAnnual ? plan.priceCopAnnual : plan.priceCop);
    return val ?? 0;
  };

  const getPlanData = (plan: typeof PRICING_PLANS[0]) => {
    if (lang === "en") {
      return t.pricing.plans[plan.tier as keyof typeof t.pricing.plans] || {
        name: plan.name,
        desc: plan.description,
        features: plan.features,
      };
    }
    return {
      name: plan.name,
      desc: plan.description,
      features: plan.features,
    };
  };

  const getCurrencyLabel = () => {
    if (isUSD) return 'USD';
    return 'COP';
  };

  const getFreeMonthsText = () => {
    return lang === 'en' ? '2 months free' : '2 meses gratis';
  };

  return (
    <section id="planes" className="px-[clamp(1.5rem,5vw,4rem)] py-32 max-w-[1200px] mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block bg-accent-dim text-accent text-xs font-semibold px-4 py-1.5 rounded-full mb-5 font-sans tracking-wider">
          {t.pricing.label || "INVERSION INTELIGENTE"}
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-text-primary">
          {t.pricing.title} <em className="text-accent italic">{t.pricing.titleEm}</em>
        </h2>
        
        {/* Toggle Anual/Mensual */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={"text-sm font-sans transition-colors duration-300 " + (!isAnnual ? 'text-white font-bold' : 'text-text-secondary font-medium')}>{t.pricing.monthly || "Mensual"}</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            role="switch"
            aria-checked={isAnnual}
            className={"w-14 h-7 rounded-full relative border-0 cursor-pointer transition-colors duration-300 " + (isAnnual ? 'bg-accent' : 'bg-white/10')}
          >
            <div className={"absolute top-[3px] w-[22px] h-[22px] rounded-full bg-bg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] " + (isAnnual ? 'left-[31px]' : 'left-[3px]')} />
          </button>
          <span className={"text-sm font-sans transition-colors duration-300 " + (isAnnual ? 'text-white font-bold' : 'text-text-secondary font-medium')}>
            {t.pricing.annual || "Anual"} <span className="text-accent text-xs">{t.pricing.saveBadge || "(Ahorra 20%)"}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 items-center">
        {PRICING_PLANS.map((plan) => {
          const planData = getPlanData(plan);
          const isHighlighted = plan.popular;
          const isHovered = hoveredPlan === plan.tier;
          const price = getPrice(plan);
          
          return (
            <motion.div 
              key={plan.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPlan(plan.tier)}
              onMouseLeave={() => setHoveredPlan(null)}
              whileHover={{ y: isHighlighted ? -4 : -8 }}
              className={`relative rounded-2xl flex flex-col h-full transition-all duration-300 ${
                isHighlighted
                  ? 'p-10 bg-gradient-to-b from-accent/15 to-[#0d1017] border-2 border-accent shadow-[0_20px_60px_rgba(212,175,55,0.15)] scale-[1.03] z-10'
                  : 'p-8 bg-white/[0.02] border border-white/8 shadow-sm shadow-black/20'
              } ${isHovered && !isHighlighted ? 'bg-white/[0.06] border-accent/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' : ''}`}
            >
              {isHighlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest font-sans">
                  {t.pricing.mostPopular || "Más Popular"}
                </div>
              )}
              
              <h3 className={"font-sans text-xl font-bold text-white mb-2 " + (isHighlighted ? 'mt-2' : 'mt-0')}>
                {planData.name}
              </h3>
              <p className="text-text-secondary text-sm mb-6 font-sans leading-[1.5]">{planData.desc}</p>
              
              <div className="mb-1">
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white leading-[1.1]">
                    ${isClient ? safeFormatPrice(price, isUSD) : '...'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-text-secondary text-sm font-sans">{getCurrencyLabel()}{t.pricing.perMonth || "/mes"}</span>
                  {isAnnual && (
                    <span className="text-[#27C93F] text-xs font-semibold font-sans">
                      · {getFreeMonthsText()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="h-px bg-white/10 mt-4 mb-6" />
              
              <ul className="list-none p-0 m-0 flex flex-col gap-4 mb-8 flex-1">
                {planData.features.map((f: string, i: number) => (
                  <li key={i} className="flex gap-3 text-[#e2e8f0] text-sm font-sans leading-[1.4]">
                    <span className="text-accent shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              
              <motion.a
                href="/login"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={"w-full p-3.5 rounded-xl text-center no-underline text-sm font-bold block font-sans transition-all duration-300 " + (isHighlighted ? 'bg-accent text-black' : 'bg-transparent text-white border border-white/20')}
              >
                {isHighlighted ? t.pricing.startFree : t.pricing.startBtn}
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
