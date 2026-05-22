"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

const OFFERS_LEFT = 7;

export default function ScarcityPopup() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [offers, setOffers] = useState(OFFERS_LEFT);

  useEffect(() => {
    const hasSeen = localStorage.getItem("stratix_scarcity_seen");
    const lastSeen = localStorage.getItem("stratix_scarcity_time");
    const now = Date.now();
    
    if (!lastSeen || now - parseInt(lastSeen) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setOffers(Math.floor(Math.random() * 5) + 3);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      
      setCountdown({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("stratix_scarcity_seen", "true");
    localStorage.setItem("stratix_scarcity_time", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-[100px] left-5 z-[9998] max-w-[340px] bg-gradient-to-br from-[#1a1f2e] to-[#0d1017] border border-accent/30 rounded-[16px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-transparent border-none text-text-muted text-base cursor-pointer"
          >
            ×
          </button>

          <div className="flex gap-3 items-start">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>

            <div>
              <div className="text-[#ef4444] text-xs font-semibold mb-1 uppercase tracking-[0.5px]">
                ⚡ {lang === "es" ? "Oferta limitada" : "Limited offer"}
              </div>
              <div className="text-text-primary text-sm font-semibold mb-2">
                {lang === "es" 
                  ? `Solo quedan ${offers} cupos gratis` 
                  : `Only ${offers} free spots left`}
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1 text-[11px] text-text-muted">
                  <span className="bg-white/10 px-[6px] py-[4px] rounded font-mono text-text-primary">
                    {String(countdown.hours).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="bg-white/10 px-[6px] py-[4px] rounded font-mono text-text-primary">
                    {String(countdown.minutes).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="bg-white/10 px-[6px] py-[4px] rounded font-mono text-text-primary">
                    {String(countdown.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <a
            href="/login"
            className="block text-center mt-4 p-[10px] rounded-xl bg-gradient-to-br from-accent to-accent2 text-[#030a05] text-[13px] font-semibold no-underline"
          >
            {lang === "es" ? "¡Reservar mi lugar!" : "Reserve my spot!"}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
