"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Lead } from './types';

interface BotStatsProps {
  leads: Lead[];
  onExportCSV: () => void;
}

export default function BotStats({ leads, onExportCSV }: BotStatsProps) {
  if (leads.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-serif text-2xl">Análisis de Conversión</h3>
        <button onClick={onExportCSV} className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-105">Exportar CSV</button>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={[
                { name: 'Hot', value: leads.filter(l => l.score === 'Hot').length, color: '#D4AF37' },
                { name: 'Warm', value: leads.filter(l => l.score === 'Warm').length, color: '#FCD34D' },
                { name: 'Cold', value: leads.filter(l => l.score === 'Cold').length, color: '#9CA3AF' }
              ]} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                <Cell fill="#D4AF37" /><Cell fill="#FCD34D" /><Cell fill="#9CA3AF" />
              </Pie>
              <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid rgba(212,175,55,0.3)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 overflow-y-auto max-h-[250px]">
          <table className="w-full text-[0.8rem] border-collapse">
            <thead><tr className="opacity-40"><th>NOMBRE</th><th>SCORE</th></tr></thead>
            <tbody>
              {leads.slice(0, 10).map(l => (
                <tr key={l.id} className="border-b border-white/5">
                  <td className="py-[10px]">{l.name}</td>
                  <td><span className={l.score === 'Hot' ? 'text-accent' : ''}>{l.score}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
