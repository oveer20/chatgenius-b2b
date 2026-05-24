"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiCpu, FiZap, FiActivity } from "react-icons/fi";
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
      toast.error("Error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen text-white py-16 px-[5%] font-sans">
      <div className="mx-auto max-w-[700px]">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Link href="/dashboard" className="text-accent no-underline flex items-center gap-2 text-[0.85rem] font-black tracking-[1px]">
            <FiArrowLeft /> VOLVER AL DASHBOARD
          </Link>
          <h1 className="text-[2.8rem] font-black mt-6 font-sans tracking-[-1px]">
            Crear <span className="text-accent">Agente IA</span>
          </h1>
          <p className="opacity-50 text-[1.1rem] mt-2">Configura tu agente para atención automática.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/[0.03] p-12 rounded-3xl border border-accent/10"
        >

          <div className="mb-8">
            <label className="block text-xs font-black opacity-40 mb-3 tracking-[1px]">NOMBRE DEL AGENTE</label>
            <div className="relative">
              <FiCpu className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
              <input
                required name="name" value={formData.name} onChange={handleChange}
                placeholder="Ej: Asesor Inmobiliario"
                className="w-full p-4 pl-12 rounded-[15px] border border-white/10 bg-black/30 text-white text-base font-semibold outline-none box-border"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-black opacity-40 mb-3 tracking-[1px]">DESCRIPCIÓN</label>
            <div className="relative">
              <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
              <input
                required name="description" value={formData.description} onChange={handleChange}
                placeholder="Ej: Asesor de ventas inmobiliarias"
                className="w-full p-4 pl-12 rounded-[15px] border border-white/10 bg-black/30 text-white text-base outline-none box-border"
              />
            </div>
          </div>

          <div className="mb-12">
            <label className="block text-xs font-black opacity-40 mb-4 tracking-[1px]">MODELO IA</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'gemini', label: 'Gemini 2.0 Flash', tag: 'PRINCIPAL', color: '#4285F4' },
                { id: 'gpt', label: 'GPT-3.5 Turbo', tag: 'BACKUP', color: '#10A37F' },
                { id: 'groq', label: 'Llama 3.1 8B - Groq', tag: 'GRATIS', color: '#FF6B35' },
                { id: 'mistral', label: 'Mistral Small', tag: 'GRATIS', color: '#9F7AEA' }
              ].map(model => (
                <div
                  key={model.id}
                  onClick={() => setFormData({ ...formData, model: model.id })}
                  className={`p-5 rounded-[18px] cursor-pointer transition-all duration-200 ${
                    formData.model === model.id
                      ? 'border-2 border-accent bg-accent-dim'
                      : 'border border-white/5 bg-white/[0.03]'
                  }`}
                >
                  <div className="text-[0.6rem] font-black text-white px-2 py-0.5 rounded-xs inline-block mb-2" style={{ background: model.color }}>{model.tag}</div>
                  <div className="font-extrabold text-[0.9rem]">{model.label}</div>
                </div>
              ))}
            </div>
            <p className="text-[0.7rem] opacity-50 mt-4">
              Todos incluyen failover automático - si falla uno, otro responde
            </p>
          </div>

          <button
            type="submit" disabled={loading || !formData.name}
            className={`w-full p-5 rounded-[18px] border-none flex items-center justify-center gap-3 text-[1.1rem] font-black text-black ${
              loading ? 'bg-accent/20 cursor-not-allowed' : 'bg-accent cursor-pointer'
            }`}
          >
            {loading ? <FiZap /> : <FiPlus />}
            {loading ? 'CREANDO...' : 'CREAR AGENTE'}
          </button>

        </motion.form>
      </div>
    </div>
  );
}
