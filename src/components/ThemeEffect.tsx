"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

const DARK_COLORS = {
  bg: "#070910",
  bg2: "#0d1017", 
  bg3: "#111520",
  surface: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.15)",
  textPrimary: "#f0f2f8",
  textSecondary: "#8892a4",
  textMuted: "#4a5568",
};

const LIGHT_COLORS = {
  bg: "#f5f5f5",
  bg2: "#ffffff",
  bg3: "#ebebeb",
  surface: "rgba(0,0,0,0.03)",
  border: "rgba(0,0,0,0.1)",
  borderHover: "rgba(0,0,0,0.2)",
  textPrimary: "#1a1a1a",
  textSecondary: "#555555",
  textMuted: "#888888",
};

export default function ThemeEffect() {
  const { theme } = useTheme();

  useEffect(() => {
    const colors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
    const root = document.documentElement;
    
    root.style.setProperty("--bg", colors.bg);
    root.style.setProperty("--bg2", colors.bg2);
    root.style.setProperty("--bg3", colors.bg3);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--border-hover", colors.borderHover);
    root.style.setProperty("--text-primary", colors.textPrimary);
    root.style.setProperty("--text-secondary", colors.textSecondary);
    root.style.setProperty("--text-muted", colors.textMuted);
    
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background = colors.bg;
    document.body.style.color = colors.textPrimary;
  }, [theme]);

  return null;
}