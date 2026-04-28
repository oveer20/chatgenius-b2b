"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

export default function CTA() {
  const { lang, t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);

  const contactLinks = [
    { key: "email", label: "Email", icon: "M2 4l10 7 10-7", href: "mailto:stratixintelligence@gmail.com" },
    { key: "wa", label: "WhatsApp", icon: "M17.472 14.382c-.297-.149-1.758-.617-2.030-.617-.77.001-3.855.293-6.162 1.393C6.963 17.5 6 18.463 6 19.453v1.034c0 .768.488 1.47 1.156 1.953l.73 1.297c.178.316.527.5.902.5l2.35-.001c.5 0 .973-.254 1.201-.643l2.156-3.373", href: "https://wa.me/573159269287" },
    { key: "fb", label: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12-6.627 0-12 5.373-12 12 0 5.99 4.388 10.954 10.125 11.854v-8.09h-3.047v-3.085h3.047v-2.644c0-3.022 1.812-4.697 4.56-4.697 1.33 0 2.708.264 2.708.264v2.956h-1.528c-1.502 0-1.972.932-1.972 1.886v2.19h3.333l-.532 3.085h-2.801v8.09", href: "https://www.facebook.com/share/1NAMx3GSWv/?mibextid=wwXIfr" },
  ];

  return (
    <section style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div 
          onMouseEnter={() => setHovered("box")}
          onMouseLeave={() => setHovered(null)}
          style={{ 
            position: 'relative', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            padding: 'clamp(3rem, 6vw, 5rem)', 
            background: hovered === "box" ? '#0d1520' : '#0d1017', 
            border: '1px solid rgba(212,175,55,0.2)',
            transition: 'all 0.4s ease',
          }}
        >
          <motion.div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 70%)', 
              pointerEvents: 'none' 
            }}
            animate={{ opacity: hovered === "box" ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />

          <motion.h2 
            style={{ 
              position: 'relative', 
              fontFamily: "'DM Serif Display', Georgia, serif", 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              lineHeight: 1.1, 
              letterSpacing: '-0.02em', 
              marginBottom: '16px', 
              color: '#f0f2f8' 
            }}
          >
            {t.cta.title}<br />
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.cta.titleEm}</em>
          </motion.h2>
          
          <motion.p 
            style={{ 
              position: 'relative', 
              fontSize: '16px', 
              color: '#8892a4', 
              marginBottom: '40px', 
              maxWidth: '460px', 
              margin: '0 auto 40px' 
            }}
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div 
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/login" 
                style={{ 
                  background: '#D4AF37', 
                  color: '#030a05', 
                  fontSize: '15px', 
                  fontWeight: 600, 
                  padding: '14px 32px', 
                  borderRadius: '14px', 
                  textDecoration: 'none', 
                  display: 'inline-block',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
                }}
              >
                {t.cta.cta1}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.key}
                href={link.href}
                target="_blank"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHovered(link.key)}
                onMouseLeave={() => setHovered(null)}
                style={{ 
                  padding: '12px 24px', 
                  border: hovered === link.key ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.15)', 
                  borderRadius: '12px', 
                  fontWeight: 500, 
                  textDecoration: 'none', 
                  color: hovered === link.key ? '#D4AF37' : '#f0f2f8', 
                  background: hovered === link.key ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)', 
                  fontSize: '14px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.icon} />
                </svg>
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            style={{ 
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '32px', 
              flexWrap: 'wrap', 
              fontFamily: "'DM Mono', monospace", 
              fontSize: '12px', 
              color: '#4a5568' 
            }}
          >
            <motion.span whileHover={{ color: '#D4AF37' }}>{t.cta.meta1}</motion.span>
            <motion.span whileHover={{ color: '#D4AF37' }}>{t.cta.meta2}</motion.span>
            <motion.span whileHover={{ color: '#D4AF37' }}>{t.cta.meta3}</motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}