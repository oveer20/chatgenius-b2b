"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/components/LangContext";

function Counter({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || end <= 0) return;
    let start: number;
    const animate = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  if (end <= 0) return <span ref={ref}>{prefix}0{suffix}</span>;
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const COMPANIES = {
  es: ["Inmobiliaria Norte", "AutoElite Bogotá", "Clínica Sanar", "Consultora Apex", "EduPro Academy", "LogiTrans Colombia", "Grupo InmoPremium", "DentalCare Plus", "TechVentures", "Salud360"],
  en: ["North Realty", "AutoElite Bogotá", "Sanar Clinic", "Apex Consulting", "EduPro Academy", "LogiTrans Colombia", "InmoPremium Group", "DentalCare Plus", "TechVentures", "Salud360"],
};

const TESTIMONIALS = {
  es: [
    { text: "En 3 semanas recuperamos la inversión. El bot cierra citas mientras dormimos y nuestro equipo solo procesa ventas calificadas.", name: "Carlos Mendoza", role: "CEO", company: "AutoElite Bogotá", initials: "CM", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CM&backgroundColor=b8860b" },
    { text: "Pasamos de perder 40% de leads a convertir el 68%. Stratix responde en 2 segundos lo que antes tardábamos 20 minutos.", name: "María González", role: "Directora Comercial", company: "Grupo InmoPremium", initials: "MG", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=MG&backgroundColor=b8860b" },
    { text: "Nuestros pacientes agendan solos a las 3am. Antes perdíamos 15 citas diarias por no responder fuera de horario.", name: "Dra. Laura Vega", role: "Directora", company: "Clínica Sanar", initials: "LV", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=LV&backgroundColor=b8860b" },
    { text: "El scoring automático filtra leads basura. Nuestro equipo ahora solo habla con prospects que ya están listos para comprar.", name: "Andrés Ruiz", role: "VP Ventas", company: "TechVentures", initials: "AR", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=AR&backgroundColor=b8860b" },
    { text: "Configuramos todo en 12 minutos. Sin código, sin técnicos. Subimos nuestros PDFs y el bot aprendió todo nuestro catálogo.", name: "Patricia Morales", role: "Gerente Marketing", company: "EduPro Academy", initials: "PM", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=PM&backgroundColor=b8860b" },
    { text: "ROI del 340% en el primer trimestre. Best investment we've made. Ya lo expandimos a 3 países más.", name: "Roberto Sánchez", role: "COO", company: "LogiTrans Colombia", initials: "RS", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=b8860b" },
  ],
  en: [
    { text: "We recovered our investment in 3 weeks. The bot books appointments while we sleep and our team only processes qualified sales.", name: "Carlos Mendoza", role: "CEO", company: "AutoElite Bogotá", initials: "CM", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CM&backgroundColor=b8860b" },
    { text: "We went from losing 40% of leads to converting 68%. Stratix responds in 2 seconds what used to take us 20 minutes.", name: "María González", role: "Commercial Director", company: "InmoPremium Group", initials: "MG", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=MG&backgroundColor=b8860b" },
    { text: "Our patients book by themselves at 3am. We used to lose 15 appointments daily from not responding after hours.", name: "Dr. Laura Vega", role: "Director", company: "Sanar Clinic", initials: "LV", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=LV&backgroundColor=b8860b" },
    { text: "Automatic scoring filters out junk leads. Our team now only talks to prospects who are already ready to buy.", name: "Andrés Ruiz", role: "VP Sales", company: "TechVentures", initials: "AR", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=AR&backgroundColor=b8860b" },
    { text: "We set everything up in 12 minutes. No code, no technicians. We uploaded our PDFs and the bot learned our entire catalog.", name: "Patricia Morales", role: "Marketing Manager", company: "EduPro Academy", initials: "PM", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=PM&backgroundColor=b8860b" },
    { text: "340% ROI in the first quarter. Best investment we've made. We already expanded it to 3 more countries.", name: "Roberto Sánchez", role: "COO", company: "LogiTrans Colombia", initials: "RS", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=b8860b" },
  ],
};

export default function Stats() {
  const { lang } = useLang();
  const companies = COMPANIES[lang as keyof typeof COMPANIES];
  const testimonials = TESTIMONIALS[lang as keyof typeof TESTIMONIALS];
  const duplicated = [...companies, ...companies, ...companies];

  return (
    <section>
      <div className="py-[clamp(3rem,8vw,6rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[linear-gradient(180deg,rgba(212,175,55,0.04)_0%,transparent_100%)] border-t border-[rgba(212,175,55,0.12)] border-b border-white/4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-[clamp(2rem,4vw,3rem)]">
          <span className="font-mono text-[12px] tracking-[0.15em] text-accent uppercase">
            {lang === "es" ? "Impacto Real en Números" : "Real Impact in Numbers"}
          </span>
        </motion.div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(1rem,3vw,2rem)]">
          {[
            { value: <Counter end={1847} suffix="+" />, label: lang === "es" ? "Empresas activas" : "Active companies", sub: lang === "es" ? "y creciendo" : "and growing" },
            { value: <><Counter end={2} suffix=".4" />M+</>, label: lang === "es" ? "Leads atendidos" : "Leads handled", sub: lang === "es" ? "este mes" : "this month" },
            { value: "98.7%", label: lang === "es" ? "Satisfacción" : "Satisfaction", sub: lang === "es" ? "promedio clientes" : "client average" },
            { value: <><Counter end={3} suffix="x" /> ROI</>, label: lang === "es" ? "Retorno promedio" : "Average return", sub: lang === "es" ? "en 90 días" : "in 90 days" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-[clamp(1.5rem,3vw,2rem)]"
            >
              <div className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-accent leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[15px] font-medium text-text-primary mb-1">{stat.label}</div>
              <div className="text-[13px] text-text-muted">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="py-[clamp(2rem,5vw,3rem)] overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-[200px] bg-gradient-to-r from-bg to-transparent z-[2]" />
        <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-bg to-transparent z-[2]" />

        <div className="flex gap-[clamp(2.5rem,5vw,4rem)] w-fit animate-[scroll_30s_linear_infinite]">
          {duplicated.map((name, i) => (
            <div key={i} className="text-[clamp(14px,1.8vw,17px)] font-medium text-[#2d3748] whitespace-nowrap tracking-[0.5px]">
              {name}
            </div>
          ))}
        </div>
        <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
      </div>

      <div className="py-[clamp(3rem,8vw,6rem)] px-[clamp(1.5rem,5vw,4rem)] max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-[clamp(2rem,4vw,3rem)]">
          <span className="font-mono text-[12px] tracking-[0.15em] text-accent uppercase">
            {lang === "es" ? "Testimonios de Clientes" : "Client Testimonials"}
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.5rem)] text-text-primary mt-3">
            {lang === "es" ? "Lo que dicen quienes ya crecen con IA" : "What those who already grow with AI say"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Testimonial {
  text: string; name: string; role: string; company: string; initials: string; avatar: string;
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-lg p-[clamp(1.5rem,3vw,2rem)] transition-all duration-300 border ${
        hovered
          ? 'bg-white/4 border-accent/30 shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_60px_rgba(212,175,55,0.05)] -translate-y-1'
          : 'bg-white/2 border-white/6 shadow-none'
      }`}
    >
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(s => (
          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      <p className="text-[15px] text-[#c8ced8] leading-[1.7] mb-5 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        {avatarError ? (
          <div className="w-10 h-10 rounded-full bg-accent2/20 flex items-center justify-center text-sm font-bold text-accent shrink-0">
            {testimonial.initials}
          </div>
        ) : (
          <img src={testimonial.avatar} alt={testimonial.initials} onError={() => setAvatarError(true)} className="w-10 h-10 rounded-full bg-accent/10 shrink-0" />
        )}
        <div>
          <div className="text-sm font-semibold text-text-primary">{testimonial.name}</div>
          <div className="text-xs text-text-muted">{testimonial.role} &middot; {testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  );
}
