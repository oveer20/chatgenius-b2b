"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const links = [
  { href: "#features",      label: "Características" },
  { href: "#how",           label: "Cómo funciona"   },
  { href: "#pricing",       label: "Precios"          },
  { href: "#testimonials",  label: "Clientes"         },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-16 h-[68px] transition-all duration-300
        backdrop-blur-xl border-b border-[var(--border)]
        ${scrolled ? "bg-[rgba(7,9,16,0.85)]" : "bg-[rgba(7,9,16,0.5)]"}`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <span
          className="w-2 h-2 rounded-full bg-[#00e5a0] animate-[pulse-dot_2s_ease-in-out_infinite]"
          style={{ boxShadow: "0 0 12px #00e5a0" }}
        />
        <span className="font-mono text-[1.05rem] font-medium text-[var(--text-primary)] tracking-tight">
          ChatGenius
        </span>
      </a>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[var(--text-secondary)] text-sm font-medium
                no-underline transition-colors hover:text-[var(--text-primary)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">Iniciar sesión</Button>
        <Button variant="primary" size="sm">Empezar gratis →</Button>
      </div>
    </nav>
  );
}
