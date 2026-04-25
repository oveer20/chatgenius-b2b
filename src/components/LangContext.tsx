"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const LANG_KEY = "stratix_lang";
const CURRENCY_KEY = "stratix_currency";

interface Translations {
  nav: {
    producto: string;
    comoFunciona: string;
    planes: string;
    entrar: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    demoTab: string;
    demoPlaceholder: string;
    demoInput: string;
    demoUser1: string;
    demoBot1: string;
  };
  features: {
    label: string;
    title: string;
    titleEm: string;
    subtitle: string;
  };
  how: {
    label: string;
    title: string;
    titleEm: string;
    subtitle: string;
  };
  pricing: {
    label: string;
    title: string;
    titleEm: string;
    subtitle: string;
    popular: string;
    cta: string;
    ctaFree: string;
    period: string;
  };
  testimonials: {
    label: string;
    title: string;
    titleEm: string;
  };
  cta: {
    title: string;
    titleEm: string;
    subtitle: string;
    cta1: string;
    meta1: string;
    meta2: string;
    meta3: string;
  };
  footer: {
    producto: string;
    contacto: string;
    legal: string;
    copyright: string;
  };
}

const translations: Record<"es" | "en", Translations> = {
  es: {
    nav: {
      producto: "Producto",
      comoFunciona: "Cómo Funciona",
      planes: "Planes",
      entrar: "Entrar",
    },
    hero: {
      badge: "Gemini 2.0 Flash · Modelo más avanzado de Google",
      titleLine1: "Tu agente IA que",
      titleLine2: "vende 24/7",
      subtitle: "Automatiza tu atención en WhatsApp, Instagram y Web. Califica leads, agenda citas y cierra ventas mientras duermes.",
      cta1: "Probar gratis 14 días →",
      cta2: "Ver demo en vivo",
      demoTab: "Stratix Intelligence · Agente Demo",
      demoPlaceholder: "Escribe tu mensaje...",
      demoInput: "Enviar",
      demoUser1: "Hola, busco apartamento en Bogotá $500-550M",
      demoBot1: "¡Perfecto! Tenemos apartamento de $520M en Chapinero, 85m², 3 habitaciones. ¿Te agendo una visita mañana?",
    },
    features: {
      label: "Características",
      title: "Construido para",
      titleEm: "resultados reales",
      subtitle: "Cada función fue diseñada con un solo propósito: que tu equipo haga más, más rápido.",
    },
    how: {
      label: "Proceso",
      title: "En marcha en",
      titleEm: "menos de 5 minutos",
      subtitle: "Sin instalaciones. Sin contratos anuales. Sin fricción.",
    },
    pricing: {
      label: "Precios",
      title: "Simple y",
      titleEm: "competitivo.",
      subtitle: "Empieza hoy. Sin trucos, sin letra pequeña.",
      popular: "MÁS POPULAR",
      cta: "Comenzar",
      ctaFree: "Elegir",
      period: "/ mes",
    },
    testimonials: {
      label: "Clientes",
      title: "Lo que dicen",
      titleEm: "los que ya vuelan",
    },
    cta: {
      title: "Tu equipo merece",
      titleEm: "la mejor IA",
      subtitle: "14 días gratis. Sin tarjeta de crédito. Sin promesas vacías. Solo resultados desde el día uno.",
      cta1: "Empezar ahora — es gratis →",
      meta1: "✓ Sin tarjeta",
      meta2: "✓ Setup en 5 min",
      meta3: "✓ Cancela cuando quieras",
    },
    footer: {
      producto: "PRODUCTO",
      contacto: "CONTACTO",
      legal: "LEGAL",
      copyright: "© 2025 Stratix Intelligence",
    },
  },
  en: {
    nav: {
      producto: "Product",
      comoFunciona: "How it works",
      planes: "Pricing",
      entrar: "Sign in",
    },
    hero: {
      badge: "Gemini 2.0 Flash · Google's most advanced model",
      titleLine1: "Your AI agent that",
      titleLine2: "sells 24/7",
      subtitle: "Automate your support on WhatsApp, Instagram and Web. Qualify leads, schedule appointments and close sales while you sleep.",
      cta1: "Try free for 14 days →",
      cta2: "Try demo →",
      demoTab: "Stratix Intelligence · Demo Agent",
      demoPlaceholder: "Type your message...",
      demoInput: "Send",
      demoUser1: "Hi, I'm looking for an apartment in Bogotá $500-550M",
      demoBot1: "Perfect! We have an apartment for $520M in Chapinero, 85m², 3 bedrooms. Can I schedule a visit tomorrow?",
    },
    features: {
      label: "Features",
      title: "Built for",
      titleEm: "real results",
      subtitle: "Every feature was designed with one purpose: to help your team do more, faster.",
    },
    how: {
      label: "Process",
      title: "Up and running in",
      titleEm: "less than 5 minutes",
      subtitle: "No installations. No long-term contracts. No friction.",
    },
    pricing: {
      label: "Pricing",
      title: "Simple and",
      titleEm: "competitive.",
      subtitle: "Start today. No tricks, no fine print.",
      popular: "MOST POPULAR",
      cta: "Get started",
      ctaFree: "Choose",
      period: "/ month",
    },
    testimonials: {
      label: "Clients",
      title: "What they say",
      titleEm: "about us",
    },
    cta: {
      title: "Your team deserves",
      titleEm: "the best AI",
      subtitle: "14 days free. No credit card. No empty promises. Only results from day one.",
      cta1: "Start now — it's free →",
      meta1: "✓ No credit card",
      meta2: "✓ Setup in 5 min",
      meta3: "✓ Cancel anytime",
    },
    footer: {
      producto: "PRODUCT",
      contacto: "CONTACT",
      legal: "LEGAL",
      copyright: "© 2025 Stratix Intelligence",
    },
  },
};

interface LangContextType {
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
  showUSD: boolean;
  setShowUSD: (s: boolean) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "es",
  setLang: () => {},
  showUSD: false,
  setShowUSD: () => {},
  t: translations.es,
});

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [showUSD, setShowUSD] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang === "en" || storedLang === "es") setLang(storedLang);
    const storedCurr = localStorage.getItem(CURRENCY_KEY);
    if (storedCurr === "USD") setShowUSD(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(CURRENCY_KEY, showUSD ? "USD" : "COP");
  }, [showUSD]);

  return (
    <LangContext.Provider value={{ lang, setLang, showUSD, setShowUSD, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}