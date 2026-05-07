"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function CookieConsent() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("stratix_cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("stratix_cookie_consent", "accepted");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("stratix_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        background: "linear-gradient(135deg, #0d1017 0%, #1a1f2e 100%)",
        borderTop: "1px solid rgba(212,175,55,0.3)",
        padding: "20px",
        boxShadow: "0 -4px 30px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ fontSize: "32px", flexShrink: 0 }}>🍪</div>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: "18px",
                color: "#f0f2f8",
                marginBottom: "8px",
              }}
            >
              {lang === "es" ? "Política de Cookies" : "Cookie Policy"}
            </h3>
            <p style={{ color: "#8892a4", fontSize: "14px", lineHeight: 1.6 }}>
              {lang === "es"
                ? "Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Al continuar, aceptas nuestra "
                : "We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our "}
              <a
                href="/legal/privacy"
                style={{ color: "#D4AF37", textDecoration: "underline" }}
              >
                {lang === "es" ? "política de privacidad" : "privacy policy"}
              </a>
              .
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <motion.button
            onClick={acceptCookies}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
              color: "#030a05",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {lang === "es" ? "Aceptar cookies" : "Accept cookies"}
          </motion.button>
          <motion.button
            onClick={declineCookies}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#8892a4",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {lang === "es" ? "Rechazar" : "Decline"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}