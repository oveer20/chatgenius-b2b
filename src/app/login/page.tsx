"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiArrowRight, FiShield, FiCheckCircle, FiZap } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import styles from "./auth.module.css";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (error) throw error;
        setMessage("✅ Revisa tu correo para verificar tu cuenta.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message || "Inténtalo de nuevo."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage} style={{ backgroundColor: '#0B1120' }}>
      <div className={styles.authGlow} style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)' }} />
      <motion.div
        className={styles.authCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ border: '1px solid rgba(212, 175, 55, 0.1)' }}
      >
        <Link href="/" className={styles.logo}>
          {/* Logo SVG Dorado Implementado */}
          <img src="/stratix_shield.svg" alt="Stratix AI Logo" style={{ height: '40px' }} />
          <span style={{ fontWeight: 800 }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> AI</span>
        </Link>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>{mode === "login" ? "Acceso de Élite" : "Crea tu Cuenta Elite"}</h1>
        <p className={styles.authSubtitle}>
          {mode === "login"
            ? "Ingresa a tu ecosistema estratégico para continuar"
            : "Comienza a escalar tu empresa con inteligencia arquitectónica"}
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {mode === "signup" && (
            <div className={styles.inputGroup}>
              <FiUser className={styles.inputIcon} style={{ color: '#D4AF37' }} />
              <input
                className="input"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ paddingLeft: "3rem", background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} style={{ color: '#D4AF37' }} />
            <input
              className="input"
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: "3rem", background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} style={{ color: '#D4AF37' }} />
            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ paddingLeft: "3rem", background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          {message && <p style={{ fontSize: '0.8rem', margin: '1rem 0', textAlign: 'center' }}>{message}</p>}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              background: '#D4AF37',
              color: '#000',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {loading ? "Procesando..." : mode === "login" ? "Iniciar Sesión de Élite" : "Crear Cuenta Gratis"}
            <FiArrowRight />
          </button>
        </form>

        <p className={styles.switchMode} style={{ marginTop: '1.5rem' }}>
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}
            style={{ color: '#D4AF37', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mode === "login" ? "Regístrate aquí" : "Inicia sesión"}
          </button>
        </p>

        {/* Señales de Confianza Refinadas */}
        <div className={styles.trustBox} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '2rem', paddingTop: '1.5rem' }}>
          <div className={styles.trustHeader} style={{ fontSize: '0.8rem', color: '#D4AF37', marginBottom: '1rem' }}>
            <FiShield /> PROTOCOLO DE SEGURIDAD ACTIVADO
          </div>
          <div className={styles.trustList} style={{ fontSize: '0.75rem', opacity: 0.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheckCircle style={{ color: '#10b981' }} /> Encriptación AES-256 de grado bancario
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheckCircle style={{ color: '#10b981' }} /> Infraestructura Zero-Trust
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}