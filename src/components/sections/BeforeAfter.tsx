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

  return <div ref={ref} style={{ color: '#f0f2f8', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{display}</div>;
}

export default function BeforeAfter() {
  const { t, lang } = useLang();
  const content = CONTENT[lang as keyof typeof CONTENT];
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section style={{
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,95,86,0.12)',
          color: '#ff5f56',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '16px',
          letterSpacing: '0.5px',
        }}>
          {content.badge}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#f0f2f8',
        }}>
          {content.titlePart1} <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{content.titlePart2}</em>
        </h2>
      </motion.div>

      {/* Comparison Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '48px',
      }}>
        {/* Without Stratix */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onMouseEnter={() => setHoveredCard('without')}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            background: hoveredCard === 'without' ? 'rgba(239,68,68,0.04)' : 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '20px',
            padding: '32px',
            transition: 'all 0.3s ease',
            transform: hoveredCard === 'without' ? 'translateY(-4px)' : 'none',
            boxShadow: hoveredCard === 'without' ? '0 20px 40px rgba(239,68,68,0.1)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ef4444', fontSize: '18px', fontWeight: 700,
            }}>✗</div>
            <h3 style={{ color: '#ff5f56', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>{content.withoutTitle}</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {content.withoutItems.map((item: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: '12px', color: '#8892a4', fontSize: '14px', lineHeight: 1.6, alignItems: 'flex-start' }}
              >
                <span style={{ color: '#ef4444', flexShrink: 0, fontSize: '16px', marginTop: '1px' }}>✕</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* With Stratix */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onMouseEnter={() => setHoveredCard('with')}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            background: hoveredCard === 'with' ? 'rgba(212,175,55,0.04)' : 'rgba(13,16,23,0.6)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '20px',
            padding: '32px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            transform: hoveredCard === 'with' ? 'translateY(-4px)' : 'none',
            boxShadow: hoveredCard === 'with' ? '0 20px 40px rgba(212,175,55,0.1)' : 'none',
          }}
        >
          {/* Top gradient bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #D4AF37, #10b981, #D4AF37)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(16,185,129,0.1))',
              border: '1px solid rgba(212,175,55,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#D4AF37', fontSize: '18px', fontWeight: 700,
            }}>✓</div>
            <h3 style={{ color: '#D4AF37', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>{content.withTitle}</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {content.withItems.map((item: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: '12px', color: '#f0f2f8', fontSize: '14px', lineHeight: 1.6, alignItems: 'flex-start' }}
              >
                <span style={{ color: '#10b981', flexShrink: 0, fontSize: '16px', marginTop: '1px' }}>✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Metrics bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '24px',
          background: 'rgba(212,175,55,0.05)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        {content.metrics.map((metric: { value: string; label: string }, i: number) => (
          <div key={i}>
            <AnimatedCounter target={metric.value} suffix={metric.value.includes('%') ? '' : ''} />
            <p style={{ color: '#8892a4', fontSize: '13px', marginTop: '8px', fontFamily: 'var(--font-sans)' }}>{metric.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
