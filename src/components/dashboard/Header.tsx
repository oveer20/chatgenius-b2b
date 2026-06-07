"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut, Menu } from "lucide-react";

interface HeaderProps {
  user: { email?: string; user_metadata?: Record<string, string> } | null;
  onMenuToggle?: () => void;
}

export default function Header({ user, onMenuToggle }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmed = window.confirm("¿Cerrar sesión?");
    if (!confirmed) return;
    localStorage.clear();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-bg/80 px-[clamp(1rem,3vw,3rem)] py-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg bg-white/5 border-none cursor-pointer text-text-primary"
        >
          <Menu size={18} />
        </button>
        <span className="text-xs text-text-secondary hidden sm:block">
          {user?.email}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-white/10 text-text-secondary text-sm cursor-pointer transition-all duration-200 hover:bg-white/5 hover:text-text-primary"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
