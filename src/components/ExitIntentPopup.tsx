"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { trackLead } from "@/components/Analytics";

export default function ExitIntentPopup() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("stratix_exit_seen");
    if (hasSeenPopup) return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        setIsOpen(true);
        sessionStorage.setItem("stratix_exit_seen", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
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
          source: "Exit Intent Popup" 
        })
      });
      trackLead("exit_intent_popup");
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 2000);
    } catch (err) {
      console.error("Error:", err);
      setSubmitted(true);
    }
  };

  const handleClose = () => setIsOpen(false);

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
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #0d1017 0%, #151922 100%)",
              border: "1px solid rgba(212,175,55,0.4)",
              borderRadius: "24px",
              padding: "clamp(24px, 5vw, 48px)",
              maxWidth: "480px",
              width: "100%",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 0 60px rgba(212,175,55,0.2)",
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
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "36px",
            }}>
              🎁
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "28px",
                  color: "#f0f2f8",
                  marginBottom: "12px"
                }}>
                  {lang === "es" ? "¡Te mandamos los tips!" : "Sending you the tips!"}
                </h3>
                <p style={{ color: "#8892a4" }}>
                  {lang === "es" ? "Revisa tu email en 2 minutos" : "Check your email in 2 minutes"}
                </p>
              </motion.div>
            ) : (
              <>
                <span style={{
                  background: "rgba(212,175,55,0.2)",
                  color: "#D4AF37",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}>
                  {lang === "es" ? "ÚLTIMO MOMENTO" : "LAST CHANCE"}
                </span>

                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(22px, 5vw, 32px)",
                  color: "#f0f2f8",
                  marginTop: "16px",
                  marginBottom: "12px",
                  lineHeight: 1.2,
                }}>
                  {lang === "es" 
                    ? "¿Te vas sin ver esto?" 
                    : "Leaving without this?"}
                </h3>

                <p style={{
                  color: "#8892a4",
                  fontSize: "15px",
                  marginBottom: "24px",
                  lineHeight: 1.6,
                }}>
                  {lang === "es" 
                    ? "Obtén nuestro informe gratuito: \"5 formas de duplicar ventas con IA\" antes de irte."
                    : "Get our free report: \"5 ways to double sales with AI\" before you go."}
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "es" ? "Tu mejor email..." : "Your best email..."}
                    required
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.08)",
                      color: "#f0f2f8",
                      fontSize: "16px",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "16px 24px",
                      borderRadius: "12px",
                      border: "none",
                      background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
                      color: "#030a05",
                      fontSize: "16px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {lang === "es" ? "Enviarme el informe gratis →" : "Send me the free report →"}
                  </motion.button>
                </form>

                <p style={{
                  fontSize: "11px",
                  color: "#4a5568",
                  marginTop: "16px",
                }}>
                  {lang === "es" 
                    ? "Sin spam. Solo contenido de valor." 
                    : "No spam. Only valuable content."}
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}