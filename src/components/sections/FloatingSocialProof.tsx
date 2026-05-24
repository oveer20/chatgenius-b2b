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
  const proofs = PROOFS[lang as 'es' | 'en'];
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setCurrent(0);
    setVisible(true);
    let hideTimeout: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setVisible(false);
      hideTimeout = setTimeout(() => {
        setCurrent(prev => (prev + 1) % proofs.length);
        setVisible(true);
      }, 500);
    }, 12000);
    return () => {
      clearInterval(id);
      clearTimeout(hideTimeout);
    };
  }, [proofs]);

  const p = proofs[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-[9999] max-w-[340px] px-[18px] py-[14px] bg-bg/95 backdrop-blur-xl border border-accent/20 rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.1)]"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-[13px] font-bold text-black">
                {p.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-bg" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-text-primary mb-0.5">
                {p.city}
              </div>
              <div className="text-[12px] text-text-secondary">
                {p.name} — {p.action}
              </div>
            </div>
            <div className="text-[11px] text-text-muted whitespace-nowrap">
              {p.time}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
