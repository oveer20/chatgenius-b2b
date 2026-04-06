"use client";

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1 },
  COP: { symbol: 'Col$', code: 'COP', rate: 4000 }, 
};

export const PRICING_PLANS = [
  { 
    name: "Starter", 
    priceUsd: 29, 
    features: ["1 Agente IA Neural", "1,000 Mensajes/mes", "Deep Crawl (10 páginas)", "Soporte Mail Élite"] 
  },
  { 
    name: "Professional Pro", 
    priceUsd: 79, 
    features: ["5 Agentes IA Neural", "5,000 Mensajes/mes", "Deep Crawl (50 páginas)", "WhatsApp Cloud Native", "Opal Logic v2.5 (Scoring)"],
    highlight: true 
  },
  { 
    name: "Enterprise Elite", 
    priceUsd: 249, 
    features: ["Agentes Ilimitados", "Mensajes Ilimitados*", "Deep Crawl (500 páginas)", "API Neural Relay", "Custom Fine-Tuning Support"] 
  }
];

export const STRATIX_LIMITS = {
  CRAWL_PAGES: { starter: 10, pro: 50, enterprise: 500 },
  MANUAL_INGEST_TOKENS: { starter: 20000, pro: 100000, enterprise: 1000000 },
  OUTREACH_SCRIPTS: { starter: 15, pro: 100, enterprise: 5000 }
};

export const USE_CASES = [
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Automatiza la recuperación de carritos abandonados y responde dudas sobre envíos en tiempo real.",
    impact: "Aumento del 25% en conversiones",
    iconName: "FiShoppingCart"
  },
  {
    id: "realestate",
    title: "Inmobiliarias",
    description: "Califica leads interesados en propiedades y agenda visitas sin intervención humana.",
    impact: "Reducción del 70% en tiempo de respuesta",
    iconName: "FiLayout"
  },
  {
    id: "health",
    title: "Salud",
    description: "Gestiona recordatorios de citas y responde preguntas frecuentes sobre servicios médicos.",
    impact: "Cero citas perdidas por falta de contacto",
    iconName: "FiActivity"
  },
  {
    id: "education",
    title: "Educación",
    description: "Resuelve dudas sobre cursos, inscripciones y pagos de forma inmediata para estudiantes.",
    impact: "Mejora del 40% en satisfacción del alumno",
    iconName: "FiCpu"
  }
];

export const INTEGRATIONS = [
  { name: "WhatsApp", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
  { name: "Instagram", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" },
  { name: "Shopify", icon: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "Zapier", icon: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Zapier_logo.svg" },
  { name: "Mercado Pago", icon: "https://seeklogo.com/images/M/mercado-pago-logo-453F772D1E-seeklogo.com.png" },
  { name: "Slack", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" }
];
