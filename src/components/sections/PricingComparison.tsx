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
  if (val === "✓") return <span className="text-emerald-500 font-bold">✓</span>;
  if (val === "—" || val === "") return <span className="text-text-muted">—</span>;
  return <span className="text-text-primary text-xs">{val}</span>;
}

export default function PricingComparison() {
  const { lang } = useLang();
  const rows = COMPARE_ROWS[lang as 'es' | 'en'];

  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,10vw,6rem)] max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block bg-accent-dim text-accent text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
          {lang === "es" ? "¿POR QUÉ STRATIX?" : "WHY STRATIX?"}
        </span>
        <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-text-primary mb-3">
          {lang === "es" ? "Compara con la competencia" : "Compare with competitors"}
        </h2>
        <p className="text-text-secondary text-base">
          {lang === "es" ? "Sin letra pequeña. Sin límites sorpresa." : "No hidden fees. No surprise limits."}
        </p>
      </motion.div>

      <div className="overflow-x-auto rounded-2xl border border-white/5">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-white/5">
              <th className="p-4 px-5 text-left font-mono text-xs tracking-widest text-text-muted uppercase border-b border-white/5">
                {lang === "es" ? "CARACTERÍSTICA" : "FEATURE"}
              </th>
              {[
                lang === "es" ? "Competidor A" : "Competitor A",
                lang === "es" ? "Competidor B" : "Competitor B",
                lang === "es" ? "Enterprise" : "Enterprise",
                "STRATIX",
              ].map((h, i) => (
                <th key={i} className={"p-4 px-5 text-center font-mono text-xs tracking-widest uppercase border-b border-white/5 " + (i === 3 ? 'text-accent border-l-2 border-accent/30' : 'text-text-muted border-l border-white/5')}>
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
                className="border-b border-white/5 transition-colors duration-200 hover:bg-white/5"
              >
                <td className="p-3.5 px-5 text-sm text-text-secondary">{row.feature}</td>
                {[row.starter, row.growth, row.enterprise, row.ours].map((val, j) => (
                  <td key={j} className={"p-3.5 px-5 text-center " + (j === 3 ? 'border-l-2 border-accent/30' : 'border-l border-white/5')}>
                    {j === 3 ? (
                      <span className="text-emerald-500 font-bold text-xs">{val}</span>
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
        className="text-center mt-8 text-xs text-text-muted"
      >
        {lang === "es"
          ? "* Los competidores varían. Datos basados en investigación de mercado de enero 2026."
          : "* Competitors vary. Data based on market research from January 2026."}
      </motion.div>
    </section>
  );
}
