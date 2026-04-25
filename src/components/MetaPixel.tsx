"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID || typeof window.fbq === "undefined") return;

    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", {
      content_name: "Stratix Intelligence Landing",
      content_category: "SaaS AI Agents",
      currency: "USD",
      value: 0,
    });
  }, [pathname]);

  useEffect(() => {
    if (!PIXEL_ID || typeof window.fbq !== "undefined") return;

    const handleLead = () => {
      window.fbq("track", "Lead", {
        content_name: "Email Capture",
        content_category: "Lead Generation",
      });
    };

    const handleCta = () => {
      window.fbq("track", "InitiateCheckout", {
        content_name: "CTA Click",
        currency: "USD",
        value: 0,
      });
    };

    window.addEventListener("stratix:lead", handleLead);
    window.addEventListener("stratix:cta", handleCta);

    return () => {
      window.removeEventListener("stratix:lead", handleLead);
      window.removeEventListener("stratix:cta", handleCta);
    };
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
}