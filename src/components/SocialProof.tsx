"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStrings } from "@/lib/useStrings";

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
  const { s, lang } = useStrings();
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
    return s(plansEs[plan] || plan, plansEn[plan] || plan);
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
          className="fixed bottom-[100px] left-6 bg-bg border border-accent/10 rounded-2xl px-5 py-4 max-w-[320px] z-[9996] shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-2xl shrink-0">
            {notification.avatar}
          </div>
          <div className="overflow-hidden">
            <div className="text-sm text-text-primary font-semibold truncate flex items-center gap-1.5">
              {notification.name}
              <span className="text-sm">{getCountryFlag(notification.country)}</span>
            </div>
            <div className="text-sm text-text-secondary">
              {notification.city}, {notification.country}
            </div>
            <div className="text-xs text-accent mt-0.5">
              {s("Se unió a", "Joined")} {getPlanName(notification.plan)}
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              {notification.time}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;
