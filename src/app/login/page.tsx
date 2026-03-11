"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiArrowRight, FiShield, FiCheckCircle } from "react-icons/fi";
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
    <div className={styles.authPage}>
      <div className={styles.authGlow} />
      <motion.div
        className={styles.authCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          Chat<span className="gradient-text">Genius</span>
        </Link>

        <h1>{mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}</h1>
        <p className={styles.authSubtitle}>
          {mode === "login"
            ? "Ingresa a tu cuenta corporativa para continuar"
            : "Potencia tu servicio al cliente con IA hoy"}
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {mode === "signup" && (
            <div className={styles.inputGroup}>
              <FiUser className={styles.inputIcon} />
              <input
                className="input"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} />
            <input
              className="input"
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>
          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>

          {message && <p className={styles.message}>{message}</p>}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", padding: "0.9rem" }}
          >
            {loading ? "Procesando..." : mode === "login" ? "Iniciar Sesión" : "Crear Cuenta Gratis"}
            <FiArrowRight />
          </button>
        </form>

        <p className={styles.switchMode}>
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>
            {mode === "login" ? "Regístrate gratis" : "Inicia sesión"}
          </button>
        </p>

        {/* Trust Signals */}
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "rgba(59, 130, 246, 0.05)",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(59, 130, 246, 0.1)"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            fontSize: "0.8rem", 
            color: "var(--text-secondary)",
            marginBottom: "0.75rem",
            fontWeight: "600"
          }}>
            <FiShield style={{ color: "var(--accent-blue)" }} /> Tus datos están protegidos
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              <FiCheckCircle style={{ color: "var(--success)", flexShrink: 0 }} /> Encriptación de grado bancario (AES-256)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              <FiCheckCircle style={{ color: "var(--success)", flexShrink: 0 }} /> Cumplimiento GDPR & SOC 2
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              <FiCheckCircle style={{ color: "var(--success)", flexShrink: 0 }} /> Más de 500 empresas confían en nosotros
            </div>
          </div>
        </div>

        {/* Trust Logos */}
        <div style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          opacity: 0.4,
          fontSize: "0.7rem",
          color: "var(--text-tertiary)",
          fontWeight: "700",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }}>
          <span>ShopMax</span>
          <span>·</span>
          <span>TechCorp</span>
          <span>·</span>
          <span>FastShip</span>
          <span>·</span>
          <span>InmoTech</span>
        </div>
      </motion.div>
    </div>
  );
}
