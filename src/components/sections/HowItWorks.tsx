"use client";

import { useLang } from "@/components/LangContext";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const STEPS_SVG = {
  es: [
    { label: "Integración", path: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { label: "Conocimiento", path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Personalización", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Activación", path: "M13 10V3L4 14h7v7l9-11h-7z" },
  ],
  en: [
    { label: "Integration", path: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { label: "Knowledge", path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Customization", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Launch", path: "M13 10V3L4 14h7v7l9-11h-7z" },
  ],
};

const STEPS = {
  es: [
    { num: "01", title: "Conecta tus canales", desc: "WhatsApp, Instagram, tu web... Stratix se integra en minutos." },
    { num: "02", title: "Sube tu información", desc: "PDFs, catálogos, precios, políticas. Sin código, sin complicaciones." },
    { num: "03", title: "Personaliza tu agente", desc: "Define el tono, personalidad y conocimientos de tu asistente IA." },
    { num: "04", title: "Listo para vender", desc: "Tu agente responde 24/7. Aprende de cada conversación." },
  ],
  en: [
    { num: "01", title: "Connect your channels", desc: "WhatsApp, Instagram, your web... Stratix integrates in minutes." },
    { num: "02", title: "Upload your information", desc: "PDFs, catalogs, prices, policies. No code, no complications." },
    { num: "03", title: "Customize your agent", desc: "Define the tone, personality and knowledge of your AI assistant." },
    { num: "04", title: "Ready to sell", desc: "Your agent responds 24/7. Learns from every conversation." },
  ],
};

function StepCard({ step, svgPath, svgLabel, index, isLast }: { step: { num: string; title: string; desc: string }; svgPath: string; svgLabel: string; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -8,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
      animate={isHovered ? { rotateY: tilt.x, rotateX: tilt.y } : {}}
      className={"p-8 relative rounded-2xl transition-colors duration-300 [transform-style:preserve-3d] " + (isHovered ? 'bg-white/5' : 'bg-white/[0.02]') + (!isLast ? ' border-r border-white/5' : '')}
    >
      <div className={"w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-300 bg-[linear-gradient(135deg,rgba(212,175,55,0.15),rgba(212,175,55,0.05))] border border-accent/30 " + (isHovered ? 'scale-110 shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'scale-100')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={svgPath} />
        </svg>
      </div>

      <div className={"font-mono text-xs text-accent tracking-wide mb-3 transition-opacity duration-300 " + (isHovered ? 'opacity-100' : 'opacity-60')}>
        {step.num} — {svgLabel}
      </div>

      <h3 className="font-serif text-[1.3rem] mb-3 text-text-primary transition-colors duration-300">
        {step.title}
      </h3>
      <p className="text-sm text-text-secondary leading-[1.65]">{step.desc}</p>

      {!isLast && (
        <div className={"absolute top-14 -right-px w-0.5 h-10 bg-[linear-gradient(to_bottom,transparent,rgba(212,175,55,0.3),transparent)] transition-opacity duration-300 " + (isHovered ? 'opacity-100' : 'opacity-30')} />
      )}

      {isHovered && (
        <motion.div
          layoutId="step-glow"
          className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none"
        />
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  const { t, lang } = useLang();
  const steps = STEPS[lang as keyof typeof STEPS];
  const svgIcons = STEPS_SVG[lang as keyof typeof STEPS_SVG];

  return (
    <section id="como-funciona" className="px-[clamp(1.5rem,5vw,4rem)] py-32 max-w-[1200px] mx-auto relative">
      <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] blur-[40px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="inline-block bg-accent-dim text-accent text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
          {t.how.label}
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-text-primary">
          {t.how.title}<br />
          <em className="text-accent italic">{t.how.titleEm}</em>
        </h2>
        <p className="text-base text-text-secondary">{t.how.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-0 rounded-2xl overflow-hidden border border-white/5 bg-[rgba(13,16,23,0.5)] backdrop-blur-xl">
        {steps.map((step, i) => (
          <StepCard key={step.num} step={step} svgPath={svgIcons[i].path} svgLabel={svgIcons[i].label} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}
