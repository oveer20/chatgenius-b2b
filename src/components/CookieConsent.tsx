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
      className="fixed bottom-0 left-0 right-0 z-[99999] bg-gradient-to-br from-[#0d1017] to-[#1a1f2e] border-t border-accent/10 p-5 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="text-[32px] shrink-0">🍪</div>
          <div>
            <h3 className="font-serif text-[18px] text-text-primary mb-2">
              {lang === "es" ? "Política de Cookies" : "Cookie Policy"}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {lang === "es"
                ? "Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Al continuar, aceptas nuestra "
                : "We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our "}
              <a
                href="/legal/privacy"
                className="text-accent underline"
              >
                {lang === "es" ? "política de privacidad" : "privacy policy"}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <motion.button
            onClick={acceptCookies}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-[10px] border-none bg-gradient-to-br from-accent to-accent2 text-[#030a05] font-semibold text-sm cursor-pointer"
          >
            {lang === "es" ? "Aceptar cookies" : "Accept cookies"}
          </motion.button>
          <motion.button
            onClick={declineCookies}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-[10px] border border-white/20 bg-transparent text-text-muted font-semibold text-sm cursor-pointer"
          >
            {lang === "es" ? "Rechazar" : "Decline"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
