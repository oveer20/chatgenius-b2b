"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

export default function CTA() {
  const { lang, t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);

  const contactLinks = [
    { key: "email", label: "Email", icon: "M2 4l10 7 10-7", href: "mailto:stratixintelligence@gmail.com" },
    { key: "wa", label: "WhatsApp", icon: "M17.472 14.382c-.297-.149-1.758-.617-2.030-.617-.77.001-3.855.293-6.162 1.393C6.963 17.5 6 18.463 6 19.453v1.034c0 .768.488 1.47 1.156 1.953l.73 1.297c.178.316.527.5.902.5l2.35-.001c.5 0 .973-.254 1.201-.643l2.156-3.373", href: "https://wa.me/573159269287" },
    { key: "fb", label: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12-6.627 0-12 5.373-12 12 0 5.99 4.388 10.954 10.125 11.854v-8.09h-3.047v-3.085h3.047v-2.644c0-3.022 1.812-4.697 4.56-4.697 1.33 0 2.708.264 2.708.264v2.956h-1.528c-1.502 0-1.972.932-1.972 1.886v2.19h3.333l-.532 3.085h-2.801v8.09", href: "https://www.facebook.com/share/1NAMx3GSWv/?mibextid=wwXIfr" },
    { key: "li", label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", href: "https://www.linkedin.com/in/jose-gaviriap/" },
  ];

  return (
    <section style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
      {/* Aurora background */}
      <div style={{
        position: 'absolute',
        inset: '-60px',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.05) 0%, transparent 50%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        animation: 'aurora 8s ease-in-out infinite alternate',
      }} />

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
            background: 'rgba(13,16,23,0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            transition: 'all 0.4s ease',
            boxShadow: hovered === "box"
              ? '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.1)'
              : '0 16px 50px rgba(0,0,0,0.4)',
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Social proof badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '100px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
              marginBottom: '24px',
              fontSize: '13px',
              color: '#10b981',
              fontWeight: 500,
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s infinite' }} />
            {lang === "es" ? "+500 empresas ya automatizaron" : "+500 companies already automated"}
          </motion.div>

          <motion.h2
            style={{
              position: 'relative',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: '#f0f2f8',
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
              margin: '0 auto 40px',
            }}
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/login"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #E5C555)',
                  color: '#030a05',
                  fontSize: '15px',
                  fontWeight: 700,
                  padding: '16px 36px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.1)'; }}
              >
                {t.cta.cta1}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHovered(link.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '10px 20px',
                  border: hovered === link.key ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: hovered === link.key ? '#D4AF37' : '#f0f2f8',
                  background: hovered === link.key ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.02)',
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
              gap: '24px',
              flexWrap: 'wrap',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#4a5568',
            }}
          >
            <span>{t.cta.meta1}</span>
            <span>•</span>
            <span>{t.cta.meta2}</span>
            <span>•</span>
            <span>{t.cta.meta3}</span>
          </motion.div>

          {/* Founder card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ position: 'relative', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
          >
            <span style={{ fontSize: '13px', color: '#8892a4', fontFamily: 'var(--font-sans)' }}>{lang === "es" ? "Fundado por" : "Founded by"}</span>
            <motion.a
              href="https://www.linkedin.com/in/jose-gaviriap/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '8px 16px', borderRadius: '12px', background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.3)', transition: 'all 0.3s ease' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A66C2, #004182)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>JG</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f2f8', fontFamily: 'var(--font-sans)' }}>Jose Gaviria</div>
                <div style={{ fontSize: '11px', color: '#8892a4', fontFamily: 'var(--font-sans)' }}>{lang === "es" ? "Founder & CEO" : "Founder & CEO"}</div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes aurora {
          0% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.05) rotate(2deg); }
          100% { opacity: 0.7; transform: scale(1.02) rotate(-1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px #10b981; }
          50% { box-shadow: 0 0 12px #10b981; }
        }
      `}</style>
    </section>
  );
}
