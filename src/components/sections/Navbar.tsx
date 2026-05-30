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

      <nav className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[clamp(1rem,4vw,4rem)] h-[60px] transition-all duration-300 ${scrolled ? 'bg-bg/95 border-b border-accent/10 shadow-lg shadow-black/30' : 'bg-bg/85 border-b border-white/5'}`}>
        <Link href="/" className="flex items-center gap-2 no-underline">
          <img src="/stratix_shield.svg" alt="Stratix" width={24} height={24} className="h-6 w-6" />
          <span className="nav-text-desktop font-mono text-base font-medium text-text-primary">Stratix Intelligence</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="nav-links-desktop flex items-center gap-5">
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
                className={`relative no-underline text-sm transition-colors duration-200 ${hovered === item.key ? 'text-accent' : 'text-text-secondary'}`}
              >
                {getLabel(item)}
                {hovered === item.key && (
                  <span className="absolute -bottom-1 inset-x-0 h-px bg-accent" />
                )}
              </a>
            ))}
          </div>

          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="px-2 py-1 rounded-[5px] bg-white/5 text-text-secondary border-none text-[11px] cursor-pointer font-semibold font-mono transition-all duration-200 hover:bg-white/10 hover:text-accent"
          >{lang === "es" ? "EN" : "ES"}</button>

          <div className="nav-currency-desktop flex items-center gap-0.5 p-0.5 bg-white/5 rounded-[6px]">
            <button
              onClick={() => setShowUSD(false)}
              className={`px-[7px] py-1 rounded-[5px] border-none text-[11px] cursor-pointer font-semibold font-mono transition-all duration-200 ${!showUSD ? 'bg-accent text-black' : 'bg-transparent text-text-secondary'}`}
            >COP</button>
            <button
              onClick={() => setShowUSD(true)}
              className={`px-[7px] py-1 rounded-[5px] border-none text-[11px] cursor-pointer font-semibold font-mono transition-all duration-200 ${showUSD ? 'bg-accent text-black' : 'bg-transparent text-text-secondary'}`}
            >USD</button>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-white/5 border-none cursor-pointer transition-all duration-200 text-text-secondary hover:bg-white/10 hover:text-accent"
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

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-hamburger hidden items-center justify-center w-9 h-9 rounded-[8px] bg-white/5 border-none cursor-pointer transition-all duration-200 text-text-primary"
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
            className="bg-accent text-[#030a05] text-xs font-semibold px-3 py-1.5 rounded-[8px] no-underline font-sans transition-all duration-200 shadow-[0_2px_10px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.5)]"
          >
            {lang === "es" ? "Entrar" : "Sign in"}
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-bg/98 backdrop-blur-xl z-[200] pt-20 px-8 pb-8 border-l border-accent/10 flex flex-col gap-2"
          >
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-text-primary no-underline text-lg font-semibold px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-accent/10 block"
              >
                {getLabel(item)}
              </a>
            ))}
            <div className="border-t border-white/8 my-3 pt-3">
              <a href="/legal/privacy" className="text-text-secondary no-underline text-sm px-4 py-2.5 block">Privacidad</a>
              <a href="/legal/terms" className="text-text-secondary no-underline text-sm px-4 py-2.5 block">Términos</a>
            </div>
            <div className="mt-auto flex gap-3 pt-4">
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex-1 bg-accent text-black no-underline font-bold text-sm py-3.5 rounded-xl text-center">
                {lang === "es" ? "Entrar" : "Sign in"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-[150]"
        />
      )}
    </>
  );
}
