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
    
    // Show every 24 hours
    if (!lastSeen || now - parseInt(lastSeen) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Random reduce offers
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
          style={{
            position: "fixed",
            bottom: "100px",
            left: "20px",
            zIndex: 9998,
            maxWidth: "340px",
            background: "linear-gradient(135deg, #1a1f2e 0%, #0d1017 100%)",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "transparent",
              border: "none",
              color: "#8892a4",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <div style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>

            <div>
              <div style={{
                color: "#ef4444",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}>
                ⚡ {lang === "es" ? "Oferta limitada" : "Limited offer"}
              </div>
              <div style={{
                color: "#f0f2f8",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
              }}>
                {lang === "es" 
                  ? `Solo quedan ${offers} cupos gratis` 
                  : `Only ${offers} free spots left`}
              </div>
              <div style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}>
                <div style={{
                  display: "flex",
                  gap: "4px",
                  fontSize: "11px",
                  color: "#8892a4",
                }}>
                  <span style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "4px 6px",
                    borderRadius: "4px",
                    fontFamily: "'DM Mono', monospace",
                    color: "#f0f2f8",
                  }}>
                    {String(countdown.hours).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "4px 6px",
                    borderRadius: "4px",
                    fontFamily: "'DM Mono', monospace",
                    color: "#f0f2f8",
                  }}>
                    {String(countdown.minutes).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "4px 6px",
                    borderRadius: "4px",
                    fontFamily: "'DM Mono', monospace",
                    color: "#f0f2f8",
                  }}>
                    {String(countdown.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <a
            href="/login"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "16px",
              padding: "10px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
              color: "#030a05",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {lang === "es" ? "¡Reservar mi lugar!" : "Reserve my spot!"}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}