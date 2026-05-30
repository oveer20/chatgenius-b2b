"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Toaster } from "sonner";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string; user_metadata?: Record<string, string> } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user: supaUser } }) => {
      if (!supaUser) {
        router.push("/login");
        return;
      }
      setUser(supaUser);

      const onboarded = localStorage.getItem("stratix_onboarded");
      if (!onboarded && pathname !== "/dashboard/onboarding") {
        const { count } = await supabase.from("bots").select("id", { count: "exact", head: true }).eq("user_id", supaUser.id);
        if (count === 0) {
          router.push("/dashboard/onboarding");
          return;
        }
        localStorage.setItem("stratix_onboarded", "true");
      }
    });
  }, [router, pathname]);

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[260px] transform transition-transform duration-300 md:relative md:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Header user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-[clamp(1.5rem,5vw,4rem)] py-16">
          {children}
        </main>
      </div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}
