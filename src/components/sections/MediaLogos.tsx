"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function MediaLogos() {
  const { lang } = useLang();
  const mediaOutlets = [
    { name: "Portafolio", logo: "P" },
    { name: "Semana", logo: "S" },
    { name: "El Tiempo", logo: "ET" },
    { name: "Dinero", logo: "$" },
    { name: "La República", logo: "LR" },
  ];

  return (
    <section style={{
      padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(0,0,0,0.2)',
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
        {lang === "es" ? "Medios que mencionan Stratix" : "Media mentioning Stratix"}
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          color: '#4a5568',
          fontSize: '12px',
          letterSpacing: '0.1em',
          marginBottom: '20px',
          textTransform: 'uppercase',
        }}
      >
        {lang === "es" ? "Destacados en medios" : "Mentioned in top media"}
      </motion.p>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(2rem, 6vw, 4rem)',
        flexWrap: 'wrap',
        opacity: 0.5,
      }}>
        {mediaOutlets.map((media, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              color: '#8892a4',
              fontWeight: 400,
            }}
          >
            {media.logo}
          </motion.div>
        ))}
      </div>
    </section>
  );
}