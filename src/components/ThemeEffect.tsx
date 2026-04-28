"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeEffect() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    
    if (theme === "light") {
      document.body.style.background = "#f0f0f0";
      document.body.style.color = "#1a1a1a";
    } else {
      document.body.style.background = "#070910";
      document.body.style.color = "#f0f2f8";
    }
  }, [theme]);

  return null;
}