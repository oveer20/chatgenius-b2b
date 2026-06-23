"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleLeadSubmit = (e: CustomEvent) => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "generate_lead", {
          event_category: "conversion",
          event_label: e.detail?.source || "landing_page",
          value: 100,
          currency: "USD",
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

    const handleSchedule = () => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "schedule_demo", {
          event_category: "conversion",
          event_label: "calendly",
        });
      }
    };

    window.addEventListener("stratix:lead", handleLeadSubmit as EventListener);
    window.addEventListener("stratix:cta", handleCtaClick as EventListener);
    window.addEventListener("stratix:schedule", handleSchedule as EventListener);

    return () => {
      window.removeEventListener("stratix:lead", handleLeadSubmit as EventListener);
      window.removeEventListener("stratix:cta", handleCtaClick as EventListener);
      window.removeEventListener("stratix:schedule", handleSchedule as EventListener);
    };
  }, []);

  return null;
}

export function trackLead(source: string) {
  window.dispatchEvent(new CustomEvent("stratix:lead", { detail: { source } }));
}

export function trackCta(ctaName: string) {
  window.dispatchEvent(new CustomEvent("stratix:cta", { detail: { cta: ctaName } }));
}

export function trackSchedule() {
  window.dispatchEvent(new CustomEvent("stratix:schedule", {}));
}