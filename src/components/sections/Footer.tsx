"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { FaInstagram, FaWhatsapp, FaFacebook, FaEnvelope } from "react-icons/fa";

const LINKS = {
  es: {
    producto: ["Producto", "Precios"],
    legal: ["Privacidad", "Términos"],
  },
  en: {
    producto: ["Product", "Pricing"],
    legal: ["Privacy", "Terms"],
  },
};

const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "https://www.instagram.com/stratix.intelligence", label: "Instagram" },
  { icon: FaWhatsapp, href: "https://wa.me/573159269287", label: "WhatsApp" },
  { icon: FaFacebook, href: "https://www.facebook.com/share/1NAMx3GSWv/?mibextid=wwXIfr", label: "Facebook" },
  { icon: FaEnvelope, href: "mailto:stratixintelligence@gmail.com", label: "Email" },
];

export default function Footer() {
  const { lang, t } = useLang();
  const links = LINKS[lang as keyof typeof LINKS];

  return (
    <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px clamp(1.5rem, 5vw, 4rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '48px' }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '20px' }}>
              <img src="/stratix_shield.svg" alt="Stratix" style={{ height: '36px', width: '36px' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, color: '#f0f2f8' }}>Stratix Intelligence</span>
            </Link>
            <p style={{ fontSize: '14px', color: '#8892a4', maxWidth: '280px', lineHeight: 1.7, marginBottom: '24px' }}>
              Agentes IA conversacionales para automatizar tu atención y ventas 24/7.
            </p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8892a4',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#D4AF37';
                    e.currentTarget.style.color = '#000';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#8892a4';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '20px' }}>PRODUCTO</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {links.producto.map((l: string, i: number) => <li key={i}><Link href={i === 0 ? "#productos" : "#planes"} style={{ fontSize: '14px', color: '#8892a4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'} onMouseLeave={(e) => e.currentTarget.style.color = '#8892a4'}>{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '20px' }}>LEGAL</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li><Link href="/legal/privacy" style={{ fontSize: '14px', color: '#8892a4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'} onMouseLeave={(e) => e.currentTarget.style.color = '#8892a4'}>{lang === "es" ? "Privacidad" : "Privacy"}</Link></li>
                <li><Link href="/legal/terms" style={{ fontSize: '14px', color: '#8892a4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f0f2f8'} onMouseLeave={(e) => e.currentTarget.style.color = '#8892a4'}>{lang === "es" ? "Términos" : "Terms"}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}
        >
          <p style={{ fontSize: '13px', color: '#4a5568', fontFamily: 'var(--font-mono)' }}>{t.footer.copyright}</p>
          <p style={{ fontSize: '13px', color: '#4a5568', fontFamily: 'var(--font-mono)' }}>
            {lang === "es" ? "Hecho con" : "Made with"} <span style={{ color: '#D4AF37' }}>♥</span> en Colombia
          </p>
        </motion.div>
      </div>
    </footer>
  );
}