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

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#f0f2f8",
    fontSize: "15px",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
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
            background: "rgba(0,0,0,0.85)",
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
              maxWidth: "480px",
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

            {/* Progress indicator */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: "4px",
                    borderRadius: "2px",
                    background: s <= step ? "#D4AF37" : "rgba(255,255,255,0.1)",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "20px 0" }}
              >
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "24px",
                  color: "#f0f2f8",
                  marginBottom: "8px"
                }}>
                  {lang === "es" ? "¡Gracias!" : "Thank you!"}
                </h3>
                <p style={{ color: "#8892a4", fontSize: "14px" }}>
                  {lang === "es" 
                    ? "Un experto te contactará en minutos" 
                    : "An expert will contact you in minutes"}
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
                  {step === 1 && (lang === "es" ? "Hablemos" : "Let's talk")}
                  {step === 2 && (lang === "es" ? "¿En qué podemos ayudarte?" : "How can we help?")}
                  {step === 3 && (lang === "es" ? "Tu info para contactarte" : "Your info to reach you")}
                </h3>
                <p style={{
                  color: "#8892a4",
                  fontSize: "14px",
                  textAlign: "center",
                  marginBottom: "24px",
                }}>
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

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {step === 1 && (
                    <>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        placeholder={lang === "es" ? "Tu nombre *" : "Your name *"}
                        required
                        style={inputStyle}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={lang === "es" ? "Tu email *" : "Your email *"}
                        required
                        style={inputStyle}
                      />
                      <input
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                        placeholder={lang === "es" ? "Nombre de tu empresa" : "Your company name"}
                        style={inputStyle}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        lang === "es" ? "Automatización de ventas" : "Sales automation",
                        lang === "es" ? "Atención al cliente IA" : "AI customer service",
                        lang === "es" ? "Agentes paraWhatsApp/Business" : "Agents for WhatsApp/Business",
                        lang === "es" ? "Otro" : "Other",
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, mensaje: option});
                            setStep(3);
                          }}
                          style={{
                            padding: "14px 18px",
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            background: "rgba(255,255,255,0.05)",
                            color: "#f0f2f8",
                            fontSize: "15px",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#D4AF37";
                            e.currentTarget.style.background = "rgba(212,175,55,0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          }}
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
                        style={inputStyle}
                      />
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        placeholder={lang === "es" ? "Mensaje adicional (opcional)" : "Additional message (optional)"}
                        rows={3}
                        style={{ ...inputStyle, resize: "none" }}
                      />
                    </>
                  )}

                  {step < 3 && (
                    <motion.button
                      type="button"
                      onClick={nextStep}
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
                        marginTop: "8px",
                      }}
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
                      style={{
                        padding: "14px 24px",
                        borderRadius: "12px",
                        border: "none",
                        background: loading ? "#666" : "#D4AF37",
                        color: "#030a05",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
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