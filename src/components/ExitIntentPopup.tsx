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
          className="fixed inset-0 bg-black/85 backdrop-blur-[10px] z-[99999] flex items-center justify-center p-5"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#0d1017] to-[#151922] border border-accent/40 rounded-[24px] p-[clamp(24px,5vw,48px)] max-w-[480px] w-full text-center relative shadow-[0_0_60px_rgba(212,175,55,0.2)]"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white/10 border-none rounded-full w-8 h-8 cursor-pointer text-text-muted text-xl flex items-center justify-center"
            >
              ×
            </button>

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center mx-auto mb-6 text-[36px]">
              🎁
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="font-serif text-[28px] text-text-primary mb-3">
                  {lang === "es" ? "¡Te mandamos los tips!" : "Sending you the tips!"}
                </h3>
                <p className="text-text-muted">
                  {lang === "es" ? "Revisa tu email en 2 minutos" : "Check your email in 2 minutes"}
                </p>
              </motion.div>
            ) : (
              <>
                <span className="bg-accent/20 text-accent px-3 py-[4px] rounded-[12px] text-xs font-semibold">
                  {lang === "es" ? "ÚLTIMO MOMENTO" : "LAST CHANCE"}
                </span>

                <h3 className="font-serif text-[clamp(22px,5vw,32px)] text-text-primary mt-4 mb-3 leading-tight">
                  {lang === "es" 
                    ? "¿Te vas sin ver esto?" 
                    : "Leaving without this?"}
                </h3>

                <p className="text-text-muted text-[15px] mb-6 leading-relaxed">
                  {lang === "es" 
                    ? "Obtén nuestro informe gratuito: \"5 formas de duplicar ventas con IA\" antes de irte."
                    : "Get our free report: \"5 ways to double sales with AI\" before you go."}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "es" ? "Tu mejor email..." : "Your best email..."}
                    required
                    className="px-5 py-4 rounded-xl border border-white/20 bg-white/5 text-text-primary text-base outline-none text-center"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 rounded-xl border-none bg-gradient-to-br from-accent to-accent2 text-[#030a05] text-base font-bold cursor-pointer"
                  >
                    {lang === "es" ? "Enviarme el informe gratis →" : "Send me the free report →"}
                  </motion.button>
                </form>

                <p className="text-[11px] text-[#4a5568] mt-4">
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
