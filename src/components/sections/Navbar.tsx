"use client";

import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

export default function Navbar() {
  const { lang, setLang, showUSD, setShowUSD } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { key: "producto", es: "Producto", en: "Product", href: "#productos" },
    { key: "comoFunciona", es: "Cómo Funciona", en: "How it works", href: "#como-funciona" },
    { key: "planes", es: "Planes", en: "Pricing", href: "#planes" },
  ];

  const getLabel = (item: typeof navItems[0]) => lang === "es" ? item.es : item.en;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(1.5rem, 4vw, 4rem)',
      height: '68px',
      background: 'rgba(7,9,16,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      transition: 'all 0.3s ease',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <img src="/stratix_shield.svg" alt="Stratix" style={{ height: '28px', width: '28px' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '1.1rem', fontWeight: 500, color: '#f0f2f8' }}>Stratix Intelligence</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
                transform: hovered === item.key ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {getLabel(item)}
              <span style={{ 
                display: 'block',
                height: '2px',
                background: '#D4AF37',
                borderRadius: '1px',
                marginTop: '4px',
                transform: hovered === item.key ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.2s ease',
              }} />
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <button 
            onClick={() => setLang("es")} 
            onMouseEnter={() => {}}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '6px', 
              background: lang === "es" ? '#D4AF37' : 'transparent', 
              color: lang === "es" ? '#000' : '#8892a4', 
              border: 'none', 
              fontSize: '12px', 
              cursor: 'pointer', 
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >ES</button>
          <button 
            onClick={() => setLang("en")} 
            style={{ 
              padding: '6px 12px', 
              borderRadius: '6px', 
              background: lang === "en" ? '#D4AF37' : 'transparent', 
              color: lang === "en" ? '#000' : '#8892a4', 
              border: 'none', 
              fontSize: '12px', 
              cursor: 'pointer', 
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >EN</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <button 
            onClick={() => setShowUSD(false)} 
            style={{ 
              padding: '6px 10px', 
              borderRadius: '6px', 
              background: !showUSD ? '#D4AF37' : 'transparent', 
              color: !showUSD ? '#000' : '#8892a4', 
              border: 'none', 
              fontSize: '12px', 
              cursor: 'pointer', 
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >COP</button>
          <button 
            onClick={() => setShowUSD(true)} 
            style={{ 
              padding: '6px 10px', 
              borderRadius: '6px', 
              background: showUSD ? '#D4AF37' : 'transparent', 
              color: showUSD ? '#000' : '#8892a4', 
              border: 'none', 
              fontSize: '12px', 
              cursor: 'pointer', 
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >USD</button>
        </div>

        <Link 
          href="/login"
          onMouseEnter={() => setHovered('login')}
          onMouseLeave={() => setHovered(null)}
          style={{ 
            background: '#D4AF37', 
            color: '#030a05', 
            fontSize: '13px', 
            fontWeight: 600, 
            padding: '8px 16px', 
            borderRadius: '10px', 
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            transform: hovered === 'login' ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hovered === 'login' ? '0 4px 20px rgba(212,175,55,0.4)' : 'none',
          }}
        >
          {lang === "es" ? "Entrar" : "Sign in"}
        </Link>
      </div>
    </nav>
  );
}