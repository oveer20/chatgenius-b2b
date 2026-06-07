"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStrings } from "@/lib/useStrings";

const VIEWS = [
  {
    id: "dashboard",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
    label: "Dashboard",
  },
  {
    id: "chat",
    gradient: "from-success/20 via-success/5 to-transparent",
    accent: "#10b981",
    label: "Chat IA",
  },
  {
    id: "leads",
    gradient: "from-info/20 via-info/5 to-transparent",
    accent: "#3B82F6",
    label: "Leads",
  },
  {
    id: "analytics",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
    label: "Analytics",
  },
];

export default function ScreensShowcase() {
  const { s } = useStrings();
  const [active, setActive] = useState(0);

  const t = {
    title: s("Tu centro de control IA", "Your AI command center"),
    titleEm: s("en tiempo real", "in real time"),
    subtitle: s("Métrica viva. Cada lead, cada conversación, cada venta en un solo lugar.", "Live metrics. Every lead, conversation, and sale in one place."),
  };

  return (
    <section className="px-[clamp(1.5rem,5vw,4rem)] py-32 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-[600px]"
      >
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-3">
          {t.title}<br />
          <em className="text-accent italic">{t.titleEm}</em>
        </h2>
        <p className="text-text-secondary text-base leading-relaxed">{t.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <div className="flex lg:flex-col gap-2">
          {VIEWS.map((view, i) => (
            <motion.button
              key={view.id}
              onClick={() => setActive(i)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left px-5 py-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                i === active
                  ? 'bg-bg/80 backdrop-blur-xl border-accent/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
                  : 'bg-transparent border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className={`font-mono text-xs mb-1 ${i === active ? 'text-accent' : 'text-text-muted'}`}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className={`font-semibold text-sm ${i === active ? 'text-text-primary' : ''}`}>
                {view.label}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="relative min-h-[400px]">
          <div className={`absolute inset-0 bg-gradient-to-br ${VIEWS[active].gradient} rounded-3xl opacity-60 pointer-events-none`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative bg-bg/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="flex items-center gap-2.5 mb-8 pb-5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] tracking-[1px] text-text-muted ml-2">STRATIX OS · {VIEWS[active].label.toUpperCase()}</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                  <span className="font-mono text-[9px] text-emerald-500">LIVE</span>
                </div>
              </div>

              {active === 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "1,847", label: s("Empresas", "Companies"), change: "+12%", up: true },
                    { val: "2.4M", label: "Leads", change: "+8%", up: true },
                    { val: "98.7%", label: "Uptime", change: "+0.2%", up: true },
                    { val: "$47K", label: "MRR", change: "+23%", up: true },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="font-serif text-3xl font-bold text-text-primary mb-1">{stat.val}</div>
                      <div className="text-xs text-text-muted">{stat.label}</div>
                      <div className={`text-xs mt-1 ${stat.up ? 'text-emerald-500' : 'text-red-400'}`}>{stat.change}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {active === 1 && (
                <div className="flex flex-col gap-4">
                  {[
                    { role: "user", text: s("¿Tienen disponible el apartamento del catálogo?", "Is the apartment from the catalog available?") },
                    { role: "bot", text: s("¡Sí! El apto 304, 75m², $380M, está disponible. ¿Te gustaría agendar una visita hoy?", "Yes! Apt 304, 75m², $380M is available. Would you like to schedule a visit today?") },
                    { role: "user", text: s("Sí, mañana a las 10am", "Yes, tomorrow at 10am") },
                    { role: "bot", text: s("✅ ¡Agendado! Recibirás un recordatorio por WhatsApp. ¿Algo más?", "✅ Booked! You'll get a WhatsApp reminder. Anything else?") },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-accent/15 border border-accent/20 text-text-primary"
                          : "bg-white/5 border border-white/5 text-text-primary"
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {active === 2 && (
                <div className="overflow-hidden">
                  <div className="grid grid-cols-[1fr_80px_80px_80px] gap-3 text-xs font-mono text-text-muted uppercase tracking-wider mb-3 px-3">
                    <span>{s("Contacto", "Contact")}</span>
                    <span className="text-center">Score</span>
                    <span className="text-center">{s("Estado", "Status")}</span>
                    <span className="text-center">{s("Acción", "Action")}</span>
                  </div>
                  {([
                    { name: "Carlos M.", score: "92", status: "HOT", color: "text-emerald-500" },
                    { name: "Ana R.", score: "78", status: "WARM", color: "text-accent" },
                    { name: "Luis P.", score: "34", status: "COLD", color: "text-text-muted" },
                    { name: "Sofía G.", score: "88", status: "HOT", color: "text-emerald-500" },
                  ] as const).map((lead, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="grid grid-cols-[1fr_80px_80px_80px] gap-3 items-center px-3 py-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="text-sm text-text-primary font-medium">{lead.name}</span>
                      <span className="text-sm text-center font-mono text-text-primary">{lead.score}%</span>
                      <span className={`text-xs text-center font-semibold ${lead.color}`}>{lead.status}</span>
                      <span className="text-xs text-center text-accent cursor-pointer hover:underline">{s("Contactar", "Contact")}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {active === 3 && (
                <div className="flex flex-col gap-6">
                  <div className="h-[120px] flex items-end gap-3">
                    {[45, 62, 38, 75, 52, 88, 70, 95, 60, 82, 48, 68].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-accent/40 to-accent/10 relative group cursor-pointer"
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity font-mono">{h}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                      <div className="font-serif text-2xl font-bold text-accent">47.8%</div>
                      <div className="text-xs text-text-muted mt-1">{s("Tasa conversión", "Conversion rate")}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                      <div className="font-serif text-2xl font-bold text-emerald-500">1.8s</div>
                      <div className="text-xs text-text-muted mt-1">{s("Respuesta promedio", "Avg response")}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                      <div className="font-serif text-2xl font-bold text-[#3B82F6]">92%</div>
                      <div className="text-xs text-text-muted mt-1">{s("Satisfacción", "Satisfaction")}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
