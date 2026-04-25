"use client";

import { useEffect } from "react";

/**
 * ChatWidget (V50.31)
 * Loads chat widget after hydration
 */
export default function ChatWidget() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Load widget.js
      const script = document.createElement("script");
      script.src = "/widget.js";
      script.setAttribute("data-bot-id", "demo");
      script.defer = true;
      document.body.appendChild(script);
      
      console.log("🛡️ Stratix: Chat widget loaded");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
