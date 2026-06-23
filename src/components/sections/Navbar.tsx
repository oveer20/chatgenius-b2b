"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useStrings } from "@/lib/useStrings";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { s } = useStrings();
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

  const getLabel = (item: typeof navItems[0]) => s(item.es, item.en);

  return (
    <>
       <nav className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[clamp(1rem,4vw,4rem)] h-[60px] transition-all duration-300 bg-bg/80 backdrop-blur-xl border-b border-white/10 ${scrolled ? 'bg-bg/90' : ''}`}>
         <Link href="/" className="flex items-center gap-2 no-underline">
           <div className={`relative transition-all duration-500 ${scrolled ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : ''}`}>
             <Image src="/stratix_shield.svg" alt="Stratix" width={24} height={24} className="h-6 w-6" />
           </div>
           <span className="hidden md:inline font-mono text-base font-medium text-text-primary tracking-tighter">Stratix Intelligence</span>
         </Link>

         <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-4">
           {navItems.map(item => (
             <Link
               key={item.key}
               href={item.href}
               className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent"
             >
               {getLabel(item)}
             </Link>
           ))}
         </div>

         <div className="flex items-center gap-2">
           <button
             onClick={() => setLang(lang === "es" ? "en" : "es")}
             className="icon-btn"
             title={lang === "es" ? "English" : "Español"}
           >
             {lang === "es" ? <FiMoon /> : <FiSun />}
           </button>
           <Link href="/dashboard" className="hidden sm:inline-flex btn-primary btn-sm">
             {s("Crear agente", "Create Agent")}
           </Link>
           <button
             onClick={() => setMobileOpen(true)}
             className="md:hidden icon-btn"
             aria-label="Menu"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
               <path d="M3 12h18M3 6h18M3 18h18"/>
             </svg>
           </button>
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
               <Link
                 key={item.key}
                 href={item.href}
                 onClick={() => setMobileOpen(false)}
                 className="btn-secondary w-full"
               >
                 {getLabel(item)}
               </Link>
             ))}
             <div className="border-t border-white/8 my-3 pt-3">
               <Link href="/legal/privacy" className="btn-outline w-full">
                 Privacidad
               </Link>
               <Link href="/legal/terms" className="btn-outline w-full">
                 Términos
               </Link>
             </div>
           <div className="mt-auto flex gap-3 pt-4">
               <Link href="/login" onClick={() => setMobileOpen(false)}
                 className="btn-primary w-full">
                 {s("Entrar", "Sign in")}
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
           className="fixed inset-0 bg-black/50 z-[150]"
         />
       )}
    </>
  );
}
