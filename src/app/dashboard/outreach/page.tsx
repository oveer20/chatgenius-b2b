"use client";

import { useState, useEffect, Suspense } from "react";
import {
  FiMessageSquare, FiMapPin, FiCheckCircle, FiInfo,
  FiArrowLeft, FiZap, FiUser, FiPhone
} from "react-icons/fi";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const STATIC_TARGETS = [
  { city: "Bogotá", name: "Inmobiliaria Norte", whatsapp: "573100000001", description: "Líder en zonas residenciales del norte", strategy: "Stratix puede automatizar su atención 24/7 y calificación de leads.", message: "Hola equipo de Inmobiliaria Norte! Vi que lideran el norte de la ciudad. He desarrollado Stratix, una IA que responde consultas de propiedades al instante. ¿Les interesa una demo gratuita de 7 días?", source: "static" },
  { city: "Bogotá", name: "Arquitectos Associates", whatsapp: "573100000002", description: "Enfoque en proyectos residenciales de lujo", strategy: "Leads de alto valor necesitan atención premium. Stratix la provee.", message: "Hola! Respeto mucho el enfoque de lujo de Arquitectos Associates. Me gustaría ofrecerles Stratix Intelligence, una IA que protege su imagen premium mientras escala su atención. ¿Hablamos?", source: "static" },
  { city: "Medellín", name: "Ciudad Verde Inmuebles", whatsapp: "573100000003", description: "Proyectos eco-sostenibles en expansión", strategy: "Expansion requiere volumen. Stratix maneja volumen sin perder calidad.", message: "Hola equipo de Ciudad Verde! Me encanta su enfoque sostenible. Quería ofrecerles Stratix, una IA que escala su atención mientras mantienen su compromiso ambiental. ¿Probamos una semana gratis?", source: "static" },
  { city: "Cali", name: "Valle Real Properties", whatsapp: "573100000004", description: "El gigante inmobiliario del Valle", strategy: "Mayor volumen requiere más automation.", message: "Hola! Vi el impacto de Valle Real en el mercado. He diseñado Stratix para ayudar a su equipo a manejar más consultas sin perder calidad. ¿Les interesa una demo estratégica?", source: "static" },
  { city: "Barranquilla", name: "Caribe Homes", whatsapp: "573100000005", description: "Especialistas en vivienda social", strategy: "Volumen alto necesita velocidad. Stratix responde en 2 segundos.", message: "Hola equipo de Caribe Homes! El mercado de vivienda social es competitivo. Stratix puede ayudarles a capturar más leads respondiendo al instante. ¿Les gustaría probar una semana gratis?", source: "static" },
];

interface Target {
  city: string;
  name: string;
  whatsapp: string;
  description: string;
  strategy: string;
  message: string;
  source: string;
}

