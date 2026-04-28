"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function TrustBadges() {
  const { lang } = useLang();
  
  const badges = [
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      titleEs: "14 Días de Garantía",
      titleEn: "14 Days Guarantee",
      descEs: "Si no ves resultados, te devolvemos tu dinero",
      descEn: "If you don't see results, we refund your money",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      titleEs: "Activación en 15 Min",
      titleEn: "Setup in 15 Min",
      descEs: "Sin conocimientos técnicos necesarios",
      descEn: "No technical knowledge required",
    },
    {
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      titleEs: "Soporte 24/7",
      titleEn: "24/7 Support",
      descEs: "Siempre hay alguien para ayudarte",
      descEn: "There's always someone to help you",
    },
    {
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      titleEs: "Datos Encriptados",
      titleEn: "Encrypted Data",
      descEs: "Tu información está segura con nosotros",
      descEn: "Your information is safe with us",
    },
  ];

  return (
    <section style={{
      padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'clamp(1rem, 3vw, 2rem)',
      }}>
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
              </svg>
            </div>
            <h4 style={{
              color: '#f0f2f8',
              fontSize: '15px',
              fontWeight: 600,
              marginBottom: '6px',
            }}>
              {lang === "es" ? badge.titleEs : badge.titleEn}
            </h4>
            <p style={{
              color: '#8892a4',
              fontSize: '13px',
              lineHeight: 1.4,
            }}>
              {lang === "es" ? badge.descEs : badge.descEn}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}