"use client";

import { useEffect } from "react";

/**
 * ChatWidget (V50.27)
 * Aísla la carga del script de chat para evitar colisiones de hidratación en React 19.
 * Se inyecta 2 segundos después del montaje inicial.
 */
export default function ChatWidget() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Google Analytics (V50.28)
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (gaId) {
        const gaScript = document.createElement("script");
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        gaScript.async = true;
        document.head.appendChild(gaScript);

        const gaInline = document.createElement("script");
        gaInline.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(gaInline);
      }

      // 2. Chat Widget
      const script = document.createElement("script");
      script.src = "/widget.js";
      script.setAttribute("data-bot-id", "demo");
      script.defer = true;
      document.body.appendChild(script);
      
      console.log("🛡️ Stratix Rescue: Integrations (GA + Chat) inyectadas tras hidratación estable.");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
