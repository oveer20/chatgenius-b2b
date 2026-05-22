"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState, useEffect, useRef } from "react";

const CONTENT = {
  es: {
    badge: "SIN STRATIX VS CON STRATIX",
    titlePart1: "Dos realidades, una",
    titlePart2: "decisión",
    withoutTitle: "Sin Automatización",
    withTitle: "Con Stratix AI",
    withoutItems: [
      "Pierdes 40% de leads por no responder rápido",
      "Tu equipo humano se agota y comete errores",
      "Pagas salarios altos sin garantía de cobertura 24/7",
      "Tus clientes esperan minutos u horas por respuesta",
      "Tu competencia se queda con tus ventas nocturnas",
    ],
    withItems: [
      "Respondes en menos de 2 segundos, siempre",
      "Cierras citas y ventas mientras duermes",
      "Un costo fijo mensual que equivale a 1% de un salario",
      "Experiencia premium y consistente para cada cliente",
      "Escalabilidad infinita sin contratar más personal",
    ],
    metrics: [
      { value: "40%", label: "Más leads capturados" },
      { value: "2s", label: "Tiempo de respuesta" },
      { value: "24/7", label: "Disponibilidad total" },
    ],
  },
  en: {
    badge: "WITHOUT STRATIX VS WITH STRATIX",
    titlePart1: "Two realities, one",
    titlePart2: "decision",
    withoutTitle: "Without Automation",
    withTitle: "With Stratix AI",
    withoutItems: [
      "You lose 40% of leads by not responding fast enough",
      "Your human team gets exhausted and makes mistakes",
      "You pay high salaries with no 24/7 coverage guarantee",
      "Your customers wait minutes or hours for a response",
      "Your competition takes your nighttime sales",
    ],
    withItems: [
      "You respond in under 2 seconds, always",
      "You close appointments and sales while you sleep",
      "A fixed monthly cost equivalent to 1% of a salary",
      "Premium and consistent experience for every customer",
      "Infinite scalability without hiring more staff",
    ],
    metrics: [
      { value: "40%", label: "More leads captured" },
      { value: "2s", label: "Response time" },
      { value: "24/7", label: "Total availability" },
    ],
  },
};

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          if (target.includes("/")) {
            setDisplay(target);
            return;
          }
          const num = parseInt(target);
          if (isNaN(num)) { setDisplay(target); return; }
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * num);
            setDisplay(`${start}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <div ref={ref} className="text-text-primary font-serif text-[clamp(2rem,4vw,3rem)] font-bold">{display}</div>;
}

export default function BeforeAfter() {
  const { t, lang } = useLang();
  const content = CONTENT[lang as keyof typeof CONTENT];
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,10vw,8rem)] max-w-[1100px] mx-auto relative">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_60%)] blur-[60px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block bg-[rgba(255,95,86,0.12)] text-[#ff5f56] text-[13px] font-semibold px-4 py-[6px] rounded-full mb-4 tracking-[0.5px]">
          {content.badge}
        </span>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-text-primary">
          {content.titlePart1} <em className="text-accent italic">{content.titlePart2}</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onMouseEnter={() => setHoveredCard('without')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`rounded-[20px] p-8 transition-all duration-300 border border-[rgba(239,68,68,0.2)] ${
            hoveredCard === 'without'
              ? 'bg-[rgba(239,68,68,0.04)] -translate-y-1 shadow-[0_20px_40px_rgba(239,68,68,0.1)]'
              : 'bg-white/5'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] flex items-center justify-center text-[#ef4444] text-lg font-bold">
              ✗
            </div>
            <h3 className="text-[#ff5f56] text-[1.2rem] font-serif">{content.withoutTitle}</h3>
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-4">
            {content.withoutItems.map((item: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 text-text-secondary text-sm leading-[1.6] items-start"
              >
                <span className="text-[#ef4444] shrink-0 text-base mt-[1px]">✕</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onMouseEnter={() => setHoveredCard('with')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`rounded-[20px] p-8 relative overflow-hidden transition-all duration-300 border border-accent/10 ${
            hoveredCard === 'with'
              ? 'bg-accent-dim -translate-y-1 shadow-[0_20px_40px_rgba(212,175,55,0.1)]'
              : 'bg-bg2'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(90deg,#D4AF37,#10b981,#D4AF37)]" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,rgba(212,175,55,0.2),rgba(16,185,129,0.1))] border border-accent/10 flex items-center justify-center text-accent text-lg font-bold">
              ✓
            </div>
            <h3 className="text-accent text-[1.2rem] font-serif">{content.withTitle}</h3>
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-4">
            {content.withItems.map((item: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 text-text-primary text-sm leading-[1.6] items-start"
              >
                <span className="text-[#10b981] shrink-0 text-base mt-[1px]">✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 bg-accent-dim border border-accent/10 rounded-2xl p-8 text-center"
      >
        {content.metrics.map((metric: { value: string; label: string }, i: number) => (
          <div key={i}>
            <AnimatedCounter target={metric.value} suffix={metric.value.includes('%') ? '' : ''} />
            <p className="text-text-secondary text-[13px] mt-2 font-sans">{metric.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
