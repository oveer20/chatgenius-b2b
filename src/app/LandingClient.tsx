"use client";

import { useState, useEffect, Suspense } from "react";
import { Toaster } from "sonner";

import { LangProvider } from "@/components/LangContext";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import GuaranteeBanner from "@/components/sections/GuaranteeBanner";
import Stats from "@/components/sections/Stats";
import Integrations from "@/components/sections/Integrations";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import BeforeAfter from "@/components/sections/BeforeAfter";
import ScreensShowcase from "@/components/sections/ScreensShowcase";
import Pricing from "@/components/sections/Pricing";
import PricingComparison from "@/components/sections/PricingComparison";
import InteractiveDemo from "@/components/sections/InteractiveDemo";
import ROICalculator from "@/components/sections/ROICalculator";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/sections/FAQ";
import TrustIndicators from "@/components/sections/TrustIndicators";
import TrustBadges from "@/components/sections/TrustBadges";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import FloatingSocialProof from "@/components/sections/FloatingSocialProof";
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

          <GuaranteeBanner />

          {/* 1. HERO */}
          <Hero />

          {/* 2. SOCIAL PROOF */}
          <Stats />

          {/* 3. INTEGRACIONES */}
          <Integrations />

          {/* 4. FEATURES */}
          <Features />

          {/* 5. HOW IT WORKS */}
          <HowItWorks />

          {/* 6. BEFORE/AFTER */}
          <BeforeAfter />

          {/* 7. SCREENS SHOWCASE */}
          <ScreensShowcase />

          {/* 8. PRICING */}
          <Pricing />
          <PricingComparison />

          {/* 9. INTERACTIVE DEMO */}
          <InteractiveDemo />

          {/* 10. ROI CALCULATOR */}
          <ROICalculator />

          {/* 11. CONTACT FORM */}
          <ContactForm />

          {/* 12. FAQ */}
          <FAQ />

          {/* 13. TRUST */}
          <TrustIndicators />
          <TrustBadges />

          {/* 14. CTA */}
          <CTA />

          {/* 15. FOOTER */}
          <Footer />
        </div>
        <FloatingSocialProof />
        <WelcomePopup />
        <ExitIntentPopup />
        <Toaster theme="dark" richColors position="top-center" />
      </main>
      </LangProvider>
    </Suspense>
  );
}