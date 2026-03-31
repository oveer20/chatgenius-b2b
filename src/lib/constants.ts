"use client";

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1 },
  COP: { symbol: 'Col$', code: 'COP', rate: 4000 }, 
};

export const PRICING_PLANS = [
  { 
    name: "Starter", 
    priceUsd: 19, 
    features: ["1 Agente IA", "500 Mensajes", "Integración Web", "Soporte Mail"] 
  },
  { 
    name: "Business Pro", 
    priceUsd: 49, 
    features: ["3 Agentes IA", "2,500 Mensajes", "WhatsApp + Instagram", "Lead Scoring Predictivo"],
    highlight: true 
  },
  { 
    name: "Enterprise", 
    priceUsd: 199, 
    features: ["Agentes Ilimitados", "Custom CRM Sync", "Soporte 24/7 Dedicado", "Entrenamiento RAG Pro"] 
  }
];

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
