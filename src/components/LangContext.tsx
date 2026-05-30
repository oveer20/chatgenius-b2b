"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LangType, Translations, translations } from "@/lib/translations";

export interface FAQ { q: string; a: string }

interface LangContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
  showUSD: boolean;
  setShowUSD: (show: boolean) => void;
  t: Translations;
}

const FAQS_DATA: Record<string, FAQ[]> = {
  es: [
    { q: "¿Cuánto tiempo tarda en configurarse Stratix?", a: "En 15 minutos tienes tu primer agente configurado. No necesitas experiencia técnica." },
    { q: "¿Stratix se integra con mi CRM?", a: "Sí. Conectamos con HubSpot, Salesforce, Zoho, Pipedrive y cualquier sistema con API." },
    { q: "¿Hay garantía?", a: "Sí. 14 días de garantía total. Si no ves resultados, te devolvemos tu dinero." },
    { q: "¿Funciona con WhatsApp Business?", a: "Sí. Integramos directamente con tu WhatsApp Business para que el agente responda mensajes automáticamente 24/7." },
    { q: "¿Puedo entrenar al agente con mi información?", a: "Claro. Sube documentos, PDFs, tu página web o base de conocimiento y el agente aprende tu negocio en minutos." },
    { q: "¿Qué pasa si el agente no sabe responder algo?", a: "El agente escala automáticamente a un humano por WhatsApp o email. Tú decides cuándo y cómo." },
    { q: "¿Puedo cancelar en cualquier momento?", a: "Sí. Sin contratos largos ni penalizaciones. Cancelas cuando quieras desde tu dashboard." },
    { q: "¿Cuántos agentes puedo tener?", a: "Depende de tu plan. Desde 1 agente en el plan Inicia hasta ilimitados en el plan Domina." },
    { q: "¿Es seguro? ¿Qué pasa con mis datos?", a: "Tus datos están encriptados y almacenados de forma segura. Cumplimos con estándares de privacidad y nunca compartimos tu información." },
  ],
  en: [
    { q: "How long does it take to set up Stratix?", a: "In 15 minutes you have your first agent configured. No technical experience needed." },
    { q: "Does Stratix integrate with my CRM?", a: "Yes. We connect with HubSpot, Salesforce, Zoho, Pipedrive and any system with API." },
    { q: "Is there a guarantee?", a: "Yes. 14-day total guarantee. If you don't see results, we refund your money." },
    { q: "Does it work with WhatsApp Business?", a: "Yes. We integrate directly with your WhatsApp Business so the agent responds to messages automatically 24/7." },
    { q: "Can I train the agent with my own information?", a: "Absolutely. Upload documents, PDFs, your website or knowledge base and the agent learns your business in minutes." },
    { q: "What happens if the agent doesn't know how to answer something?", a: "The agent automatically escalates to a human via WhatsApp or email. You decide when and how." },
    { q: "Can I cancel at any time?", a: "Yes. No long contracts or penalties. Cancel anytime from your dashboard." },
    { q: "How many agents can I have?", a: "It depends on your plan. From 1 agent in the Starter plan to unlimited in the Enterprise plan." },
    { q: "Is it secure? What happens to my data?", a: "Your data is encrypted and stored securely. We comply with privacy standards and never share your information." },
  ],
};

const defaultTranslations: Translations = translations.es;

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangType>("es");
  const [showUSD, setShowUSD] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stratix_lang");
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  const handleSetLang = (newLang: LangType) => {
    setLangState(newLang);
    localStorage.setItem("stratix_lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, showUSD, setShowUSD, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    return { lang: "es" as LangType, setLang: () => {}, showUSD: false, setShowUSD: () => {}, t: defaultTranslations };
  }
  return context;
}

export { FAQS_DATA as FAQS };
