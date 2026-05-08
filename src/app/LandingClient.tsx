"use client";

import { useState, useEffect, Suspense } from "react";
import { Toaster } from "sonner";

import { LangProvider } from "@/components/LangContext";
import { ThemeProvider } from "@/components/ThemeContext";
import ThemeEffect from "@/components/ThemeEffect";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Particles from "@/components/ui/Particles";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Logos from "@/components/sections/Logos";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";
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
import SocialProof from "@/components/SocialProof";

export default function LandingClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div style={{ minHeight: '100vh', background: '#070910' }} />;

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#070910' }} />}>
      <ThemeProvider>
        <ThemeEffect />
        <LangProvider>
          <main style={{ position: 'relative' }}>
          <Cursor />
          <Analytics />
          <MetaPixel />
          <Particles />
          <AnimatedBackground />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Navbar />

            {/* 1. HERO - Captura atención */}
            <Hero />

            {/* 2. SOCIAL PROOF - Credibilidad inmediata */}
            <Stats />
            <Logos />

            {/* 3. FEATURES - Propuesta de valor */}
            <Features />

            {/* 4. HOW IT WORKS - Explica el proceso ANTES de pricing */}
            <HowItWorks />

            {/* 5. BEFORE/AFTER - Comparación visual */}
            <BeforeAfter />

            {/* 6. TESTIMONIALS - Prueba social */}
            <Testimonials />

            {/* 7. PRICING - Precio DESPUÉS de valor */}
            <Pricing />

            {/* 8. ROI CALCULATOR - Justificación financiera */}
            <ROICalculator />

            {/* 9. FAQ - Resuelve objeciones DESPUÉS de pricing */}
            <FAQ />

            {/* 10. TRUST BADGES - Confianza */}
            <TrustBadges />

            {/* 11. CTA - Llamada a la acción final */}
            <CTA />

            {/* 12. FOOTER */}
            <Footer />
          </div>
          <WelcomePopup />
          <ExitIntentPopup />
          <SocialProof />
          <Toaster theme="dark" richColors position="top-center" />
        </main>
        </LangProvider>
        </ThemeProvider>
      </Suspense>
  );
}
