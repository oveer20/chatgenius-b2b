"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FiUser, FiMail, FiShield, FiCreditCard } from "react-icons/fi";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: Record<string, string> } | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: supaUser } }) => {
      if (!supaUser) { router.push("/login"); return; }
      setUser(supaUser);
      setName(supaUser.user_metadata?.full_name || "");
    });
  }, [router]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ data: { full_name: name } });
      if (error) throw error;
      toast.success("Perfil actualizado");
    } catch (err) {
      toast.error("Error al actualizar: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 font-serif text-[clamp(1.8rem,4vw,2.5rem)]">Ajustes</h1>
        <p className="mb-10 text-text-secondary">Gestiona tu perfil, plan y preferencias de cuenta.</p>
      </motion.div>

      <div className="flex flex-col gap-8">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-bg/60 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <FiUser className="text-accent" size={20} />
            <h2 className="font-serif text-xl">Perfil</h2>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-text-secondary">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-text-secondary">Email</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-text-muted">
                <FiMail size={16} />
                {user?.email}
              </div>
            </div>
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="self-start rounded-xl bg-accent px-6 py-3 text-sm font-bold text-[#030a05] transition-all duration-200 hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </motion.div>

        {/* Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-accent/20 bg-accent-dim/30 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <FiCreditCard className="text-accent" size={20} />
            <h2 className="font-serif text-xl">Plan Actual</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-1 font-semibold text-text-primary">Gratuito</div>
              <p className="text-sm text-text-secondary">Estás en el plan gratuito. Actualiza para desbloquear más agentes y funciones.</p>
            </div>
            <Link
              href="/#planes"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-[#030a05] no-underline transition-all duration-200 hover:opacity-90"
            >
              Ver planes
            </Link>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-bg/60 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <FiShield className="text-accent" size={20} />
            <h2 className="font-serif text-xl">Seguridad</h2>
          </div>
          <a
            href="https://wa.me/573159269287"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-text-primary no-underline transition-all duration-200 hover:bg-white/5"
          >
            Solicitar cambio de contraseña
          </a>
        </motion.div>
      </div>
    </div>
  );
}
