"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiMail, FiLock, FiUser, FiArrowRight, FiShield, FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import styles from "./auth.module.css";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get("redirect") || "/dashboard";
  const plan = searchParams.get("plan");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        toast.success("✅ Protocolo iniciado. Revisa tu correo para verificar tu cuenta.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        toast.success("✅ Acceso autorizado. Sincronizando ecosistema...");
        
        const finalRedirect = plan ? `${redirect}?plan=${plan}` : redirect;
        router.push(finalRedirect);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(`❌ Error: ${error.message || "Fallo en la autenticación."}`);
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
        transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className={styles.logo}>
          <img src="/stratix_shield.svg" alt="Stratix Logo" style={{ height: '32px' }} />
          <span>Strat<span style={{ color: '#D4AF37' }}>ix</span> Intelligence</span>
        </Link>

        <h1>{mode === "login" ? "Acceso de Élite" : "Registro de Élite"}</h1>
        <p className={styles.authSubtitle}>
          {mode === "login"
            ? "Ingreso seguro al núcleo de inteligencia estratégica"
            : "Crea tu infraestructura de IA en menos de 60 segundos"}
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {mode === "signup" && (
            <div className={styles.inputGroup}>
              <FiUser className={styles.inputIcon} />
              <input
                placeholder="Nombre Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} />
            <input
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Contraseña de Seguridad"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Sincronizando..." : mode === "login" ? "Iniciar Sesión" : "Crear Infraestructura IA"}
            {!loading && <FiArrowRight />}
          </button>
        </form>

        <div className={styles.switchMode}>
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya eres miembro de élite?"}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? "Regístrate aquí" : "Inicia sesión"}
          </button>
        </div>

        <div className={styles.trustBox}>
          <div className={styles.trustHeader}>
            <FiShield /> Ecosistema Zero-Trust v4.0
          </div>
          <div className={styles.trustItem}>
            <FiCheckCircle /> Encriptación AES-256 de Grado Bancario
          </div>
          <div className={styles.trustItem}>
            <FiCheckCircle /> Autenticación via Supabase Auth
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#0B1120', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>Cargando Protocolo de Seguridad...</div>}>
      <AuthContent />
    </Suspense>
  );
}