"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { toast } from "sonner";

export default function LandingFAQ() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", honey: "" });
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
        body: JSON.stringify({ botId: "demo", name: formData.name, email: formData.email, phone: formData.phone, company: formData.company })
      });
      if (res.ok) setSubmitted(true);
      else toast.error("Hubo un error al procesar tu solicitud.");
    } catch (err) {
      toast.error("Hubo un error al procesar tu solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="demo" style={{ padding: '8rem 5%', background: '#0B1120' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1.8rem' }}>¿Listo para escalar <span style={{ color: '#D4AF37' }}>sin límites?</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {['Diagnóstico Gratis', 'ROI Proyectado', 'Sin Compromiso'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}><FiCheck color="#D4AF37" /> <span style={{ fontWeight: 600 }}>{b}</span></div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.8rem', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.2)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center' }}><h3>¡Solicitud Enviada!</h3><p>Te contactaremos pronto.</p></div>
            ) : (
              <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                <input type="text" name="honey" style={{ display: 'none' }} value={formData.honey} onChange={e => setFormData({...formData, honey: e.target.value})} />
                {[{ label: 'Nombre', key: 'name', type: 'text' }, { label: 'Empresa', key: 'company', type: 'text' }, { label: 'Email Corporativo', key: 'email', type: 'email' }, { label: 'WhatsApp', key: 'phone', type: 'tel' }].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '0.75rem', opacity: 0.45, marginBottom: '0.4rem' }}>{f.label}</label>
                    <input required type={f.type} value={formData[f.key as keyof typeof formData]} onChange={e => setFormData({...formData, [f.key]: e.target.value})} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                  </div>
                ))}
                <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '18px', background: '#D4AF37', color: '#000', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', border: 'none' }}>{isSubmitting ? 'PROCESANDO...' : 'SOLICITAR DEMO'}</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '12rem 5%', background: '#03070C' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 900, marginBottom: '6rem', letterSpacing: '-2px' }}>Consultas de <span style={{ color: '#D4AF37' }}>Alto Nivel</span></h2>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          {[
            { q: "¿Cómo garantiza Stratix el ROI?", a: "Nuestros agentes reducen el costo operativo en un 60% al automatizar tareas repetitivas." },
            { q: "¿Se puede integrar con mi CRM actual?", a: "Sí. Stratix se conecta vía webhooks con Salesforce, HubSpot, Zoho y cualquier sistema API." }
          ].map((faq, i) => (
            <div key={i} style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', overflow: 'hidden', marginBottom: '1rem' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '1.8rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{faq.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><FiChevronDown color="#D4AF37" /></motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div style={{ padding: '0 2rem 2rem', opacity: 0.5, lineHeight: 1.6, fontSize: '1rem' }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
