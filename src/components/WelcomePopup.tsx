"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { trackLead } from "@/components/Analytics";

export default function WelcomePopup() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("stratix_popup_seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/leads/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          source: "Welcome Popup" 
        })
      });
      trackLead("welcome_popup");
      sessionStorage.setItem("stratix_popup_seen", "true");
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 2000);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("stratix_popup_seen", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #0d1017 0%, #151922 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "24px",
              padding: "clamp(24px, 5vw, 40px)",
              maxWidth: "440px",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                color: "#8892a4",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            <div style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "28px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#000">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: "center" }}
              >
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "24px",
                  color: "#f0f2f8",
                  marginBottom: "8px"
                }}>
                  {lang === "es" ? "¡Te contactamos pronto!" : "We'll contact you soon!"}
                </h3>
                <p style={{ color: "#8892a4", fontSize: "14px" }}>
                  {lang === "es" ? "Revisa tu email en las próximas 24h" : "Check your email in the next 24h"}
                </p>
              </motion.div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(20px, 4vw, 28px)",
                  color: "#f0f2f8",
                  textAlign: "center",
                  marginBottom: "8px",
                }}>
                  {lang === "es" ? "¿Quieres una demo personalizada?" : "Want a personalized demo?"}
                </h3>
                <p style={{
                  color: "#8892a4",
                  fontSize: "14px",
                  textAlign: "center",
                  marginBottom: "24px",
                }}>
                  {lang === "es" 
                    ? "Déjanos tu email y te mostraremos cómo Stratix puede duplicar tus ventas."
                    : "Leave your email and we'll show you how Stratix can double your sales."}
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "es" ? "Tu email profesional..." : "Your professional email..."}
                    required
                    style={{
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#f0f2f8",
                      fontSize: "15px",
                      outline: "none",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "14px 24px",
                      borderRadius: "12px",
                      border: "none",
                      background: "#D4AF37",
                      color: "#030a05",
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {lang === "es" ? "Quiero mi demo gratis →" : "Get my free demo →"}
                  </motion.button>
                </form>

                <p style={{
                  fontSize: "11px",
                  color: "#4a5568",
                  textAlign: "center",
                  marginTop: "16px",
                }}>
                  {lang === "es" ? "Sin compromiso. 100% gratis." : "No commitment. 100% free."}
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}