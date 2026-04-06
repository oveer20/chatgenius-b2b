"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiCpu, FiZap, FiSettings, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast, Toaster } from "sonner";

import { STRATIX_LIMITS } from "@/lib/constants";

/**
 * STRATIX INTELLIGENCE — AI MISSION INITIATOR (V12.1)
 * Despliegue táctico con validación de límites SaaS.
 */

export default function NewBotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    system_prompt: "Eres un consultor experto en ventas corporativas...",
    model: "gpt-4o"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión de mando activa.");

      // 1. Validar Límites del Plan (V49.0 Logic)
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();
      
      const userPlan = (profile?.plan || "starter") as keyof typeof STRATIX_LIMITS.CRAWL_PAGES;
      
      const { count } = await supabase
        .from("bots")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      const limit = userPlan === "enterprise" || userPlan === "elite" ? 999 : (userPlan === "pro" ? 5 : 1);

      if ((count || 0) >= limit) {
        toast.error(`Límite alcanzado: Tu plan ${userPlan.toUpperCase()} permite hasta ${limit} agentes. ¡Sube a ELITE para agentes ilimitados! 🛡️🏅`);
        setLoading(false);
        return;
      }

      // 2. Despliegue de Activo
      const { data, error } = await supabase
        .from("bots")
        .insert([
          { 
            name: formData.name,
            description: formData.description,
            system_prompt: formData.system_prompt,
            model: formData.model,
            knowledge_base: "",
            user_id: user.id
          }
        ])
        .select();

      if (error) throw error;

      toast.success("Arquitectura Cognitiva Consolidada con Éxito. 🛡️✨");
      
      setTimeout(() => {
        router.push(`/dashboard/bot/${data[0].id}`);
      }, 1500);

    } catch (error: any) {
      toast.error("Fallo de Despliegue: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', padding: '4rem 5%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Header Táctico */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <Link href="/dashboard" style={{ color: '#D4AF37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '1px' }}>
            <FiArrowLeft /> REGRESAR AL DASHBOARD
          </Link>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginTop: '1.5rem', fontFamily: 'Outfit, sans-serif', letterSpacing: '-1px' }}>
            Mission <span style={{ color: '#D4AF37' }}>Initiator</span>
          </h1>
          <p style={{ opacity: 0.5, fontSize: '1.1rem', marginTop: '0.5rem' }}>Define los parámetros base para tu nuevo activo de inteligencia estratégica.</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(40px)' }}
        >
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, opacity: 0.4, marginBottom: '0.8rem', letterSpacing: '1px' }}>IDENTIFICADOR DEL AGENTE</label>
            <div style={{ position: 'relative' }}>
              <FiCpu style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }} />
              <input 
                required name="name" value={formData.name} onChange={handleChange}
                placeholder="Ej: Inmobiliaria Mubrick - Lead Gen" 
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem', fontWeight: 600, outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, opacity: 0.4, marginBottom: '0.8rem', letterSpacing: '1px' }}>ROL ESTRATÉGICO</label>
            <div style={{ position: 'relative' }}>
              <FiActivity style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }} />
              <input 
                required name="description" value={formData.description} onChange={handleChange}
                placeholder="Ej: Consultor Experto en Luxury Real Estate" 
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, opacity: 0.4, marginBottom: '1rem', letterSpacing: '1px' }}>NÚCLEO DE INTELIGENCIA</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { id: 'gpt-4o', label: 'GPT-4o (Elite)', tag: 'PREMIUM' },
                { id: 'gpt-4o-mini', label: 'GPT-4o Mini', tag: 'VELOCITY' }
              ].map(model => (
                <div 
                  key={model.id}
                  onClick={() => setFormData({...formData, model: model.id})}
                  style={{ 
                    padding: '20px', borderRadius: '18px', border: formData.model === model.id ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.05)', 
                    background: formData.model === model.id ? 'rgba(212,175,55,0.05)' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                >
                  <div style={{ fontSize: '0.6rem', fontWeight: 900, background: formData.model === model.id ? '#D4AF37' : 'rgba(255,255,255,0.1)', color: formData.model === model.id ? '#000' : '#fff', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>{model.tag}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{model.label}</div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" disabled={loading || !formData.name}
            style={{ 
              width: '100%', padding: '20px', borderRadius: '18px', border: 'none', 
              background: loading ? 'rgba(212,175,55,0.2)' : '#D4AF37', color: '#000', 
              fontSize: '1.1rem', fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px',
              boxShadow: loading ? 'none' : '0 10px 30px rgba(212,175,55,0.3)', transition: 'all 0.3s'
            }}
          >
            {loading ? <FiZap className="spin" /> : <FiPlus />}
            {loading ? 'DESPLEGANDO ARQUITECTURA...' : 'INICIAR MISIÓN IA'}
          </button>

        </motion.form>

        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.2, fontSize: '0.7rem', letterSpacing: '4px', fontWeight: 900 }}>
          STRATIX INTELLIGENCE — SECURE DEPLOYMENT PROTOCOL
        </div>

      </div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}