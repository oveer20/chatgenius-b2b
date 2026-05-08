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
    <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 3vw, 2rem)', flexWrap: 'wrap', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
      {badges.map((b, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>{b.icon}</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0f2f8' }}>{b.label}</div>
            <div style={{ fontSize: '11px', color: '#4a5568' }}>{b.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}