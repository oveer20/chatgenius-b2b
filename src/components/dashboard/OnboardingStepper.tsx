"use client";

import Link from "next/link";
import { FiPlus, FiZap, FiMessageCircle, FiBarChart2 } from "react-icons/fi";

const STEPS = [
  {
    icon: FiPlus,
    label: "Crea tu agente",
    desc: "Elige nombre, descripción y motor de IA en segundos.",
  },
  {
    icon: FiZap,
    label: "Entrénalo",
    desc: "Añade conocimiento: pega texto, sube PDF o escanea tu web.",
  },
  {
    icon: FiMessageCircle,
    label: "Actívalo",
    desc: "Conéctalo a WhatsApp o Widget web y empieza a capturar leads.",
  },
];

export default function OnboardingStepper() {
  return (
    <div className="col-span-full rounded-xl border border-accent/20 bg-gradient-to-br from-bg/80 to-accent-dim/40 p-10 backdrop-blur-xl">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-5 border border-accent/20">
          <FiBarChart2 className="text-accent" size={24} />
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tighter text-text-primary mb-2">
          Tu primer agente IA en 3 clics
        </h2>
        <p className="text-text-secondary max-w-md text-sm">
          Crea, entrena y activa tu asistente virtual. Empieza gratis, sin tarjeta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {STEPS.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center">
            {i > 0 && (
              <div className="hidden md:block absolute top-6 -left-3 w-6 h-px bg-accent/30" />
            )}
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent font-semibold text-sm">
              {i + 1}
            </div>
            <step.icon className="text-accent mb-2" size={20} />
            <h3 className="font-semibold text-sm text-text-primary mb-1">{step.label}</h3>
            <p className="text-xs text-text-muted max-w-[200px]">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/dashboard/bot/new"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-bold text-sm text-[#030a05] no-underline transition-all duration-200 hover:scale-105"
        >
          <FiPlus size={18} />
          Crear mi primer agente
        </Link>
      </div>
    </div>
  );
}
