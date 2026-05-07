"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/components/LangContext";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const { lang } = useLang();
  
  return (
    <section style={{ 
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'rgba(212,175,55,0.03)',
      borderTop: '1px solid rgba(212,175,55,0.1)',
borderBottom: '1px solid rgba(212,175,55,0.1)',
      }}>
      <h2 style={{ 
        position: 'absolute', 
        width: '1px', 
        height: '1px', 
        padding: 0, 
        margin: '-1px', 
        overflow: 'hidden', 
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}>
        {lang === "es" ? "Resultados de Stratix Intelligence" : "Stratix Intelligence Results"}
      </h2>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'clamp(1.5rem, 4vw, 3rem)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: '#D4AF37',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            <Counter end={1847} suffix="+" />
          </div>
          <div style={{ color: '#8892a4', fontSize: '14px' }}>
            {lang === "es" ? "Empresas confían en nosotros" : "Companies trust us"}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: '#D4AF37',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            <Counter end={60} suffix="%" prefix="" duration={1500} />
          </div>
          <div style={{ color: '#8892a4', fontSize: '14px' }}>
            {lang === "es" ? "Reducción en costos de adquisición" : "Reduction in acquisition costs"}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: '#D4AF37',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            <Counter end={4.9} suffix="/5" prefix="" duration={2000} />
          </div>
          <div style={{ color: '#8892a4', fontSize: '14px' }}>
            {lang === "es" ? "Rating promedio de clientes" : "Average client rating"}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: '#D4AF37',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            24<span style={{ fontSize: '0.5em' }}>/7</span>
          </div>
          <div style={{ color: '#8892a4', fontSize: '14px' }}>
            {lang === "es" ? "Soporte y operación continua" : "Continuous support and operation"}
          </div>
        </motion.div>
      </div>
    </section>
  );
}