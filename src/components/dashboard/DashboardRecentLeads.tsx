"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  score: string;
  source: string;
  created_at: string;
}

export default function DashboardRecentLeads({ leads }: { leads: Lead[] }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="mb-12 rounded-xl border border-white/10 bg-bg/60 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-text-muted" />
          <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Leads Recientes</span>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <User className="mb-3 h-8 w-8 text-text-muted" />
          <p className="text-sm text-text-secondary">Aún no hay leads</p>
          <p className="mt-1 text-xs text-text-muted">Los leads capturados aparecerán aquí automáticamente.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 rounded-xl border border-white/10 bg-bg/60 backdrop-blur-xl p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-text-muted" />
          <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Leads Recientes</span>
        </div>
        <Link href="/dashboard/leads" className="flex items-center gap-1 text-xs font-bold text-accent no-underline">
          Ver todos <ArrowRight />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-text-muted">
              <th className="py-2 pr-4 text-left font-semibold">Nombre</th>
              <th className="py-2 pr-4 text-left font-semibold">Score</th>
              <th className="py-2 pr-4 text-left font-semibold">Fuente</th>
              <th className="py-2 text-left font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} className="border-b border-white/[0.02]">
                <td className="py-2 pr-4">{lead.name}</td>
                <td className={`py-2 pr-4 font-semibold ${lead.score === 'Hot' ? 'text-accent' : lead.score === 'Warm' ? 'text-blue-500' : 'text-text-muted'}`}>{lead.score}</td>
                <td className="py-2 pr-4 text-xs uppercase">{lead.source}</td>
                <td className="py-2 text-xs text-text-muted">{new Date(lead.created_at).toLocaleDateString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
