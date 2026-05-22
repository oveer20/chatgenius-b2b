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
  const testimonials = TESTIMONIALS[lang as keyof typeof TESTIMONIALS];

  return (
    <section className="py-16 lg:py-32 px-6 md:px-16 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-6 h-0.5 bg-accent" />
        <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">{t.testimonials.label}</span>
      </div>
      
      <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] mb-12 text-text-primary">
        {t.testimonials.title}<br />
        <em className="text-accent">{t.testimonials.titleEm}</em>
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
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
            className={`relative rounded-2xl p-7 bg-bg3 transition-all duration-300 ease-out ${hoveredIndex === i ? 'border-accent/30 shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'border-white/5'}`}
          >
            <motion.div 
              className={`absolute top-4 right-6 font-serif text-5xl text-accent leading-none transition-all duration-300 ease-out ${hoveredIndex === i ? 'opacity-20' : 'opacity-10'}`}
            >"</motion.div>
            
            <motion.div 
              className="text-accent text-xs tracking-[2px] mb-4"
            >
              ★★★★★
            </motion.div>
            
            <motion.p 
              className="text-sm text-text-secondary leading-[1.7] mb-6 italic"
            >
              "{testimonial.text}"
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-3"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="size-9 rounded-full flex items-center justify-center text-xs font-semibold font-mono bg-accent/10 text-accent"
              >
                {testimonial.initials}
              </motion.div>
              
              <motion.div>
                <motion.div 
                  className={`text-sm font-medium transition-all duration-300 ease-out ${hoveredIndex === i ? 'text-accent' : 'text-text-primary'}`}
                >
                  {testimonial.author}
                </motion.div>
                <motion.div 
                  className="text-xs text-text-muted font-mono"
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
