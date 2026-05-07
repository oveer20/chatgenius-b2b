"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiCpu, FiZap, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";

const AGENT_TEMPLATE = {
  name: "Stratix Sales Agent",
  description: "Asesor experto en automatización de ventas con IA",
  system_prompt: `Eres el Agente de Ventas Oficial de "Stratix Intelligence". Tu nombre es "Stratix" (o "Nova").

TU OBJETIVO:
Tu misión es educar a los visitantes sobre los beneficios de automatizar ventas con IA y convencerlos de agendar una demo o comprar un plan.

TONO:
- Profesional, innovador, eficiente y amable.
- Habla en español neutro/colombiano.
- Usa emojis de forma moderada para mantener la conversación dinámica.

INSTRUCCIONES DE VENTA:
1. SALUDO: Saluda y pregunta en qué puedo ayudarles (ej: "¡Hola! 👋 Soy el asistente de Stratix. ¿Te gustaría ver cómo la IA puede duplicar tus ventas?").
2. IDENTIFICACIÓN: Pregunta qué tipo de negocio tienen (Inmobiliaria, Clínica, E-commerce, etc.) para ofrecer una solución a medida.
3. BENEFICIOS CLAVE (Menciónalos según el contexto):
   - Atención 24/7 (nunca pierdes un cliente por no contestar).
   - Respuestas instantáneas (< 2 segundos).
   - Agendamiento automático de citas.
   - Integración con WhatsApp, Instagram y Web.
   - Reducción de costos de adquisición hasta un 60%.
4. MANEJO DE OBJECIONES:
   - Si preguntan precio: "Nuestros planes empiezan desde $29 USD/mes, muy accesible comparado con el costo de un vendedor humano. ¿Te gustaría ver los detalles?"
   - Si preguntan si es difícil: "Para nada, lo configuramos en 15 minutos y no necesitas saber de código."
5. CIERRE (CTA): Siempre intenta llevarlos a la acción:
   - "¿Quieres que agendemos una llamada para mostrarte cómo funciona en tu negocio?"
   - "Puedes ver una demo en vivo aquí: https://stratix-intelligence-ia.vercel.app"

SI TE HACEN PREGUNTAS TÉCNICAS:
- Usa tecnología de punta (RAG Neuronal, Modelos de Lenguaje Avanzados).
- Seguridad de datos encriptada.
- Integración con CRMs como HubSpot, Salesforce, etc.

REGLA DE ORO:
Si el cliente está listo, invítalos a reservar una cita o escríbenos al WhatsApp: +573159269287.`,
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

    } catch (error: any) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', padding: '4rem 5%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <Link href="/dashboard" style={{ color: '#D4AF37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '1px' }}>
            <FiArrowLeft /> VOLVER AL DASHBOARD
          </Link>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginTop: '1.5rem', fontFamily: 'Outfit, sans-serif', letterSpacing: '-1px' }}>
            Crear <span style={{ color: '#D4AF37' }}>Agente IA</span>
          </h1>
          <p style={{ opacity: 0.5, fontSize: '1.1rem', marginTop: '0.5rem' }}>Configura tu agente para atención automática.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(212,175,55,0.15)' }}
        >

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, opacity: 0.4, marginBottom: '0.8rem', letterSpacing: '1px' }}>NOMBRE DEL AGENTE</label>
            <div style={{ position: 'relative' }}>
              <FiCpu style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }} />
              <input
                required name="name" value={formData.name} onChange={handleChange}
                placeholder="Ej: Asesor Inmobiliario"
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, opacity: 0.4, marginBottom: '0.8rem', letterSpacing: '1px' }}>DESCRIPCIÓN</label>
            <div style={{ position: 'relative' }}>
              <FiActivity style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }} />
              <input
                required name="description" value={formData.description} onChange={handleChange}
                placeholder="Ej: Asesor de ventas inmobiliarias"
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, opacity: 0.4, marginBottom: '1rem', letterSpacing: '1px' }}>MODELO IA</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { id: 'gemini', label: 'Gemini 2.0 Flash', tag: 'PRINCIPAL', color: '#4285F4' },
                { id: 'gpt', label: 'GPT-3.5 Turbo', tag: 'BACKUP', color: '#10A37F' },
                { id: 'groq', label: 'Llama 3.1 8B - Groq', tag: 'GRATIS', color: '#FF6B35' },
                { id: 'mistral', label: 'Mistral Small', tag: 'GRATIS', color: '#9F7AEA' }
              ].map(model => (
                <div
                  key={model.id}
                  onClick={() => setFormData({ ...formData, model: model.id })}
                  style={{
                    padding: '20px', borderRadius: '18px',
                    border: formData.model === model.id ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.05)',
                    background: formData.model === model.id ? 'rgba(212,175,55,0.05)' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                >
                  <div style={{ fontSize: '0.6rem', fontWeight: 900, background: model.color, color: '#fff', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>{model.tag}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{model.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '1rem' }}>
              Todos incluyen failover automático - si falla uno, otro responde
            </p>
          </div>

          <button
            type="submit" disabled={loading || !formData.name}
            style={{
              width: '100%', padding: '20px', borderRadius: '18px', border: 'none',
              background: loading ? 'rgba(212,175,55,0.2)' : '#D4AF37', color: '#000',
              fontSize: '1.1rem', fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px'
            }}
          >
            {loading ? <FiZap /> : <FiPlus />}
            {loading ? 'CREANDO...' : 'CREAR AGENTE'}
          </button>

        </motion.form>
      </div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}