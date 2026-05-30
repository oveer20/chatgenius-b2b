export type LangType = "es" | "en";

export interface BeforeAfterStrings {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  withoutTitle: string;
  withTitle: string;
  withoutItems: string[];
  withItems: string[];
}

export interface Translations {
  hero: { badge: string; titleLine1: string; titleLine2: string; subtitle: string; cta1: string; cta2: string };
  footer: { copyright: string };
  pricing: { perMonth: string; perYear: string; popular: string; title: string; titleEm: string; label: string; monthly: string; annual: string; saveBadge: string; freeMonths: string; startFree: string; startBtn: string; mostPopular: string; plans: { inicia: { name: string; desc: string; features: string[] }; escala: { name: string; desc: string; features: string[] }; domina: { name: string; desc: string; features: string[] } } };
  cta: { title: string; titleEm: string; subtitle: string; cta1: string; meta1: string; meta2: string; meta3: string };
  features: { label: string; title: string; titleEm: string; subtitle: string };
  how: { label: string; title: string; titleEm: string; subtitle: string };
  testimonials: { label: string; title: string; titleEm: string };
  faq: { badge: string; titlePart1: string; titlePart2: string; noAnswer: string; contactUs: string };
  logos: { badge: string };
  roi: { badge: string; titlePart1: string; titlePart2: string; subtitle: string; leadsLabel: string; valueLabel: string; timeLabel: string; timeSuffix: string; missedLeadsLabel: string; missedLeadsDesc: string; lostMoneyLabel: string; lostMoneyDesc: string; stratixCostLabel: string; stratixCostDesc: string; cta: string };
  beforeAfter: BeforeAfterStrings;
}

