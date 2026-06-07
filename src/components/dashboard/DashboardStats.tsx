"use client";

import { motion } from "framer-motion";
import { Cpu, User, Zap, BarChart3 } from "lucide-react";

interface Stats {
  total: number;
  hot: number;
  warm: number;
  cold: number;
  activeBots: number;
  conversionRate: number;
  showSampleData: boolean;
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const cards = [
    { icon: Cpu, label: "Agentes", value: stats.activeBots, color: "text-accent", delay: 0.1 },
    { icon: User, label: "Total Leads", value: stats.total, color: "text-success", delay: 0.15 },
    { icon: Zap, label: "HOT Leads", value: stats.hot, color: "text-accent", delay: 0.2 },
    { icon: BarChart3, label: "Conversión", value: `${stats.conversionRate}%`, color: "text-success", delay: 0.25 },
  ];

  return (
    <>
      <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
        {cards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            className="rounded-xl border border-white/10 bg-bg/60 p-6"
          >
            <div className="mb-2 flex items-center gap-2">
              <stat.icon className={stat.color} />
              <span className="text-xs uppercase tracking-widest text-text-secondary">{stat.label}</span>
            </div>
            <div className={`font-serif text-3xl ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {stats.total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 rounded-xl border border-white/10 bg-bg/60 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-text-secondary">Distribución de Leads</span>
            {stats.showSampleData && (
              <span className="rounded-xs bg-accent-dim px-2 py-[2px] text-[0.7rem] text-accent">Datos de ejemplo</span>
            )}
          </div>
          <div className="flex h-2 overflow-hidden rounded-xs">
            <div style={{ flex: stats.hot }} className="rounded-l-xs bg-accent" />
            <div style={{ flex: stats.warm }} className="bg-[#FCD34D]" />
            <div style={{ flex: stats.cold }} className="rounded-r-xs bg-[#4a5568]" />
          </div>
          <div className="mt-3 flex justify-between text-xs">
            <span className="text-accent">● HOT {stats.hot}</span>
            <span className="text-[#FCD34D]">● WARM {stats.warm}</span>
            <span className="text-[#4a5568]">● COLD {stats.cold}</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
