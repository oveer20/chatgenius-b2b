export const WHATSAPP_NUMBER = "573159269287";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CALENDLY_URL = "https://calendly.com/stratix-intelligence/demo";

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1 },
  COP: { symbol: 'Col$', code: 'COP', rate: 4000 }, 
};

export const PRICING_PLANS = [
  { 
    tier: "inicia",
    name: "Inicia", 
    priceUsd: 29, 
    priceCop: 89000,
    priceUsdAnnual: 25, 
    priceCopAnnual: 79000,
    description: "Ideal para probar el poder de la IA",
    features: ["1 Agente IA", "1,000 Mensajes/mes", "Soporte por Email", "WhatsApp + Web"],
    highlight: false 
  },
  { 
    tier: "escala",
    name: "Escala", 
    priceUsd: 69, 
    priceCop: 199000,
    priceUsdAnnual: 59, 
    priceCopAnnual: 169000,
    description: "El favorito para crecer rápido",
    features: ["5 Agentes IA", "10,000 Mensajes/mes", "Soporte Prioritario 24/7", "Opal Scoring", "API Access"],
    highlight: true,
    popular: true
  },
  { 
    tier: "domina",
    name: "Domina", 
    priceUsd: 299, 
    priceCop: 899000,
    priceUsdAnnual: 249, 
    priceCopAnnual: 749000,
    description: "Control total sin límites",
    features: ["Agentes Ilimitados", "Mensajes Ilimitados", "Account Manager Dedicado", "Custom Training", "SLA Garantizado"],
    highlight: false 
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

export const TRUST_LOGOS = [
  { name: "Google Gemini", color: "#8AB4F8" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Vercel", color: "#fff" },
  { name: "WhatsApp", color: "#25D366" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Mercado Pago", color: "#00B1EA" },
];
