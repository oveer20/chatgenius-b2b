"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";

export default function Navbar() {
  const { lang, setLang, showUSD, setShowUSD } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { key: "producto", es: "Producto", en: "Product", href: "#productos" },
    { key: "comoFunciona", es: "Cómo Funciona", en: "How it works", href: "#como-funciona" },
    { key: "planes", es: "Planes", en: "Pricing", href: "#planes" },
  ];

  const getLabel = (item: typeof navItems[0]) => lang === "es" ? item.es : item.en;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-currency-desktop { display: none !important; }
          .nav-text-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1rem, 4vw, 4rem)',
        height: '60px',
        background: scrolled ? 'rgba(7,9,16,0.95)' : 'rgba(7,9,16,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.1)' : '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <img src="/stratix_shield.svg" alt="Stratix" style={{ height: '24px', width: '24px' }} />
          <span className="nav-text-desktop" style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 500, color: '#f0f2f8' }}>Stratix Intelligence</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  color: hovered === item.key ? '#D4AF37' : '#8892a4',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
              >
                {getLabel(item)}
                {hovered === item.key && (
                  <span style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '1px', background: '#D4AF37' }} />
                )}
              </a>
            ))}
          </div>

          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            style={{
              padding: '4px 8px', borderRadius: '5px',
              background: 'rgba(255,255,255,0.05)', color: '#8892a4',
              border: 'none', fontSize: '11px', cursor: 'pointer',
              fontWeight: 600, fontFamily: 'var(--font-mono)', transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.color = '#D4AF37'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.target as HTMLElement).style.color = '#8892a4'; }}
          >{lang === "es" ? "EN" : "ES"}</button>

          <div className="nav-currency-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
            <button
              onClick={() => setShowUSD(false)}
              style={{
                padding: '4px 7px', borderRadius: '5px',
                background: !showUSD ? '#D4AF37' : 'transparent',
                color: !showUSD ? '#000' : '#8892a4',
                border: 'none', fontSize: '11px', cursor: 'pointer',
                fontWeight: 600, fontFamily: 'var(--font-mono)', transition: 'all 0.2s ease',
              }}
            >COP</button>
            <button
              onClick={() => setShowUSD(true)}
              style={{
                padding: '4px 7px', borderRadius: '5px',
                background: showUSD ? '#D4AF37' : 'transparent',
                color: showUSD ? '#000' : '#8892a4',
                border: 'none', fontSize: '11px', cursor: 'pointer',
                fontWeight: 600, fontFamily: 'var(--font-mono)', transition: 'all 0.2s ease',
              }}
            >USD</button>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '6px',
              background: 'rgba(255,255,255,0.05)', border: 'none',
              cursor: 'pointer', transition: 'all 0.2s ease', color: '#8892a4',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.color = '#D4AF37'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.target as HTMLElement).style.color = '#8892a4'; }}
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-hamburger"
            style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)', border: 'none',
              cursor: 'pointer', transition: 'all 0.2s ease', color: '#f0f2f8',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <Link
            href="/login"
            style={{
              background: '#D4AF37', color: '#030a05', fontSize: '12px',
              fontWeight: 600, padding: '6px 12px', borderRadius: '8px',
              textDecoration: 'none', fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s ease', boxShadow: '0 2px 10px rgba(212,175,55,0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(212,175,55,0.3)')}
          >
            {lang === "es" ? "Entrar" : "Sign in"}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(320px, 85vw)',
              background: 'rgba(7,9,16,0.98)', backdropFilter: 'blur(20px)',
              zIndex: 200, padding: '80px 2rem 2rem',
              borderLeft: '1px solid rgba(212,175,55,0.1)',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}
          >
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: '#f0f2f8', textDecoration: 'none', fontSize: '18px',
                  fontWeight: 600, padding: '14px 16px', borderRadius: '12px',
                  transition: 'all 0.2s ease', display: 'block',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,175,55,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {getLabel(item)}
              </a>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '12px 0', paddingTop: '12px' }}>
              <a href="/legal/privacy" style={{ color: '#8892a4', textDecoration: 'none', fontSize: '14px', padding: '10px 16px', display: 'block' }}>Privacidad</a>
              <a href="/legal/terms" style={{ color: '#8892a4', textDecoration: 'none', fontSize: '14px', padding: '10px 16px', display: 'block' }}>Términos</a>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <Link href="/login" onClick={() => setMobileOpen(false)}
                style={{ flex: 1, background: '#D4AF37', color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
                {lang === "es" ? "Entrar" : "Sign in"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 150 }}
        />
      )}
    </>
  );
}


