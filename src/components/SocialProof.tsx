"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

const testimonials = [
  { name: "Carlos", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👨‍💼" },
  { name: "María", city: "Medellín", country: "Colombia", plan: "Starter", avatar: "👩‍💻" },
  { name: "John", city: "Miami", country: "USA", plan: "Enterprise", avatar: "👨‍💼" },
  { name: "Andrés", city: "Cali", country: "Colombia", plan: "Enterprise", avatar: "👨‍🔧" },
  { name: "Laura", city: "Buenos Aires", country: "Argentina", plan: "Professional", avatar: "👩‍🎨" },
  { name: "Pedro", city: "Lima", country: "Perú", plan: "Starter", avatar: "👨‍💻" },
  { name: "Ana", city: "Santiago", country: "Chile", plan: "Professional", avatar: "👩‍🏫" },
  { name: "Jorge", city: "Madrid", country: "España", plan: "Enterprise", avatar: "👨‍🎓" },
  { name: "Sofia", city: "Manizales", country: "Colombia", plan: "Starter", avatar: "👩‍🔬" },
  { name: "Diego", city: "Monterrey", country: "México", plan: "Professional", avatar: "👨‍💼" },
  { name: "Camila", city: "São Paulo", country: "Brasil", plan: "Enterprise", avatar: "👩‍💼" },
  { name: "Roberto", city: "Barranquilla", country: "Colombia", plan: "Starter", avatar: "👨‍🔬" },
  { name: "Elena", city: "Cartagena", country: "Colombia", plan: "Professional", avatar: "👩‍🎤" },
  { name: "Michael", city: "New York", country: "USA", plan: "Enterprise", avatar: "👨‍💼" },
  { name: "Patricia", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👩‍💼" },
  { name: "Luis", city: "Medellín", country: "Colombia", plan: "Enterprise", avatar: "👨‍🎨" },
  { name: "Carmen", city: "Cali", country: "Colombia", plan: "Starter", avatar: "👩‍🍳" },
  { name: "Ricardo", city: "Pereira", country: "Colombia", plan: "Professional", avatar: "👨‍🔧" },
  { name: "Isabella", city: "Bucaramanga", country: "Colombia", plan: "Starter", avatar: "👩‍💻" },
  { name: "Fernando", city: "Buenos Aires", country: "Argentina", plan: "Professional", avatar: "👨‍💼" },
  { name: "Daniela", city: "Lima", country: "Perú", plan: "Enterprise", avatar: "👩‍🎨" },
  { name: "Alejandro", city: "Santiago", country: "Chile", plan: "Professional", avatar: "👨‍💼" },
  { name: "Natalia", city: "Madrid", country: "España", plan: "Enterprise", avatar: "👩‍🏫" },
  { name: "Gabriel", city: "Miami", country: "USA", plan: "Professional", avatar: "👨‍🎓" },
  { name: "Valentina", city: "Bogotá", country: "Colombia", plan: "Starter", avatar: "👩‍💻" },
  { name: "Francisco", city: "Medellín", country: "Colombia", plan: "Professional", avatar: "👨‍💼" },
  { name: "Andrea", city: "Cali", country: "Colombia", plan: "Enterprise", avatar: "👩‍💼" },
  { name: "Carlos M.", city: "Barranquilla", country: "Colombia", plan: "Professional", avatar: "👨‍🔧" },
  { name: "Paula", city: "Bogotá", country: "Colombia", plan: "Starter", avatar: "👩‍🎨" },
  { name: "David", city: "Houston", country: "USA", plan: "Enterprise", avatar: "👨‍💼" },
  { name: "Marta", city: "Valencia", country: "España", plan: "Professional", avatar: "👩‍🏫" },
  { name: "Juan", city: "Guadalajara", country: "México", plan: "Professional", avatar: "👨‍💻" },
  { name: "Lucía", city: "Bogotá", country: "Colombia", plan: "Starter", avatar: "👩‍💼" },
  { name: "Miguel", city: "Medellín", country: "Colombia", plan: "Enterprise", avatar: "👨‍🔬" },
  { name: "Carolina", city: "Cali", country: "Colombia", plan: "Professional", avatar: "👩‍🎤" },
  { name: "Tomás", city: "Buenos Aires", country: "Argentina", plan: "Starter", avatar: "👨‍💼" },
  { name: "Sandra", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👩‍💻" },
  { name: "Rafael", city: "Lima", country: "Perú", plan: "Enterprise", avatar: "👨‍💼" },
  { name: "Claudia", city: "Santiago", country: "Chile", plan: "Professional", avatar: "👩‍🏫" },
  { name: "Antonio", city: "Bogotá", country: "Colombia", plan: "Starter", avatar: "👨‍🔧" },
  { name: "Verónica", city: "Miami", country: "USA", plan: "Enterprise", avatar: "👩‍💼" },
  { name: "Sergio", city: "Medellín", country: "Colombia", plan: "Professional", avatar: "👨‍🎓" },
  { name: "Marisol", city: "Cali", country: "Colombia", plan: "Starter", avatar: "👩‍🍳" },
  { name: "Óscar", city: "Monterrey", country: "México", plan: "Professional", avatar: "👨‍💼" },
  { name: "Julia", city: "São Paulo", country: "Brasil", plan: "Enterprise", avatar: "👩‍💻" },
  { name: "Héctor", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👨‍🔬" },
  { name: "Alicia", city: "Madrid", country: "España", plan: "Starter", avatar: "👩‍🎨" },
  { name: "Emilio", city: "Medellín", country: "Colombia", plan: "Professional", avatar: "👨‍💼" },
  { name: "Gloria", city: "Barranquilla", country: "Colombia", plan: "Enterprise", avatar: "👩‍🏫" },
  { name: "Arturo", city: "Lima", country: "Perú", plan: "Starter", avatar: "👨‍💼" },
  { name: "Rosa", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👩‍💻" },
  { name: "Pablo", city: "Cali", country: "Colombia", plan: "Enterprise", avatar: "👨‍🔧" },
  { name: "Teresa", city: "Santiago", country: "Chile", plan: "Professional", avatar: "👩‍💼" },
  { name: "Guillermo", city: "Medellín", country: "Colombia", plan: "Starter", avatar: "👨‍🎓" },
  { name: "Esther", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👩‍🔬" },
  { name: "Manuel", city: "Buenos Aires", country: "Argentina", plan: "Enterprise", avatar: "👨‍💼" },
  { name: "Beatriz", city: "Cartagena", country: "Colombia", plan: "Starter", avatar: "👩‍💻" },
  { name: "Roberto", city: "Guadalajara", country: "México", plan: "Professional", avatar: "👨‍💼" },
  { name: "Lourdes", city: "Bogotá", country: "Colombia", plan: "Enterprise", avatar: "👩‍🎤" },
  { name: "Santiago", city: "Miami", country: "USA", plan: "Professional", avatar: "👨‍💼" },
  { name: "Esperanza", city: "Medellín", country: "Colombia", plan: "Starter", avatar: "👩‍🏫" },
  { name: "Fabián", city: "Cali", country: "Colombia", plan: "Professional", avatar: "👨‍💻" },
  { name: "Adriana", city: "Bogotá", country: "Colombia", plan: "Enterprise", avatar: "👩‍💼" },
  { name: "Rodrigo", city: "Lima", country: "Perú", plan: "Starter", avatar: "👨‍🔧" },
  { name: "Mercedes", city: "Madrid", country: "España", plan: "Professional", avatar: "👩‍🎨" },
  { name: "Javier", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👨‍💼" },
  { name: "Silvia", city: "Medellín", country: "Colombia", plan: "Enterprise", avatar: "👩‍💻" },
  { name: "Iván", city: "Santiago", country: "Chile", plan: "Starter", avatar: "👨‍💼" },
  { name: "Raquel", city: "Bogotá", country: "Colombia", plan: "Professional", avatar: "👩‍🏫" },
  { name: "Andrés G.", city: "Cali", country: "Colombia", plan: "Enterprise", avatar: "👨‍🎓" },
  { name: "Margarita", city: "Barranquilla", country: "Colombia", plan: "Starter", avatar: "👩‍🔬" },
];

const times = [
  "hace 1 minuto",
  "hace 2 minutos",
  "hace 3 minutos",
  "hace 4 minutos",
  "hace 5 minutos",
  "hace 6 minutos",
  "hace 7 minutos",
  "hace 8 minutos",
  "hace 9 minutos",
  "hace 10 minutos",
  "hace 12 minutos",
  "hace 15 minutos",
  "hace 18 minutos",
  "hace 20 minutos",
  "acaba de unirse",
];

const plansEs: Record<string, string> = {
  Starter: "Plan Básico",
  Professional: "Plan Profesional",
  Enterprise: "Plan Empresarial",
};

const plansEn: Record<string, string> = {
  Starter: "Starter Plan",
  Professional: "Professional Plan",
  Enterprise: "Enterprise Plan",
};

function Notification() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState<typeof testimonials[0] & { time: string } | null>(null);
  const shownIndices = useRef<Set<number>>(new Set());

  useEffect(() => {
    const showNotification = () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * testimonials.length);
      } while (shownIndices.current.has(randomIndex) && shownIndices.current.size < testimonials.length);

      shownIndices.current.add(randomIndex);
      if (shownIndices.current.size > 30) {
        shownIndices.current.clear();
      }

      const random = testimonials[randomIndex];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      setNotification({ ...random, time: randomTime });
      setVisible(true);

      setTimeout(() => setVisible(false), 6000);
    };

    const interval = setInterval(showNotification, 15000);
    setTimeout(showNotification, 6000);

    return () => clearInterval(interval);
  }, []);

  const getPlanName = (plan: string) => {
    return lang === "es" ? plansEs[plan] || plan : plansEn[plan] || plan;
  };

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      Colombia: "🇨🇴",
      USA: "🇺🇸",
      Argentina: "🇦🇷",
      Perú: "🇵🇪",
      Chile: "🇨🇱",
      España: "🇪🇸",
      Brasil: "🇧🇷",
      México: "🇲🇽",
    };
    return flags[country] || "🌎";
  };

  return (
    <AnimatePresence>
      {visible && notification && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          style={{
            position: "fixed",
            bottom: "100px",
            left: "24px",
            background: "#0d1017",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "16px",
            padding: "16px 20px",
            maxWidth: "320px",
            zIndex: 9996,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(212,175,55,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            flexShrink: 0,
          }}>
            {notification.avatar}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{
              fontSize: "14px",
              color: "#f0f2f8",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              {notification.name}
              <span style={{ fontSize: "14px" }}>{getCountryFlag(notification.country)}</span>
            </div>
            <div style={{ fontSize: "13px", color: "#8892a4" }}>
              {notification.city}, {notification.country}
            </div>
            <div style={{ fontSize: "12px", color: "#D4AF37", marginTop: "2px" }}>
              {lang === "es" ? "Se unió a" : "Joined"} {getPlanName(notification.plan)}
            </div>
            <div style={{ fontSize: "11px", color: "#4a5568", marginTop: "2px" }}>
              {notification.time}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;