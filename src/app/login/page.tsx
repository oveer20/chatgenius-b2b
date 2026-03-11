"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import styles from "./auth.module.css";

export default function AuthPage() {
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
      // Demo mode: show message that Supabase needs to be configured
      setMessage(
        "⚙️ Para habilitar la autenticación, configura tus credenciales de Supabase en .env.local"
      );
    } catch {
      setMessage("Error. Inténtalo de nuevo.");
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
              placeholder="tu@email.com"
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
            {loading ? "Procesando..." : mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            <FiArrowRight />
          </button>
        </form>

        <p className={styles.switchMode}>
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>
            {mode === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        <Link href="/dashboard" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
          Ir al Panel de Control de Demo
        </Link>
      </motion.div>
    </div>
  );
}
