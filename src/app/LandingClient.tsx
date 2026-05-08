"use client";

import { useState, useEffect, Suspense } from "react";
import { Toaster } from "sonner";

import { LangProvider } from "@/components/LangContext";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Pricing from "@/components/sections/Pricing";
import ROICalculator from "@/components/sections/ROICalculator";
import FAQ from "@/components/sections/FAQ";
import TrustBadges from "@/components/sections/TrustBadges";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Analytics from "@/components/Analytics";
import MetaPixel from "@/components/MetaPixel";
import WelcomePopup from "@/components/WelcomePopup";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function LandingClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#070910', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(212,175,55,0.2)', borderTopColor: '#D4AF37', animation: 'spin 0.8s linear infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase' }}>Cargando núcleo...</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#070910', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(212,175,55,0.2)', borderTopColor: '#D4AF37', animation: 'spin 0.8s linear infinite' }} /></div>}>
      <LangProvider>
        <main style={{ position: 'relative' }}>
        <Cursor />
        <Analytics />
        <MetaPixel />
        <AnimatedBackground />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Navbar />

          {/* 1. HERO */}
          <Hero />

          {/* 2. SOCIAL PROOF */}
          <Stats />

          {/* 3. FEATURES */}
          <Features />

          {/* 4. HOW IT WORKS */}
          <HowItWorks />

          {/* 5. BEFORE/AFTER */}
          <BeforeAfter />

          {/* 6. PRICING */}
          <Pricing />

          {/* 7. ROI CALCULATOR */}
          <ROICalculator />

          {/* 8. FAQ */}
          <FAQ />

          {/* 9. TRUST BADGES */}
          <TrustBadges />

          {/* 10. CTA */}
          <CTA />

          {/* 11. FOOTER */}
          <Footer />
        </div>
        <WelcomePopup />
        <ExitIntentPopup />
        <Toaster theme="dark" richColors position="top-center" />
      </main>
      </LangProvider>
    </Suspense>
  );
}
