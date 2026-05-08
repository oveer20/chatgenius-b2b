"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

const PROOFS = {
  es: [
    { city: "Bogotá", name: "Carlos M.", action: "acabó de activar su agente IA", time: "hace 1 min" },
    { city: "Medellín", name: "Laura V.", action: "cerró una cita de demostración", time: "hace 3 min" },
    { city: "Cali", name: "Andrés R.", action: "generó 12 leads en 2 horas", time: "hace 5 min" },
    { city: "Barranquilla", name: "María G.", action: "calificó 47 leads automáticamente", time: "hace 7 min" },
    { city: "Bucaramanga", name: "Roberto S.", action: "configuró su bot en 12 minutos", time: "hace 10 min" },
    { city: "Cartagena", name: "Patricia M.", action: "aumentó sus respuestas un 89%", time: "hace 12 min" },
  ],
  en: [
    { city: "New York", name: "James W.", action: "just activated their AI agent", time: "1 min ago" },
    { city: "London", name: "Sarah K.", action: "closed a demo appointment", time: "3 min ago" },
    { city: "Toronto", name: "Mike R.", action: "generated 12 leads in 2 hours", time: "5 min ago" },
    { city: "Miami", name: "Ana L.", action: "scored 47 leads automatically", time: "7 min ago" },
    { city: "Chicago", name: "David M.", action: "configured their bot in 12 minutes", time: "10 min ago" },
    { city: "Austin", name: "Lisa P.", action: "increased responses by 89%", time: "12 min ago" },
  ],
};

export default function FloatingSocialProof() {
  const { lang } = useLang();
  const proofs = PROOFS[lang as keyof typeof PROOFS];
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    show();
    const id = setInterval(() => {
      hide();
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % proofs.length);
        show();
      }, 500);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  const p = proofs[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            maxWidth: '340px',
            padding: '14px 18px',
            background: 'rgba(13,16,23,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '14px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#000' }}>
                {p.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', border: '2px solid #0d1017' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f2f8', marginBottom: '2px' }}>
                {p.city}
              </div>
              <div style={{ fontSize: '12px', color: '#8892a4' }}>
                {p.name} — {p.action}
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#4a5568', whiteSpace: 'nowrap' }}>
              {p.time}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}