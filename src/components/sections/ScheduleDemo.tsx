"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export default function ScheduleDemo() {
  const { lang } = useLang();

  const handleSchedule = () => {
    if (window.Calendly) {
      const parent = document.getElementById("calendly-widget");
      if (parent) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/stratix-intelligence/demo",
          parentElement: parent,
          prefill: {},
          utm: {
            source: "landing_page",
          },
        });
      }
    }
  };

  return (
    <section style={{
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(13,16,23,1) 100%)',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 6vw, 4rem)',
        }}
      >
        <span style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '20px',
          letterSpacing: '0.5px',
        }}>
          AGENDA TU DEMO
        </span>

        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          color: '#f0f2f8',
          marginBottom: '12px',
        }}>
          {lang === "es" 
            ? "Habla con un experto en 30 minutos" 
            : "Talk to an expert in 30 minutes"}
        </h2>

        <p style={{
          color: '#8892a4',
          fontSize: '15px',
          marginBottom: '30px',
          lineHeight: 1.6,
        }}>
          {lang === "es"
            ? "Reserva una llamada personalizada. Te mostramos cómo Stratix puede duplicar tus ventas."
            : "Book a personalized call. We'll show you how Stratix can double your sales."}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <motion.a
            href="https://calendly.com/stratix-intelligence/demo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              color: '#030a05',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '15px',
              boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
            </svg>
            {lang === "es" ? "Reservar demo gratis" : "Book free demo"}
          </motion.a>

          <p style={{ color: '#4a5568', fontSize: '13px' }}>
            {lang === "es"
              ? "30 minutos • Sin compromiso • Respuesta inmediata"
              : "30 minutes • No commitment • Immediate response"}
          </p>
        </div>
      </motion.div>
    </section>
  );
}