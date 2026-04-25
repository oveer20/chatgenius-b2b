"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiMail, FiLock, FiArrowRight, FiUserPlus } from "react-icons/fi";
import { toast, Toaster } from "sonner";
import styles from "./auth.module.css";
import { supabase } from "@/lib/supabase";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("¡Cuenta creada! Revisa tu email para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("¡Bienvenido de vuelta!");
        router.push(redirect);
      }
    } catch (err: any) {
      toast.error(err.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authGlow} />
      <motion.div
        className={styles.authCard}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className={styles.logo}>
          <img src="/stratix_shield.svg" alt="Stratix" style={{ height: '28px' }} />
          <span style={{ fontFamily: "'DM Mono', monospace" }}>Stratix <span style={{ color: '#D4AF37' }}>Intelligence</span></span>
        </Link>

        <h1>{isSignUp ? "Crear cuenta" : "Ingresa a tu cuenta"}</h1>
        <p className={styles.authSubtitle}>
          {isSignUp ? "Crea tu cuenta para empezar" : "Accede a tu centro de control IA"}
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} />
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Contraseña (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Procesando..." : isSignUp ? "Crear cuenta" : "Entrar"}
            {!loading && <FiArrowRight />}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '12px',
            color: '#D4AF37',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <FiUserPlus />
          {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>

        <Link href="/" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.5, textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </motion.div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#0B1120', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>Cargando...</div>}>
      <AuthContent />
    </Suspense>
  );
}