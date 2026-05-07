"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FAQ {
  q: string;
  a: string;
}

export type LangType = "es" | "en";

interface LangContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
  showUSD: boolean;
  setShowUSD: (show: boolean) => void;
  t: any;
}

const translations: Record<string, any> = {
  es: {
    hero: {
      badge: "🤖 IA + AUTOMATIZACIÓN",
      titleLine1: "Tu agente de ventas",
      titleLine2: "que nunca duerme",
      subtitle: "Automatiza tu atención 24/7. Responde instantly. Cierra deals mientras descansas.",
      cta1: "Probar gratis",
      cta2: "Ver demo",
    },
    footer: {
      copyright: "© 2024 Stratix Intelligence. Todos los derechos reservados.",
    },
    pricing: {
      perMonth: "/mes",
      perYear: "/año",
      popular: "Más popular",
      title: "Planes simples,",
      titleEm: "precios claros",
      label: "INVERSION INTELIGENTE",
      monthly: "Mensual",
      annual: "Anual",
      saveBadge: "(Ahorra 20%)",
      freeMonths: "2 meses gratis",
      startFree: "Empezar prueba gratis",
      startBtn: "Comenzar",
      mostPopular: "Más Popular",
      plans: {
        inicia: {
          name: "Inicia",
          desc: "Ideal para probar el poder de la IA",
          features: ["1 Agente IA", "1,000 Mensajes/mes", "Soporte por Email", "WhatsApp + Web"],
        },
        escala: {
          name: "Escala",
          desc: "El favorito para crecer rápido",
          features: ["5 Agentes IA", "10,000 Mensajes/mes", "Soporte Prioritario 24/7", "Opal Scoring", "API Access"],
        },
        domina: {
          name: "Domina",
          desc: "Control total sin límites",
          features: ["Agentes Ilimitados", "Mensajes Ilimitados", "Account Manager Dedicado", "Custom Training", "SLA Garantizado"],
        },
      },
    },
    cta: {
      title: "¿Listo para",
      titleEm: "automatizar?",
      subtitle: "Habla con un experto ahora",
    },
    features: {
      title: "Todo lo que necesitas para",
      titleEm: "vender en automático",
    },
    how: {
      title: "Cómo funciona en",
      titleEm: "3 pasos",
    },
    testimonials: {
      title: "Lo que dicen nuestros",
      titleEm: "clientes",
    },
  },
  en: {
    hero: {
      badge: "🤖 IA + AUTOMATION",
      titleLine1: "Your sales agent",
      titleLine2: "that never sleeps",
      subtitle: "Automate your support 24/7. Respond instantly. Close deals while you sleep.",
      cta1: "Try free",
      cta2: "See demo",
    },
    footer: {
      copyright: "© 2024 Stratix Intelligence. All rights reserved.",
    },
    pricing: {
      perMonth: "/month",
      perYear: "/year",
      popular: "Most popular",
      title: "Simple plans,",
      titleEm: "clear prices",
      label: "SMART INVESTMENT",
      monthly: "Monthly",
      annual: "Annual",
      saveBadge: "(Save 20%)",
      freeMonths: "2 months free",
      startFree: "Start free trial",
      startBtn: "Get started",
      mostPopular: "Most Popular",
      plans: {
        inicia: {
          name: "Starter",
          desc: "Perfect to test the power of AI",
          features: ["1 AI Agent", "1,000 Messages/month", "Email Support", "WhatsApp + Web"],
        },
        escala: {
          name: "Growth",
          desc: "The favorite to scale fast",
          features: ["5 AI Agents", "10,000 Messages/month", "24/7 Priority Support", "Opal Scoring", "API Access"],
        },
        domina: {
          name: "Enterprise",
          desc: "Full control, no limits",
          features: ["Unlimited Agents", "Unlimited Messages", "Dedicated Account Manager", "Custom Training", "Guaranteed SLA"],
        },
      },
    },
    cta: {
      title: "Ready to",
      titleEm: "automate?",
      subtitle: "Talk to an expert now",
    },
    features: {
      title: "Everything you need to",
      titleEm: "sell on autopilot",
    },
    how: {
      title: "How it works in",
      titleEm: "3 steps",
    },
    testimonials: {
      title: "What our",
      titleEm: "clients say",
    },
  },
};

const FAQS: Record<string, FAQ[]> = {
  es: [
    { q: "¿Cuánto tiempo tarda en configurarse Stratix?", a: "En 15 minutos tienes tu primer agente configurado. No necesitas experiencia técnica." },
    { q: "¿Stratix se integra con mi CRM?", a: "Sí. Conectamos con HubSpot, Salesforce, Zoho, Pipedrive y cualquier sistema con API." },
    { q: "¿Hay garantía?", a: "Sí. 14 días de garantía total. Si no ves resultados, te devolvemos tu dinero." },
  ],
  en: [
    { q: "How long does it take to set up Stratix?", a: "In 15 minutes you have your first agent configured. No technical experience needed." },
    { q: "Does Stratix integrate with my CRM?", a: "Yes. We connect with HubSpot, Salesforce, Zoho, Pipedrive and any system with API." },
    { q: "Is there a guarantee?", a: "Yes. 14-day total guarantee. If you don't see results, we refund your money." },
  ],
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("es");
  const [showUSD, setShowUSD] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stratix_lang");
    if (saved) setLangState(saved);
  }, []);

  const handleSetLang = (newLang: string) => {
    setLangState(newLang);
    localStorage.setItem("stratix_lang", newLang);
  };

  const typedLang = lang as LangType;
  return (
    <LangContext.Provider value={{ lang: typedLang, setLang: handleSetLang, showUSD, setShowUSD, t: translations[typedLang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    return { 
      lang: "es" as LangType, 
      setLang: () => {}, 
      showUSD: false,
      setShowUSD: () => {},
      t: { hero: { badge: "", titleLine1: "", titleLine2: "", subtitle: "", cta1: "", cta2: "" }, footer: { copyright: "" }, pricing: { perMonth: "", perYear: "", popular: "" }, cta: { title: "", titleEm: "", subtitle: "" }, features: { title: "", titleEm: "" }, how: { title: "", titleEm: "" }, testimonials: { title: "", titleEm: "" } }
    };
  }
  return context;
}

export { FAQS };