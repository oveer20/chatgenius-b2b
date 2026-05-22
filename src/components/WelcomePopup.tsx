"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { trackLead } from "@/components/Analytics";

interface FormData {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  mensaje: string;
}

export default function WelcomePopup() {
  const { lang } = useLang();
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    mensaje: "",
  });

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("stratix_popup_seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.nombre) return;

    setLoading(true);
    try {
      await fetch("/api/leads/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.nombre,
          company: formData.empresa,
          phone: formData.telefono,
          message: formData.mensaje,
          source: "Multi-step Popup",
        }),
      });
      trackLead("multistep_popup");
      sessionStorage.setItem("stratix_popup_seen", "true");
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 2500);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("stratix_popup_seen", "true");
    setIsOpen(false);
  };

  const nextStep = () => {
    if (step === 1 && formData.nombre && formData.email) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const inputClasses = "w-full px-[18px] py-[14px] rounded-xl border border-white/15 bg-white/5 text-text-primary text-[15px] outline-none font-sans transition-[border-color] duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-[8px] z-[9999] flex items-center justify-center p-5"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#0d1017] to-[#151922] border border-accent/30 rounded-[24px] p-[clamp(24px,5vw,40px)] max-w-[480px] w-full relative overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white/10 border-none rounded-full w-8 h-8 cursor-pointer text-text-muted text-[18px] flex items-center justify-center"
            >
              ×
            </button>

            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-[4px] rounded-[2px] transition-[background] duration-300 ${
                    s <= step ? "bg-accent" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-5"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center mx-auto mb-5">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h3 className="font-serif text-[24px] text-text-primary mb-2">
                  {lang === "es" ? "¡Gracias!" : "Thank you!"}
                </h3>
                <p className="text-text-muted text-sm">
                  {lang === "es" 
                    ? "Un experto te contactará en minutos" 
                    : "An expert will contact you in minutes"}
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-serif text-[clamp(20px,4vw,28px)] text-text-primary text-center mb-2">
                  {step === 1 && (lang === "es" ? "Hablemos" : "Let's talk")}
                  {step === 2 && (lang === "es" ? "¿En qué podemos ayudarte?" : "How can we help?")}
                  {step === 3 && (lang === "es" ? "Tu info para contactarte" : "Your info to reach you")}
                </h3>
                <p className="text-text-muted text-sm text-center mb-6">
                  {step === 1 && (lang === "es" 
                    ? "Cuéntanos brevemente quién eres" 
                    : "Tell us briefly who you are")}
                  {step === 2 && (lang === "es" 
                    ? "Selecciona tu área de interés" 
                    : "Select your area of interest")}
                  {step === 3 && (lang === "es" 
                    ? "Último paso" 
                    : "Last step")}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {step === 1 && (
                    <>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        placeholder={lang === "es" ? "Tu nombre *" : "Your name *"}
                        required
                        className={inputClasses}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={lang === "es" ? "Tu email *" : "Your email *"}
                        required
                        className={inputClasses}
                      />
                      <input
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                        placeholder={lang === "es" ? "Nombre de tu empresa" : "Your company name"}
                        className={inputClasses}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-[10px]">
                      {[
                        lang === "es" ? "Automatización de ventas" : "Sales automation",
                        lang === "es" ? "Atención al cliente IA" : "AI customer service",
                        lang === "es" ? "Agentes para WhatsApp/Business" : "Agents for WhatsApp/Business",
                        lang === "es" ? "Otro" : "Other",
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, mensaje: option});
                            setStep(3);
                          }}
                          className="px-[18px] py-[14px] rounded-xl border border-white/15 bg-white/5 text-text-primary text-[15px] cursor-pointer text-left transition-all duration-200 hover:border-accent hover:bg-accent/10"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 3 && (
                    <>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        placeholder={lang === "es" ? "Tu WhatsApp" : "Your WhatsApp"}
                        className={inputClasses}
                      />
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        placeholder={lang === "es" ? "Mensaje adicional (opcional)" : "Additional message (optional)"}
                        rows={3}
                        className={`${inputClasses} resize-none`}
                      />
                    </>
                  )}

                  {step < 3 && (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-[14px] rounded-xl border-none bg-accent text-[#030a05] text-[15px] font-semibold cursor-pointer font-sans mt-2"
                    >
                      {lang === "es" ? "Continuar →" : "Continue →"}
                    </motion.button>
                  )}

                  {step === 3 && (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-[14px] rounded-xl border-none text-[15px] font-semibold font-sans ${
                        loading
                          ? "bg-[#666] text-[#030a05] cursor-not-allowed"
                          : "bg-accent text-[#030a05] cursor-pointer"
                      }`}
                    >
                      {loading 
                        ? (lang === "es" ? "Enviando..." : "Sending...") 
                        : (lang === "es" ? "Solicitar demo →" : "Request demo →")}
                    </motion.button>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