function OutreachContent() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [targets, setTargets] = useState<Target[]>(STATIC_TARGETS);
  const [contacted, setContacted] = useState<string[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.id);

      const saved = localStorage.getItem(`stratix_contacted_${user.id}`);
      if (saved) setContacted(JSON.parse(saved));

      try {
        const res = await fetch("/api/leads?score=Hot");
        if (res.ok) {
          const hotLeads = await res.json();
          const dynamicTargets: Target[] = hotLeads
            .filter((l: { whatsapp?: string }) => l.whatsapp)
            .map((l: { name?: string; phone?: string; email?: string; bots?: { name?: string }; whatsapp: string }) => ({
              city: "Tus Leads Hot 🔥",
              name: l.name || "Prospecto",
              whatsapp: l.whatsapp.replace(/\D/g, ""),
              description: `${l.email || "Sin email"} · Bot: ${l.bots?.name || "Stratix"}`,
              strategy: `Lead calificado como HOT por Opal Logic. Conversión estimada: alta.`,
              message: `Hola ${l.name || ""}! Vi que estuviste interesado en nuestros servicios. ¿Podemos agendar una llamada rápida para contarte más sobre lo que Stratix puede hacer por ti? 🚀`,
              source: "dynamic"
            }));
          if (dynamicTargets.length > 0) {
            setTargets([...dynamicTargets, ...STATIC_TARGETS]);
            toast.success(`${dynamicTargets.length} leads Hot cargados como targets`);
          }
        }
      } catch {
      } finally {
        setIsLoadingLeads(false);
      }
    }
    init();
  }, [router]);

  const handleContact = (target: Target) => {
    const encodedText = encodeURIComponent(target.message);
    window.open(`https://wa.me/${target.whatsapp}?text=${encodedText}`, "_blank");

    if (!contacted.includes(target.name)) {
      const updated = [...contacted, target.name];
      setContacted(updated);
      if (userId) {
        localStorage.setItem(`stratix_contacted_${userId}`, JSON.stringify(updated));
      }
      toast.success(`${target.name} marcado como contactado`);
    }
  };

  const grouped = targets.reduce<Record<string, Target[]>>((acc, t) => {
    if (!acc[t.city]) acc[t.city] = [];
    acc[t.city].push(t);
    return acc;
  }, {});

  const totalTargets = targets.length;
  const contactedCount = contacted.filter(n => targets.some(t => t.name === n)).length;

  return (
    <div>
      <div className="flex justify-between items-start mb-12">
        <div>
          <Link href="/dashboard" className="text-accent no-underline flex items-center gap-2 text-xs font-bold mb-4">
            <FiArrowLeft /> Regresar al Dashboard
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mb-3">
            Magic <span className="text-accent">Outreach</span>
          </h1>
          <p className="opacity-60 text-base max-w-xl">
            Proyecta el poder de Stratix Intelligence con guiones de alta conversión en un clic.
            {isLoadingLeads && (
              <span className="text-accent ml-2.5 text-xs">
                Cargando leads Hot...
              </span>
            )}
          </p>
        </div>

        <div className="p-6 px-8 bg-accent/5 rounded-xl border border-accent/20 text-center min-w-36">
          <div className="text-xs font-black opacity-50 mb-2 tracking-widest">PROGRESO</div>
          <div className="text-4xl font-black text-accent leading-none">
            {contactedCount}
          </div>
          <div className="text-sm opacity-40 mt-1">de {totalTargets}</div>
          <div className="mt-2.5 h-1 bg-white/5 rounded-full overflow-hidden">
            <div style={{ width: `${totalTargets > 0 ? (contactedCount / totalTargets) * 100 : 0}%`, height: '100%', background: '#D4AF37', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {isLoadingLeads && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FiMapPin className="text-accent" />
            <h2 className="text-base font-semibold tracking-wider uppercase text-text-muted">Cargando targets...</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      )}

      {!isLoadingLeads && Object.entries(grouped).map(([city, cityTargets], cityIndex) => (
        <div key={city} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FiMapPin className={cityTargets[0]?.source === 'dynamic' ? 'text-red-500' : 'text-accent'} />
            <h2 className="text-base font-semibold tracking-wider uppercase text-text-muted">{city}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
            <span className="text-xs text-text-muted">{cityTargets.length} targets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityTargets.map((target, i) => {
              const isContacted = contacted.includes(target.name);
              const isDynamic = target.source === 'dynamic';
              return (
                <motion.div
                  key={`${target.name}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (cityIndex * 3 + i) * 0.08 }}
                   className={`p-8 rounded-xl relative overflow-hidden transition-all duration-200 backdrop-blur-xl ${isDynamic ? 'bg-red-500/[0.03] border border-red-500/30' : 'bg-bg/60 border border-white/10'} ${isContacted ? 'border-2 border-green-500' : ''}`}
                >
                  {isDynamic && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-xs tracking-tighter">
                      LEAD HOT REAL
                    </span>
                  )}
                  {isContacted && <FiCheckCircle className="absolute top-4 right-4 text-green-500" />}

                  <div className={isDynamic ? 'mt-7' : ''}>
                    <div className="flex items-center gap-2.5 mb-1">
                      {isDynamic ? <FiUser className="text-red-500 flex-shrink-0" /> : <FiZap className="text-accent flex-shrink-0" />}
                      <h3 className="text-xl font-black">{target.name}</h3>
                    </div>
                    <p className="text-sm opacity-50 mb-6 flex items-center gap-1.5">
                      <FiPhone size={12} /> {target.description}
                    </p>

                    <div className={`mb-7 bg-white/[0.02] p-4 rounded-md ${isDynamic ? 'border-red-500' : 'border-l-accent'}`} style={{ borderLeftWidth: '3px', borderLeftColor: isDynamic ? '#ef4444' : '#D4AF37' }}>
                      <div className="text-xs font-black opacity-40 mb-1 uppercase tracking-tight">Potencial Estratégico</div>
                      <div className="text-sm leading-relaxed opacity-80">{target.strategy}</div>
                    </div>

                    <button
                      onClick={() => handleContact(target)}
                      className={`w-full py-4 border-none rounded-lg font-black cursor-pointer flex items-center justify-center gap-3 text-sm tracking-tight transition-all duration-300 hover:opacity-90 ${isContacted ? 'bg-white/5 text-text-primary' : isDynamic ? 'bg-red-500 text-black' : 'bg-accent text-black'}`}
                    >
                      <FiMessageSquare size={16} />
                      {isContacted ? 'Re-contactar' : 'Enviar WhatsApp'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-16 p-8 rounded-xl border border-accent/20 bg-bg/60 backdrop-blur-xl">
        <div className="flex items-center gap-3.5 mb-6">
          <FiInfo size={28} color="#D4AF37" />
          <h3 className="font-serif text-xl font-bold tracking-tighter text-text-primary">Cómo usar Outreach</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "1", text: "Abre WhatsApp Web en tu navegador." },
            { step: "2", text: "Haz clic en el target elegido — el mensaje se precarga." },
            { step: "3", text: "Presiona Enviar. El progreso se guarda automáticamente." },
            { step: "4", text: "Los leads Hot de tus bots aparecen aquí en tiempo real." }
          ].map(item => (
            <div key={item.step} className="flex gap-3.5">
              <span className="text-4xl font-black text-accent opacity-30 leading-none">{item.step}</span>
              <p className="text-sm leading-relaxed opacity-70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OutreachDashboard() {
  return (
    <Suspense fallback={<div className="p-12 text-text-primary text-center">Preparando campaña...</div>}>
      <OutreachContent />
    </Suspense>
  );
}
