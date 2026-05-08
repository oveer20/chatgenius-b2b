"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, FAQS } from "@/components/LangContext";

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
          fontFamily: 'var(--font-serif)',
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
  const faqs = FAQS[lang as keyof typeof FAQS];

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
          {t.faq.badge}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#f0f2f8',
        }}>
          {t.faq.titlePart1} <span style={{ color: '#D4AF37' }}>{t.faq.titlePart2}</span>
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
          {t.faq.noAnswer}{" "}
          <a href="https://wa.me/573159269287" target="_blank" rel="noopener noreferrer" style={{ color: '#D4AF37', textDecoration: 'none' }}>
            {t.faq.contactUs}
          </a>
        </p>
      </motion.div>
    </section>
  );
}