"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiBox, FiUsers, FiSend, FiSettings } from "react-icons/fi";

const navItems = [
  { icon: FiGrid, label: "Dashboard", href: "/dashboard" },
  { icon: FiBox, label: "Agentes IA", href: "/dashboard/bot/new" },
  { icon: FiUsers, label: "Leads", href: "/dashboard/leads" },
  { icon: FiSend, label: "Outreach", href: "/dashboard/outreach" },
  { icon: FiSettings, label: "Ajustes", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[240px] flex-col border-r border-white/10 bg-bg/95 p-4 shrink-0">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-4 mb-6 no-underline">
        <img src="/stratix_shield.svg" alt="Stratix" width={28} height={28} className="w-7 h-7" />
        <span className="font-sans text-lg font-bold text-text-primary">
          Stratix <span className="text-accent">Intelligence</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${
                isActive
                  ? "bg-accent-dim text-accent border border-accent/20"
                  : "text-text-secondary hover:bg-white/5 hover:text-text-primary border border-transparent"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-4 mt-auto">
        <Link href="/" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-text-muted no-underline hover:text-text-primary transition-colors">
          ← Volver al sitio
        </Link>
      </div>
    </aside>
  );
}
