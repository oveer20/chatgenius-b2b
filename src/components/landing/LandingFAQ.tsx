"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronDown, FiCheck, FiMail, FiMapPin } from "react-icons/fi";
import { toast } from "sonner";

export default function LandingFAQ() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "", honey: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '400px' }} />;

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honey) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/widget/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId: "demo", name: formData.name, email: formData.email, phone: formData.message, company: formData.company })
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("¡Solicitud enviada! Te contactaremos pronto.");
      } else {
        toast.error("Hubo un error. Intenta de nuevo.");
      }
    } catch (err) {
      toast.error("Hubo un error. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { q: "¿Cuánto tiempo tarda en configurarse?", a: "En 24-48 horas tienes tu agente listo. Solo necesitamos tus documentos de referencia y configuración básica." },
    { q: "¿Qué pasa si ya tengo equipo de atención?", a: "Stratix funciona como asistente 24/7, no reemplaza a tu equipo. Reduce la carga operativa en un 60%." },
    { q: "¿Se puede integrar con mi sistema actual?", a: "Sí. Conectamos con Shopify, WooCommerce, CRMs, ERPs y cualquier API REST o webhook." },
    { q: "¿Qué idiomas soporta?", a: "Español, inglés y portugués disponibles. Traducción automática integrada." },
    { q: "¿Hay período de prueba?", a: "14 días gratis sin compromiso. Sin tarjeta requerida." }
  ];

  return (
    <>
      <section id="demo" style={{ padding: '10rem 5%', background: '#0B1120' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Demo</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '1.5rem' }}>¿Listo para<span style={{ color: '#D4AF37' }}> comenzar?</span></motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ opacity: 0.5, marginBottom: '2rem', fontSize: '1.1rem' }}>Agenda una demo personalizada sin costo.</motion.p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {['Diagnóstico Gratis', 'ROI Personalizado', 'Sin Compromiso'].map((b, i) => (
                <motion.div key={b} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <FiCheck color="#10B981" size={20} /> 
                  <span style={{ fontWeight: 600, fontSize: '1rem' }}>{b}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>¡Solicitud Enviada!</h3>
                <p style={{ opacity: 0.5 }}>Te contactaremos en las próximos minutos.</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="text" name="honey" style={{ display: 'none' }} value={formData.honey} onChange={e => setFormData({...formData, honey: e.target.value})} />
                {[{ label: 'Nombre completo', key: 'name', type: 'text' }, { label: 'Empresa', key: 'company', type: 'text' }, { label: 'Email corporativo', key: 'email', type: 'email' }, { label: 'WhatsApp', key: 'message', type: 'tel' }].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.45, marginBottom: '0.5rem' }}>{f.label}</label>
                    <input 
                      required 
                      type={f.type} 
                      value={formData[f.key as keyof typeof formData]} 
                      onChange={e => setFormData({...formData, [f.key]: e.target.value})} 
                      style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', fontSize: '1rem' }} 
                    />
                  </div>
                ))}
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  style={{ width: '100%', padding: '18px', background: '#D4AF37', color: '#000', borderRadius: '14px', fontWeight: 900, cursor: 'pointer', border: 'none', fontSize: '1rem', marginTop: '0.5rem' }}
                >
                  {isSubmitting ? 'PROCESANDO...' : 'SOLICITAR DEMO'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '10rem 5%', background: '#030712' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FAQ</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-2px' }}>Todo lo que<span style={{ color: '#D4AF37' }}> necesitas saber</span></h2>
        </div>
        
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', overflow: 'hidden', marginBottom: '0.9rem' }}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{faq.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <FiChevronDown color="#D4AF37" size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 2rem 1.8rem', opacity: 0.5, lineHeight: 1.8, fontSize: '1rem' }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}