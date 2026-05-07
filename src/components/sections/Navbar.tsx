"use client";

import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { useTheme } from "@/components/ThemeContext";
import { useState } from "react";

export default function Navbar() {
  const { lang, setLang, showUSD, setShowUSD } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

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
        }
      `}</style>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1rem, 4vw, 4rem)',
        height: '60px',
        background: 'rgba(7,9,16,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <img src="/stratix_shield.svg" alt="Stratix" style={{ height: '24px', width: '24px' }} />
          <span className="nav-text-desktop" style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 500, color: '#f0f2f8' }}>Stratix Intelligence</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  transition: 'all 0.2s ease',
                }}
              >
                {getLabel(item)}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setLang(lang === "es" ? "en" : "es")} 
            style={{ 
              padding: '4px 8px', 
              borderRadius: '5px', 
              background: 'rgba(255,255,255,0.05)', 
              color: '#8892a4', 
              border: 'none', 
              fontSize: '11px', 
              cursor: 'pointer', 
              fontWeight: 600,
            }}
          >{lang === "es" ? "EN" : "ES"}</button>

          <div className="nav-currency-desktop" style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
            <button 
              onClick={() => setShowUSD(false)} 
              style={{ 
                padding: '4px 7px', 
                borderRadius: '5px', 
                background: !showUSD ? '#D4AF37' : 'transparent', 
                color: !showUSD ? '#000' : '#8892a4', 
                border: 'none', 
                fontSize: '11px', 
                cursor: 'pointer', 
                fontWeight: 600,
              }}
            >COP</button>
            <button 
              onClick={() => setShowUSD(true)} 
              style={{ 
                padding: '4px 7px', 
                borderRadius: '5px', 
                background: showUSD ? '#D4AF37' : 'transparent', 
                color: showUSD ? '#000' : '#8892a4', 
                border: 'none', 
                fontSize: '11px', 
                cursor: 'pointer', 
                fontWeight: 600,
              }}
            >USD</button>
          </div>

          <button 
            onClick={toggleTheme}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link 
            href="/login"
            style={{ 
              background: '#D4AF37', 
              color: '#030a05', 
              fontSize: '12px', 
              fontWeight: 600, 
              padding: '6px 12px', 
              borderRadius: '8px', 
              textDecoration: 'none',
            }}
          >
            {lang === "es" ? "Entrar" : "Sign in"}
          </Link>
        </div>
      </nav>
    </>
  );
}