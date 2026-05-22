"use client";

import { useLang } from "@/components/LangContext";

const BADGES = {
  es: [
    { icon: "⚡", label: "99.9% uptime", sub: "Disponibilidad garantizada" },
    { icon: "⚡", label: "< 2 segundos", sub: "Tiempo de respuesta" },
    { icon: "🛡", label: "Encriptación E2E", sub: "Tus datos seguros" },
    { icon: "🔒", label: "LGPD Compliant", sub: "Cumplimiento legal" },
    { icon: "💬", label: "Soporte < 4h", sub: "Respuesta garantizada" },
  ],
  en: [
    { icon: "⚡", label: "99.9% uptime", sub: "Guaranteed availability" },
    { icon: "⚡", label: "< 2 seconds", sub: "Response time" },
    { icon: "🛡", label: "E2E Encryption", sub: "Your data is safe" },
    { icon: "🔒", label: "LGPD Compliant", sub: "Legal compliance" },
    { icon: "💬", label: "Support < 4h", sub: "Guaranteed response" },
  ],
};

export default function TrustIndicators() {
  const { lang } = useLang();
  const badges = BADGES[lang as 'es' | 'en'];

  return (
    <div className="flex justify-center gap-4 lg:gap-8 flex-wrap px-6 lg:px-16">
      {badges.map((b, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-lg">{b.icon}</span>
          <div>
            <div className="text-sm font-bold text-text-primary">{b.label}</div>
            <div className="text-xs text-text-muted">{b.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
