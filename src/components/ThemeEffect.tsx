"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeEffect() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background = theme === "dark" ? "#070910" : "#f5f5f5";
    document.body.style.color = theme === "dark" ? "#f0f2f8" : "#1a1a1a";
  }, [theme]);

  return null;
}