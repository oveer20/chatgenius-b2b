"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FAQ {
  q: string;
  a: string;
}

interface ROIStrings {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  leadsLabel: string;
  valueLabel: string;
  timeLabel: string;
  timeSuffix: string;
  missedLeadsLabel: string;
  missedLeadsDesc: string;
  lostMoneyLabel: string;
  lostMoneyDesc: string;
  stratixCostLabel: string;
  stratixCostDesc: string;
  cta: string;
}

interface BeforeAfterStrings {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  withoutTitle: string;
  withTitle: string;
  withoutItems: string[];
  withItems: string[];
}

interface AIPlaygroundStrings {
  openBtn: string;
  header: string;
  status: string;
  welcome: string;
  fallback: string;
  errorFallback: string;
  placeholder: string;
}

export type LangType = "es" | "en";

interface LangContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
  showUSD: boolean;
  setShowUSD: (show: boolean) => void;
  t: {
    hero: { badge: string; titleLine1: string; titleLine2: string; subtitle: string; cta1: string; cta2: string };
    footer: { copyright: string };
    pricing: { perMonth: string; perYear: string; popular: string; title: string; titleEm: string; label: string; monthly: string; annual: string; saveBadge: string; freeMonths: string; startFree: string; startBtn: string; mostPopular: string; plans: { inicia: { name: string; desc: string; features: string[] }; escala: { name: string; desc: string; features: string[] }; domina: { name: string; desc: string; features: string[] } } };
    cta: { title: string; titleEm: string; subtitle: string; cta1: string; meta1: string; meta2: string; meta3: string };
    features: { label: string; title: string; titleEm: string; subtitle: string };
    how: { label: string; title: string; titleEm: string; subtitle: string };
    testimonials: { label: string; title: string; titleEm: string };
    faq: { badge: string; titlePart1: string; titlePart2: string; noAnswer: string; contactUs: string };
    logos: { badge: string };
    roi: ROIStrings;
    beforeAfter: BeforeAfterStrings;
    aiPlayground: AIPlaygroundStrings;
  };
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
      cta1: "Probar gratis",
      meta1: "Setup en 15 min",
      meta2: "14 días gratis",
      meta3: "Sin tarjeta",
    },
    features: {
      label: "CAPACIDADES",
      title: "Todo lo que necesitas para",
      titleEm: "vender en automático",
      subtitle: "Todo lo que tu equipo necesita para cerrar más ventas, sin contratar más gente.",
    },
    how: {
      label: "PROCESO SIMPLE",
      title: "Cómo funciona en",
      titleEm: "3 pasos",
      subtitle: "Desde la configuración hasta resultados en menos de 15 minutos.",
    },
    testimonials: {
      label: "PRUEBA SOCIAL",
      title: "Lo que dicen nuestros",
      titleEm: "clientes",
    },
    faq: {
      badge: "PREGUNTAS FRECUENTES",
      titlePart1: "¿Tienes dudas?",
      titlePart2: "Te respondemos",
      noAnswer: "¿No encontraste tu respuesta?",
      contactUs: "Escríbenos",
    },
    logos: {
      badge: "CONFIADO POR EQUIPOS EN CRECIMIENTO",
    },
    roi: {
      badge: "CALCULADORA DE PERDIDAS",
      titlePart1: "Cuanto dinero estas",
      titlePart2: "perdiendo",
      subtitle: "Ajusta los datos de tu negocio y descubre cuanto te cuesta no responder al instante.",
      leadsLabel: "Leads / Consultas al mes",
      valueLabel: "Valor promedio de venta (COP)",
      timeLabel: "Tiempo promedio de respuesta",
      timeSuffix: "min",
      missedLeadsLabel: "Leads Perdidos",
      missedLeadsDesc: "Clientes que se van a la competencia",
      lostMoneyLabel: "Dinero Perdido / Mes",
      lostMoneyDesc: "Ingresos que dejas de ganar",
      stratixCostLabel: "Costo de Stratix",
      stratixCostDesc: "Inversion mensual para recuperar todo",
      cta: "Recupera tus ventas hoy",
    } as ROIStrings,
    beforeAfter: {
      badge: "SIN STRATIX VS CON STRATIX",
      titlePart1: "Dos realidades, una",
      titlePart2: "decision",
      withoutTitle: "Sin Automatizacion",
      withTitle: "Con Stratix AI",
      withoutItems: [
        "Pierdes 40% de leads por no responder rapido",
        "Tu equipo humano se agota y comete errores",
        "Pagas salarios altos sin garantia de cobertura 24/7",
        "Tus clientes esperan minutos u horas por respuesta",
        "Tu competencia se queda con tus ventas nocturnas",
      ],
      withItems: [
        "Respondes en menos de 2 segundos, siempre",
        "Cierras citas y ventas mientras duermes",
        "Un costo fijo mensual que equivale a 1% de un salario",
        "Experiencia premium y consistente para cada cliente",
        "Escalabilidad infinita sin contratar mas personal",
      ],
    } as BeforeAfterStrings,
    aiPlayground: {
      openBtn: "Prueba Stratix AI en vivo",
      header: "Stratix AI · Agente IA",
      status: "En linea · Demo en vivo",
      welcome: "Hola, soy Stratix AI. Preguntame sobre precios, caracteristicas o pidele una demo a mi creador.",
      fallback: "Hola, en que puedo ayudarte?",
      errorFallback: "Hola, soy Stratix AI. Preguntame sobre precios o como automatizar tus ventas.",
      placeholder: "Escribe tu mensaje...",
    } as AIPlaygroundStrings,
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
      cta1: "Try free",
      meta1: "Setup in 15 min",
      meta2: "14 days free",
      meta3: "No card needed",
    },
    features: {
      label: "CAPABILITIES",
      title: "Everything you need to",
      titleEm: "sell on autopilot",
      subtitle: "Everything your team needs to close more sales, without hiring more people.",
    },
    how: {
      label: "SIMPLE PROCESS",
      title: "How it works in",
      titleEm: "3 steps",
      subtitle: "From setup to results in less than 15 minutes.",
    },
    testimonials: {
      label: "SOCIAL PROOF",
      title: "What our",
      titleEm: "clients say",
    },
    faq: {
      badge: "FREQUENTLY ASKED QUESTIONS",
      titlePart1: "Got questions?",
      titlePart2: "We answer",
      noAnswer: "Didn't find your answer?",
      contactUs: "Contact us",
    },
    logos: {
      badge: "TRUSTED BY GROWING TEAMS",
    },
    roi: {
      badge: "LOSS CALCULATOR",
      titlePart1: "How much money are you",
      titlePart2: "losing",
      subtitle: "Adjust your business data and discover how much it costs you not to respond instantly.",
      leadsLabel: "Leads / Queries per month",
      valueLabel: "Average sale value (COP)",
      timeLabel: "Average response time",
      timeSuffix: "min",
      missedLeadsLabel: "Missed Leads",
      missedLeadsDesc: "Customers going to your competition",
      lostMoneyLabel: "Lost Revenue / Month",
      lostMoneyDesc: "Revenue you're missing out on",
      stratixCostLabel: "Stratix Cost",
      stratixCostDesc: "Monthly investment to recover it all",
      cta: "Recover your sales today",
    } as ROIStrings,
    beforeAfter: {
      badge: "WITHOUT STRATIX VS WITH STRATIX",
      titlePart1: "Two realities, one",
      titlePart2: "decision",
      withoutTitle: "Without Automation",
      withTitle: "With Stratix AI",
      withoutItems: [
        "You lose 40% of leads by not responding fast enough",
        "Your human team gets exhausted and makes mistakes",
        "You pay high salaries with no 24/7 coverage guarantee",
        "Your customers wait minutes or hours for a response",
        "Your competition takes your nighttime sales",
      ],
      withItems: [
        "You respond in under 2 seconds, always",
        "You close appointments and sales while you sleep",
        "A fixed monthly cost equivalent to 1% of a salary",
        "Premium and consistent experience for every customer",
        "Infinite scalability without hiring more staff",
      ],
    } as BeforeAfterStrings,
    aiPlayground: {
      openBtn: "Try Stratix AI live",
      header: "Stratix AI · AI Agent",
      status: "Online · Live demo",
      welcome: "Hi, I'm Stratix AI. Ask me about pricing, features or request a demo from my creator.",
      fallback: "Hi, how can I help you?",
      errorFallback: "Hi, I'm Stratix AI. Ask me about pricing or how to automate your sales.",
      placeholder: "Type your message...",
    } as AIPlaygroundStrings,
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
      t: { hero: { badge: "", titleLine1: "", titleLine2: "", subtitle: "", cta1: "", cta2: "" }, footer: { copyright: "" }, pricing: { perMonth: "", perYear: "", popular: "", title: "", titleEm: "", label: "", monthly: "", annual: "", saveBadge: "", freeMonths: "", startFree: "", startBtn: "", mostPopular: "", plans: { inicia: { name: "", desc: "", features: [] as string[] }, escala: { name: "", desc: "", features: [] as string[] }, domina: { name: "", desc: "", features: [] as string[] } } }, cta: { title: "", titleEm: "", subtitle: "", cta1: "", meta1: "", meta2: "", meta3: "" }, features: { label: "", title: "", titleEm: "", subtitle: "" }, how: { label: "", title: "", titleEm: "", subtitle: "" }, testimonials: { label: "", title: "", titleEm: "" }, faq: { badge: "", titlePart1: "", titlePart2: "", noAnswer: "", contactUs: "" }, logos: { badge: "" }, roi: { badge: "", titlePart1: "", titlePart2: "", subtitle: "", leadsLabel: "", valueLabel: "", timeLabel: "", timeSuffix: "", missedLeadsLabel: "", missedLeadsDesc: "", lostMoneyLabel: "", lostMoneyDesc: "", stratixCostLabel: "", stratixCostDesc: "", cta: "" }, beforeAfter: { badge: "", titlePart1: "", titlePart2: "", withoutTitle: "", withTitle: "", withoutItems: [] as string[], withItems: [] as string[] }, aiPlayground: { openBtn: "", header: "", status: "", welcome: "", fallback: "", errorFallback: "", placeholder: "" } }
    };
  }
  return context;
}

export { FAQS };