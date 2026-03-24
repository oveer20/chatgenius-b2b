"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiCpu, FiDatabase, FiMessageSquare } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

export default function NewBotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    system_prompt: "",
    knowledge_base: "",
    model: "gemini-1.5-flash"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Obtener el usuario actual
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No hay sesión activa");
      }

      // Guardar en la base de datos
      const { data, error } = await supabase
        .from("bots")
        .insert([
          { 
            name: formData.name,
            system_prompt: formData.system_prompt,
            knowledge_base: formData.knowledge_base,
            model: formData.model,
            user_id: user.id
          }
        ])
        .select();

      if (error) throw error;

      // Volver al dashboard si es exitoso
      router.push("/dashboard");
      router.refresh();

    } catch (error: any) {
      console.error("Error creando el bot:", error);
      alert("Hubo un error al crear el agente. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0B1120', minHeight: '100vh', color: 'white', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }}>
            <FiArrowLeft /> Volver al Panel
          </Link>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Configurar Nuevo Agente</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>Define la identidad y el conocimiento de tu asistente de inteligencia artificial.</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.1)' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '0.8rem', color: '#D4AF37' }}>
              <FiCpu /> Nombre del Agente
            </label>
            <input 
              required
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Asistente Comercial Stratix" 
              style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '0.8rem', color: '#D4AF37' }}>
              <FiMessageSquare /> Instrucciones del Sistema (System Prompt)
            </label>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Define la personalidad, el tono y las reglas de comportamiento del bot.</p>
            <textarea 
              required
              name="system_prompt"
              value={formData.system_prompt}
              onChange={handleChange}
              placeholder="Eres un asesor experto en ventas corporativas. Responde de manera concisa y persuasiva..." 
              style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem', minHeight: '120px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '0.8rem', color: '#D4AF37' }}>
              <FiDatabase /> Base de Conocimiento Empresarial
            </label>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Pega aquí la información técnica, precios, servicios o preguntas frecuentes que el bot debe memorizar.</p>
            <textarea 
              name="knowledge_base"
              value={formData.knowledge_base}
              onChange={handleChange}
              placeholder="Nuestros servicios principales son: 1. Consultoría IT ($500/hr) 2. Implementación de IA..." 
              style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem', minHeight: '200px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: loading ? 'rgba(212,175,55,0.5)' : '#D4AF37', color: '#000', fontSize: '1.1rem', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'background 0.3s' }}
          >
            {loading ? 'Inicializando Núcleo...' : <><FiSave /> Desplegar Agente IA</>}
          </button>

        </form>
      </div>
    </div>
  );
}