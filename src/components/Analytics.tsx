"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-GTMPropertyID", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleLeadSubmit = (e: CustomEvent) => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "lead_submit", {
          event_category: "conversion",
          event_label: e.detail?.source || "landing_page",
          value: 1,
        });
      }
    };

    const handleCtaClick = (e: CustomEvent) => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: e.detail?.cta || "unknown",
        });
      }
    };

    window.addEventListener("stratix:lead", handleLeadSubmit as EventListener);
    window.addEventListener("stratix:cta", handleCtaClick as EventListener);

    return () => {
      window.removeEventListener("stratix:lead", handleLeadSubmit as EventListener);
      window.removeEventListener("stratix:cta", handleCtaClick as EventListener);
    };
  }, []);

  return null;
}

export function trackLead(source: string) {
  const event = new CustomEvent("stratix:lead", {
    detail: { source },
  });
  window.dispatchEvent(event);
}

export function trackCta(ctaName: string) {
  const event = new CustomEvent("stratix:cta", {
    detail: { cta: ctaName },
  });
  window.dispatchEvent(event);
}