"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { trackLead } from "@/components/Analytics";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar } from "react-icons/fi";
import { CALENDLY_URL } from "@/lib/constants";

export default function LeadCapture() {
  const { lang } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    
    setLoading(true);
    
    try {
      await fetch("/api/leads/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData,
          source: "Lead Capture Form" 
        })
      });
      
      const leads = JSON.parse(localStorage.getItem("stratix_leads") || "[]");
      leads.push({ ...formData, date: new Date().toISOString() });
      localStorage.setItem("stratix_leads", JSON.stringify(leads));
      
      trackLead("lead_capture_form");
      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          background: 'rgba(212,175,55,0.1)',
          borderRadius: '20px',
          border: '1px solid rgba(212,175,55,0.3)'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '24px', color: '#f0f2f8', marginBottom: '8px' }}>
          {lang === "es" ? "¡Gracias! Te contactamos pronto" : "Thanks! We'll contact you soon"}
        </h3>
        <p style={{ color: '#8892a4', fontSize: '14px', marginBottom: '24px' }}>
          {lang === "es" ? "Revisa tu email, tenemos algo especial para ti" : "Check your email, we have something special for you"}
        </p>
        
        <motion.a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            borderRadius: '12px',
            border: '1px solid rgba(212,175,55,0.4)',
            color: '#D4AF37',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          <FiCalendar />
          {lang === "es" ? "Agendar demo ahora" : "Schedule demo now"}
        </motion.a>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ maxWidth: '500px', margin: '0 auto' }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <FiUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8892a4' }} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={lang === "es" ? "Tu nombre" : "Your name"}
            required
            style={{
              ...inputStyle,
              paddingLeft: '42px',
            }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8892a4' }} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={lang === "es" ? "Tu email" : "Your email"}
            required
            style={{
              ...inputStyle,
              paddingLeft: '42px',
            }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <FiPhone style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8892a4' }} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={lang === "es" ? "WhatsApp (opcional)" : "WhatsApp (optional)"}
            style={{
              ...inputStyle,
              paddingLeft: '42px',
            }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <FiBriefcase style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8892a4' }} />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={lang === "es" ? "Empresa (opcional)" : "Company (optional)"}
            style={{
              ...inputStyle,
              paddingLeft: '42px',
            }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '16px 24px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            color: '#030a05',
            fontSize: '16px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {loading ? (lang === "es" ? "Enviando..." : "Sending...") : (lang === "es" ? "Comenzar ahora →" : "Get started →")}
        </motion.button>
      </form>
      
      <p style={{ fontSize: '12px', color: '#4a5568', marginTop: '16px', textAlign: 'center' }}>
        {lang === "es" 
          ? "Sin compromiso. Te contactamos en menos de 24h." 
          : "No commitment. We'll contact you within 24h."}
      </p>
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: '#f0f2f8',
  fontSize: '15px',
  outline: 'none',
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: 'border-box',
};