"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { FaInstagram, FaWhatsapp, FaFacebook, FaEnvelope, FaLinkedin } from "react-icons/fa";

const SOCIAL_LINKS = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/jose-gaviriap/", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/stratix.intelligence", label: "Instagram" },
  { icon: FaWhatsapp, href: "https://wa.me/573159269287", label: "WhatsApp" },
  { icon: FaFacebook, href: "https://www.facebook.com/share/1NAMx3GSWv/?mibextid=wwXIfr", label: "Facebook" },
  { icon: FaEnvelope, href: "mailto:stratixintelligence@gmail.com", label: "Email" },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer style={{
      position: 'relative',
      zIndex: 2,
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'linear-gradient(180deg, rgba(7,9,16,0.5) 0%, #070910 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 4rem) 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(250px, 2fr) repeat(3, 1fr)',
          gap: 'clamp(2rem, 5vw, 4rem)',
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #D4AF37, #b8860b)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 700,
                color: '#000',
              }}>
                S
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600, color: '#f0f2f8' }}>Stratix</span>
            </div>
            <p style={{ fontSize: '14px', color: '#4a5568', lineHeight: 1.7, marginBottom: '24px', maxWidth: '300px' }}>
              {lang === "es" ? "Automatiza tu atención y ventas con agentes IA. Responde 24/7 y cierra más negocios mientras descansas." : "Automate your support and sales with AI agents. Respond 24/7 and close more deals while you sleep."}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#4a5568', textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#D4AF37'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#4a5568'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#D4AF37', marginBottom: '20px' }}>
              {lang === "es" ? "PRODUCTO" : "PRODUCT"}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="#features" style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  {lang === "es" ? "Características" : "Features"}
                </Link>
              </li>
              <li>
                <Link href="#pricing" style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  {lang === "es" ? "Precios" : "Pricing"}
                </Link>
              </li>
              <li>
                <Link href="#how" style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  {lang === "es" ? "Cómo funciona" : "How it works"}
                </Link>
              </li>
              <li>
                <Link href="#faq" style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#D4AF37', marginBottom: '20px' }}>
              LEGAL
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/legal/privacy" style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  {lang === "es" ? "Privacidad" : "Privacy"}
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  {lang === "es" ? "Términos" : "Terms"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#D4AF37', marginBottom: '20px' }}>
              CONTACTO
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="https://wa.me/573159269287" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  <FaWhatsapp size={14} /> +57 315 926 9287
                </a>
              </li>
              <li>
                <a href="mailto:stratixintelligence@gmail.com"
                  style={{ fontSize: '14px', color: '#4a5568', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}>
                  <FaEnvelope size={14} /> stratixintelligence@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: 'clamp(3rem, 5vw, 4rem)', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}
        >
          <p style={{ fontSize: '13px', color: '#2d3748', fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Stratix Intelligence. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <p style={{ fontSize: '13px', color: '#2d3748', fontFamily: 'var(--font-mono)' }}>
            {lang === "es" ? "Hecho con" : "Made with"} <span style={{ color: '#D4AF37' }}>&#9829;</span> {lang === "es" ? "en Colombia" : "in Colombia"}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}