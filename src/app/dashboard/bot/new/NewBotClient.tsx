"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Cpu, Zap, ArrowLeft, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AGENT_TEMPLATE = {
  name: "Stratix Sales Agent",
  description: "Asesor experto en automatización de ventas con IA",
  system_prompt: `Eres "Stratix AI", Asesor de Ventas Oficial de Stratix Intelligence.

TU MISIÓN:
Convertir visitantes en clientes agendando una demo o cerrando una venta.

PLANES Y PRECIOS:
1. STARTER: $29 USD/mes ($79K COP) — 1 agente IA, 1K conversaciones/mes
2. PROFESSIONAL: $79 USD/mes ($219K COP) — 3 agentes IA, 10K conversaciones/mes
3. ENTERPRISE: $199 USD/mes ($599K COP) — Agentes ilimitados, soporte dedicado

PROTOCOLO DE VENTA:
1. SALUDO CON VALOR: Nunca digas solo "hola". Empieza con un gancho.
   Ejemplo: "¡Hola! 👋 Soy Stratix AI. Automatizamos tus ventas en WhatsApp para que no pierdas ni un cliente mientras duermes. ¿Qué tipo de negocio tienes?"

2. IDENTIFICACIÓN: Si el usuario dice su negocio, dale UN beneficio específico:
   - Inmobiliaria: "Agendamos visitas a propiedades 24/7 automáticamente."
   - Clínica/Salud: "Confirmamos citas y reducimos inasistencias un 80%."
   - E-commerce: "Respondemos dudas al instante y recuperamos carritos abandonados."
   - Restaurante: "Tomamos pedidos por WhatsApp sin que tengas que contestar el teléfono."

3. BENEFICIOS CLAVE (menciónalos según contexto):
   - Atención 24/7 sin descanso
   - Respuestas instantáneas (< 2 segundos)
   - Reduce costos de adquisición hasta 60%
   - Setup en 15 minutos, sin código
   - Integración con WhatsApp, Instagram y Web
   - Garantía de 14 días

4. MANEJO DE OBJECIONES:
   - "Muy caro": "Entiendo, pero piensa que un vendedor cuesta mínimo $1M COP/mes y no trabaja 24/7. Nuestro plan Starter es $79K COP/mes y atiende a todos tus clientes sin descanso. ¿No te parece buen retorno?"
   - "Déjame pensarlo": "Claro, es una decisión importante. ¿Qué te parece si te envío un caso de éxito de un negocio como el tuyo? Mientras puedes probar 14 días gratis."
   - "Ya tengo otro proveedor": "Perfecto, eso significa que ya ves el valor de la automatización. La diferencia es que nosotros respondemos en menos de 2 segundos y nuestro setup es en 15 minutos. ¿Te muestro la diferencia?"
   - "No sé si funciona para mi negocio": "Funciona para cualquier negocio que reciba consultas por WhatsApp o web. ¿Cuántas consultas recibes al día que no puedes responder a tiempo?"

5. CIERRE (CTA): Después de cada beneficio, invita a la acción:
   - "¿Quieres ver cómo funciona en vivo? Demo: https://stratix-intelligence-ia.vercel.app"
   - "¿Te gustaría agendar una demo gratuita con un experto?"
   - "¿Empezamos hoy? Escríbenos al WhatsApp: https://wa.me/573159269287"

REGLAS DE ORO:
- Respuestas CORTAS (2-3 oraciones máximo).
- Usa 1-2 emojis por respuesta como máximo.
- Siempre cierra con un CTA o pregunta.
- NUNCA inventes información fuera de este prompt.
- Si no sabes algo: "Ese es un detalle técnico, pero puedo agendar una llamada con un experto. ¿Te interesa?"`,
  model: "gemini"
};

export default function NewBotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: AGENT_TEMPLATE.name,
    description: AGENT_TEMPLATE.description,
    system_prompt: AGENT_TEMPLATE.system_prompt,
    model: AGENT_TEMPLATE.model
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error creando el agente");
      }

      const newBot = await res.json();
      toast.success("¡Agente creado exitosamente!");

      setTimeout(() => {
        router.push(`/dashboard/bot/${newBot.id}`);
      }, 1200);

    } catch (err) {
      toast.error("Error al crear el agente. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[700px]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <Link href="/dashboard" className="text-accent no-underline flex items-center gap-2 text-xs font-semibold mb-4">
          <ArrowLeft /> Volver al Dashboard
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mt-6">
          Crear <span className="text-accent">Agente IA</span>
        </h1>
        <p className="text-text-secondary mt-2">Configura tu agente para atención automática.</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="rounded-xl border border-white/10 bg-bg/60 p-8 backdrop-blur-xl"
      >
        <div className="mb-8">
          <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Nombre del Agente</label>
          <div className="relative">
            <Cpu className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
            <input
              required name="name" value={formData.name} onChange={handleChange}
              placeholder="Ej: Asesor Inmobiliario"
              className="w-full px-4 py-3 pl-12 rounded-xl border border-white/10 bg-white/5 text-text-primary text-base outline-none focus:border-accent/30 transition-all duration-200"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Descripción</label>
          <div className="relative">
            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
            <input
              required name="description" value={formData.description} onChange={handleChange}
              placeholder="Ej: Asesor de ventas inmobiliarias"
              className="w-full px-4 py-3 pl-12 rounded-xl border border-white/10 bg-white/5 text-text-primary text-base outline-none focus:border-accent/30 transition-all duration-200"
            />
          </div>
        </div>

        <div className="mb-12">
          <label className="block text-xs font-semibold text-text-muted mb-4 uppercase tracking-wider">Modelo IA</label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'gemini', label: 'Gemini 2.0 Flash', tag: 'Principal', color: '#4285F4' },
              { id: 'gpt', label: 'GPT-3.5 Turbo', tag: 'Backup', color: '#10A37F' },
              { id: 'groq', label: 'Llama 3.1 8B - Groq', tag: 'Gratis', color: '#FF6B35' },
              { id: 'mistral', label: 'Mistral Small', tag: 'Gratis', color: '#9F7AEA' }
            ].map(model => (
              <div
                key={model.id}
                onClick={() => setFormData({ ...formData, model: model.id })}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  formData.model === model.id
                    ? 'border-2 border-accent bg-accent-dim'
                    : 'border border-white/10 bg-white/5'
                }`}
              >
                <div className="text-xs font-semibold text-white px-2 py-0.5 rounded inline-block mb-2" style={{ background: model.color }}>{model.tag}</div>
                <div className="font-semibold text-sm text-text-primary">{model.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-4">
            Todos incluyen failover automático — si falla uno, otro responde
          </p>
        </div>

        <button
          type="submit" disabled={loading || !formData.name}
          className={`w-full py-3 rounded-xl border-none flex items-center justify-center gap-3 text-sm font-bold text-black transition-all duration-200 hover:scale-[1.02] ${
            loading ? 'bg-accent/20 cursor-not-allowed' : 'bg-accent cursor-pointer'
          }`}
        >
          {loading ? <Zap className="animate-pulse" /> : <Plus />}
          {loading ? 'Creando...' : 'Crear Agente'}
        </button>
      </motion.form>
    </div>
  );
}
