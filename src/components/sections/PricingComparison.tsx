"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

const COMPARE_ROWS = {
  es: [
    { feature: "Agentes IA", starter: "1", growth: "3", enterprise: "Ilimitado", ours: "Ilimitado" },
    { feature: "Leads/mes", starter: "500", growth: "5,000", enterprise: "100,000", ours: "Ilimitado" },
    { feature: "Canales", starter: "WhatsApp", growth: "WhatsApp + Web", enterprise: "Todos", ours: "Todos" },
    { feature: "Respuesta 24/7", starter: "✓", growth: "✓", enterprise: "✓", ours: "✓" },
    { feature: "Base de conocimiento RAG", starter: "1 PDF", growth: "10 PDFs", enterprise: "Ilimitado", ours: "Ilimitado" },
    { feature: "Integración CRM", starter: "—", growth: "✓", enterprise: "✓", ours: "✓" },
    { feature: "WhatsApp Business API", starter: "—", growth: "—", enterprise: "✓", ours: "✓" },
    { feature: "Analíticas avanzadas", starter: "Básicas", growth: "Avanzadas", enterprise: "Custom", ours: "En tiempo real" },
    { feature: "Integración Mercado Pago", starter: "—", growth: "✓", enterprise: "✓", ours: "✓" },
    { feature: "Soporte dedicado", starter: "Comunidad", growth: "Email", enterprise: "24/7 VIP", ours: "< 4 horas" },
    { feature: "API personalizada", starter: "—", growth: "—", enterprise: "✓", ours: "✓" },
    { feature: "Escalabilidad", starter: "Básica", growth: "Media", enterprise: "Enterprise", ours: "Infraestructura elástica" },
  ],
  en: [
    { feature: "AI Agents", starter: "1", growth: "3", enterprise: "Unlimited", ours: "Unlimited" },
    { feature: "Leads/month", starter: "500", growth: "5,000", enterprise: "100,000", ours: "Unlimited" },
    { feature: "Channels", starter: "WhatsApp", growth: "WhatsApp + Web", enterprise: "All", ours: "All" },
    { feature: "24/7 Response", starter: "✓", growth: "✓", enterprise: "✓", ours: "✓" },
    { feature: "RAG Knowledge Base", starter: "1 PDF", growth: "10 PDFs", enterprise: "Unlimited", ours: "Unlimited" },
    { feature: "CRM Integration", starter: "—", growth: "✓", enterprise: "✓", ours: "✓" },
    { feature: "WhatsApp Business API", starter: "—", growth: "—", enterprise: "✓", ours: "✓" },
    { feature: "Advanced Analytics", starter: "Basic", growth: "Advanced", enterprise: "Custom", ours: "Real-time" },
    { feature: "Mercado Pago Integration", starter: "—", growth: "✓", enterprise: "✓", ours: "✓" },
    { feature: "Dedicated Support", starter: "Community", growth: "Email", enterprise: "24/7 VIP", ours: "< 4 hours" },
    { feature: "Custom API", starter: "—", growth: "—", enterprise: "✓", ours: "✓" },
    { feature: "Scalability", starter: "Basic", growth: "Medium", enterprise: "Enterprise", ours: "Elastic infrastructure" },
  ],
};

function Checkmark({ val }: { val: string }) {
  if (val === "✓") return <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>;
  if (val === "—" || val === "") return <span style={{ color: '#4a5568' }}>—</span>;
  return <span style={{ color: '#f0f2f8', fontSize: '13px' }}>{val}</span>;
}

export default function PricingComparison() {
  const { lang } = useLang();
  const rows = COMPARE_ROWS[lang as 'es' | 'en'];

  return (
    <section style={{ padding: 'clamp(4rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <span style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontSize: '13px', fontWeight: 600, padding: '6px 16px', borderRadius: '20px', marginBottom: '16px' }}>
          {lang === "es" ? "¿POR QUÉ STRATIX?" : "WHY STRATIX?"}
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#f0f2f8', marginBottom: '12px' }}>
          {lang === "es" ? "Compara con la competencia" : "Compare with competitors"}
        </h2>
        <p style={{ color: '#8892a4', fontSize: '16px' }}>
          {lang === "es" ? "Sin letra pequeña. Sin límites sorpresa." : "No hidden fees. No surprise limits."}
        </p>
      </motion.div>

      <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px', color: '#4a5568', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {lang === "es" ? "CARACTERÍSTICA" : "FEATURE"}
              </th>
              {[
                lang === "es" ? "Competidor A" : "Competitor A",
                lang === "es" ? "Competidor B" : "Competitor B",
                lang === "es" ? "Enterprise" : "Enterprise",
                "STRATIX",
              ].map((h, i) => (
                <th key={i} style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px', color: i === 3 ? '#D4AF37' : '#4a5568', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)', borderLeft: i === 3 ? '2px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.07)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '14px 20px', fontSize: '14px', color: '#8892a4' }}>{row.feature}</td>
                {[row.starter, row.growth, row.enterprise, row.ours].map((val, j) => (
                  <td key={j} style={{ padding: '14px 20px', textAlign: 'center', borderLeft: j === 3 ? '2px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.04)' }}>
                    {j === 3 ? (
                      <span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>{val}</span>
                    ) : (
                      <Checkmark val={val} />
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: '2rem', fontSize: '13px', color: '#4a5568' }}
      >
        {lang === "es"
          ? "* Los competidores varían. Datos basados en investigación de mercado de enero 2026."
          : "* Competitors vary. Data based on market research from January 2026."}
      </motion.div>
    </section>
  );
}