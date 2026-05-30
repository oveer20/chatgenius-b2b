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
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          },
        });
        if (error) throw error;
        toast.success("¡Cuenta creada! Revisa tu email para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("¡Bienvenido de vuelta!");
        router.push(redirect);
      }
    } catch (err) {
      toast.error((err as Error).message || "Error de autenticación");
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
          <img src="/stratix_shield.svg" alt="Stratix" width={28} height={28} className="h-7" />
          <span className="font-mono">Stratix <span className="text-accent">Intelligence</span></span>
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
          className="mt-6 w-full p-3 bg-transparent border border-accent/30 rounded-xl text-accent cursor-pointer text-sm font-bold flex items-center justify-center gap-2"
        >
          <FiUserPlus />
          {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>

        <Link href="/" className="block text-center mt-6 text-sm opacity-50 no-underline">
          ← Volver al inicio
        </Link>
      </motion.div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-accent">Cargando...</div>}>
      <AuthContent />
    </Suspense>
  );
}