export const translations: Record<LangType, Translations> = {
  es: {
    hero: {
      badge: "🤖 IA + AUTOMATIZACIÓN",
      titleLine1: "Tu agente de ventas",
      titleLine2: "que nunca duerme",
      subtitle: "Automatiza tu atención 24/7. Responde al instante. Cierra ventas mientras descansas.",
      cta1: "Comenzar Gratis",
      cta2: "Ver Demo en Vivo",
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
      startFree: "Desplegar IA Gratis",
      startBtn: "Iniciar Ahora",
      mostPopular: "Más Popular",
      plans: {
        inicia: { name: "Inicia", desc: "Ideal para probar el poder de la IA", features: ["1 Agente IA", "1,000 Mensajes/mes", "Soporte por Email", "WhatsApp + Web"] },
        escala: { name: "Escala", desc: "El favorito para crecer rápido", features: ["5 Agentes IA", "10,000 Mensajes/mes", "Soporte Prioritario 24/7", "Opal Scoring", "API Access"] },
        domina: { name: "Domina", desc: "Control total sin límites", features: ["Agentes Ilimitados", "Mensajes Ilimitados", "Account Manager Dedicado", "Custom Training", "SLA Garantizado"] },
      },
    },
    cta: {
      title: "¿Listo para",
      titleEm: "automatizar?",
      subtitle: "Habla con un experto ahora",
      cta1: "Comenzar Gratis",
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
      titleEm: "4 pasos",
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
    logos: { badge: "CONFIADO POR EQUIPOS EN CRECIMIENTO" },
    roi: {
      badge: "CALCULADORA DE PERDIDAS",
      titlePart1: "Cuanto dinero estas",
      titlePart2: "perdiendo",
      subtitle: "Ajusta los datos de tu negocio y descubre cuanto te cuesta no responder al instante.",
      leadsLabel: "Leads / Consultas al mes",
      valueLabel: "Valor promedio de venta (COP)",
      timeLabel: "Tiempo promedio de respuesta",
      timeSuffix: "min",
      missedLeadsLabel: "Leads perdidos al mes",
      missedLeadsDesc: "no respondiste a tiempo",
      lostMoneyLabel: "Dinero perdido al mes",
      lostMoneyDesc: "que pudiste haber ganado",
      stratixCostLabel: "Inversión en Stratix",
      stratixCostDesc: "recuperas tu inversión",
      cta: "Calcular mi ahorro",
    },
    beforeAfter: {
      badge: "ANTES VS DESPUÉS",
      titlePart1: "Sin Stratix vs",
      titlePart2: "Con Stratix",
      withoutTitle: "Sin Stratix",
      withTitle: "Con Stratix",
      withoutItems: ["Cliente espera 2+ horas", "Agente pierde contexto", "Lead se enfría", "Venta perdida"],
      withItems: ["Respuesta en 2 segundos", "Contexto completo", "Lead calificado al instante", "Venta cerrada"],
    },
  },
  en: {
    hero: {
      badge: "🤖 AI + AUTOMATION",
      titleLine1: "Your sales agent",
      titleLine2: "that never sleeps",
      subtitle: "Automate your support 24/7. Respond instantly. Close sales while you rest.",
      cta1: "Start Free",
      cta2: "See Live Demo",
    },
    footer: {
      copyright: "© 2024 Stratix Intelligence. All rights reserved.",
    },
    pricing: {
      perMonth: "/mo",
      perYear: "/yr",
      popular: "Most popular",
      title: "Simple plans,",
      titleEm: "clear pricing",
      label: "SMART INVESTMENT",
      monthly: "Monthly",
      annual: "Annual",
      saveBadge: "(Save 20%)",
      freeMonths: "2 months free",
      startFree: "Deploy AI Free",
      startBtn: "Start Now",
      mostPopular: "Most Popular",
      plans: {
        inicia: { name: "Start", desc: "Ideal to test the power of AI", features: ["1 AI Agent", "1,000 Messages/mo", "Email Support", "WhatsApp + Web"] },
        escala: { name: "Scale", desc: "The favorite to grow fast", features: ["5 AI Agents", "10,000 Messages/mo", "Priority Support 24/7", "Opal Scoring", "API Access"] },
        domina: { name: "Dominate", desc: "Full control with no limits", features: ["Unlimited Agents", "Unlimited Messages", "Dedicated Account Manager", "Custom Training", "Guaranteed SLA"] },
      },
    },
    cta: {
      title: "Ready to",
      titleEm: "automate?",
      subtitle: "Talk to an expert now",
      cta1: "Start Free",
      meta1: "15 min setup",
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
      titleEm: "4 steps",
      subtitle: "From setup to results in less than 15 minutes.",
    },
    testimonials: {
      label: "SOCIAL PROOF",
      title: "What our",
      titleEm: "clients say",
    },
    faq: {
      badge: "FAQs",
      titlePart1: "Got questions?",
      titlePart2: "We have answers",
      noAnswer: "Didn't find your answer?",
      contactUs: "Contact us",
    },
    logos: { badge: "TRUSTED BY GROWING TEAMS" },
    roi: {
      badge: "LOSS CALCULATOR",
      titlePart1: "How much money",
      titlePart2: "are you losing",
      subtitle: "Adjust your business data and discover how much it costs you not to respond instantly.",
      leadsLabel: "Leads / Inquiries per month",
      valueLabel: "Average sale value (USD)",
      timeLabel: "Average response time",
      timeSuffix: "min",
      missedLeadsLabel: "Missed leads per month",
      missedLeadsDesc: "you didn't respond in time",
      lostMoneyLabel: "Money lost per month",
      lostMoneyDesc: "you could have earned",
      stratixCostLabel: "Stratix investment",
      stratixCostDesc: "you recover your investment",
      cta: "Calculate my savings",
    },
    beforeAfter: {
      badge: "BEFORE VS AFTER",
      titlePart1: "Without Stratix vs",
      titlePart2: "With Stratix",
      withoutTitle: "Without Stratix",
      withTitle: "With Stratix",
      withoutItems: ["Client waits 2+ hours", "Agent loses context", "Lead goes cold", "Sale lost"],
      withItems: ["Response in 2 seconds", "Full context", "Lead qualified instantly", "Sale closed"],
    },
  },
};
