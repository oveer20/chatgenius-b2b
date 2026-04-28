// @ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

const FAQS = {
  es: [
    {
      q: "¿Qué es Stratix Intelligence?",
      a: "Stratix es un agente de IA conversacional que automatiza la atención al cliente y ventas 24/7. Funciona en WhatsApp, Instagram, web y más, respondiendo automáticamente a tus clientes."
    },
    {
      q: "¿Cuánto tiempo tarda en configurarse?",
      a: "En menos de 15 minutos puedes tener tu primer agente funcionando. No necesitas conocimientos técnicos. Solo conectas tus canales y el agente aprende de tu información."
    },
    {
      q: "¿Funciona con mi negocio?",
      a: "Sí. Stratix se adapta a cualquier industria: inmobiliarias, tiendas, restaurantes, servicios profesionales, clínicas, y más. El agente se entrena con tu información específica."
    },
    {
      q: "¿Qué pasa si el cliente hace una pregunta compleja?",
      a: "El agente maneja el 80% de las consultas automáticamente. Si detecta una pregunta que no puede responder, transfiere la conversación a un humano con todo el contexto."
    },
    {
      q: "¿Puedo conectar WhatsApp Business?",
      a: "Sí. Conectamos directamente con tu WhatsApp Business API. También integramos Instagram Direct, tu web y otros canales. Todo en un solo panel de control."
    },
    {
      q: "¿Hay garantía?",
      a: "Sí. 14 días de garantía total. Si no ves resultados, te devolvemos tu dinero sin preguntas."
    },
  ],
  en: [
    {
      q: "What is Stratix Intelligence?",
      a: "Stratix is a conversational AI agent that automates customer service and sales 24/7. It works on WhatsApp, Instagram, web and more, automatically responding to your customers."
    },
    {
      q: "How long does it take to set up?",
      a: "In less than 15 minutes you can have your first agent running. No technical knowledge needed. Just connect your channels and the agent learns from your information."
    },
    {
      q: "Does it work with my business?",
      a: "Yes. Stratix adapts to any industry: real estate, stores, restaurants, professional services, clinics, and more. The agent is trained with your specific information."
    },
    {
      q: "What if a customer asks a complex question?",
      a: "The agent handles 80% of queries automatically. If it detects a question it can't answer, it transfers the conversation to a human with all the context."
    },
    {
      q: "Can I connect WhatsApp Business?",
      a: "Yes. We connect directly to your WhatsApp Business API. We also integrate Instagram Direct, your web and other channels. All in one control panel."
    },
    {
      q: "Is there a guarantee?",
      a: "Yes. 14 days full guarantee. If you don't see results, we refund your money with no questions."
    },
  ],
};

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '20px',
        }}
      >
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: isOpen ? '#D4AF37' : '#f0f2f8',
          transition: 'color 0.3s ease',
        }}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '24px',
            color: '#D4AF37',
            fontWeight: 300,
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontSize: '15px',
              color: '#8892a4',
              lineHeight: 1.7,
              paddingBottom: '20px',
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { lang, t } = useLang();
  // @ts-ignore
  const faqs = FAQS[lang];

  return (
    <section style={{ 
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <span style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '16px',
          letterSpacing: '0.5px',
        }}>
          PREGUNTAS FRECUENTES
        </span>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#f0f2f8',
        }}>
          ¿Tienes dudas? <span style={{ color: '#D4AF37' }}>Te respondemos</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(13,16,23,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          padding: '0 24px',
        }}
      >
        {faqs.map((faq: any, i: number) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: '32px' }}
      >
        <p style={{ color: '#8892a4', fontSize: '14px' }}>
          {lang === "es" ? "¿No encontraste tu respuesta?" : "Didn't find your answer?"}{" "}
          <a href="https://wa.me/573159269287" target="_blank" rel="noopener noreferrer" style={{ color: '#D4AF37', textDecoration: 'none' }}>
            {lang === "es" ? "Escríbenos" : "Write to us"}
          </a>
        </p>
      </motion.div>
    </section>
  );
}