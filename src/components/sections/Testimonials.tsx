"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

const TESTIMONIALS = {
  es: [
    { text: "Cerramos 3 propiedades en 2 semanas sin atender WhatsApp manualmente.", author: "María González", role: "Directora Comercial · Inmobiliaria Cúcuta", initials: "MG" },
    { text: "Nuestro chatbot se convirtió en una máquina de ventas 24/7.", author: "Carlos Mendoza", role: "CEO · TiendaTech", initials: "CM" },
    { text: "Reducimos citas perdidas por falta de respuesta en un 85%.", author: "Andrea Ruiz", role: "Gerenta de Operaciones · Clínica Dental Plus", initials: "AR" },
  ],
  en: [
    { text: "We closed 3 properties in 2 weeks without manually handling WhatsApp.", author: "María González", role: "Commercial Director · Real Estate", initials: "MG" },
    { text: "Our chatbot became a 24/7 sales machine.", author: "Carlos Mendoza", role: "CEO · TechStore", initials: "CM" },
    { text: "We reduced missed appointments due to lack of response by 85%.", author: "Andrea Ruiz", role: "Operations Manager · Dental Clinic", initials: "AR" },
  ],
};

export default function Testimonials() {
  const { lang, t } = useLang();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const testimonials = TESTIMONIALS[lang];

  return (
    <section style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ width: '24px', height: '1px', background: '#D4AF37' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.12em', color: '#D4AF37', textTransform: 'uppercase' }}>{t.testimonials.label}</span>
      </div>
      
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '48px', color: '#f0f2f8' }}>
        {t.testimonials.title}<br />
        <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.testimonials.titleEm}</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {testimonials.map((testimonial, i) => (
          <motion.div 
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ 
              position: 'relative', 
              borderRadius: '20px', 
              padding: '28px', 
              background: '#0d1017', 
              border: hoveredIndex === i ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.07)',
              transition: 'all 0.3s ease',
              boxShadow: hoveredIndex === i ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '24px', 
                fontFamily: "'DM Serif Display', Georgia, serif", 
                fontSize: '5rem', 
                color: '#D4AF37', 
                opacity: hoveredIndex === i ? 0.2 : 0.1, 
                lineHeight: 1,
                transition: 'all 0.3s ease',
              }}
            >"</motion.div>
            
            <motion.div 
              style={{ 
                color: '#D4AF37', 
                fontSize: '12px', 
                letterSpacing: '2px', 
                marginBottom: '16px',
              }}
            >
              ★★★★★
            </motion.div>
            
            <motion.p 
              style={{ 
                fontSize: '14px', 
                color: '#8892a4', 
                lineHeight: 1.7, 
                marginBottom: '24px', 
                fontStyle: 'italic',
              }}
            >
              "{testimonial.text}"
            </motion.p>
            
            <motion.div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  fontFamily: "'DM Mono', monospace", 
                  background: 'rgba(212,175,55,0.1)', 
                  color: '#D4AF37' 
                }}
              >
                {testimonial.initials}
              </motion.div>
              
              <motion.div>
                <motion.div 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: 500, 
                    color: hoveredIndex === i ? '#D4AF37' : '#f0f2f8',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {testimonial.author}
                </motion.div>
                <motion.div 
                  style={{ 
                    fontSize: '12px', 
                    color: '#4a5568', 
                    fontFamily: "'DM Mono', monospace" 
                  }}
                >
                  {testimonial.role}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}