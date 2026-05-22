"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "sonner";

import { LangProvider } from "@/components/LangContext";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import GuaranteeBanner from "@/components/sections/GuaranteeBanner";
import Stats from "@/components/sections/Stats";
import Integrations from "@/components/sections/Integrations";
import Features from "@/components/sections/Features";
import Analytics from "@/components/Analytics";
import MetaPixel from "@/components/MetaPixel";

const Cursor = lazy(() => import("@/components/Cursor"));

const HowItWorks = lazy(() => import("@/components/sections/HowItWorks"));
const BeforeAfter = lazy(() => import("@/components/sections/BeforeAfter"));
const ScreensShowcase = lazy(() => import("@/components/sections/ScreensShowcase"));
const Pricing = lazy(() => import("@/components/sections/Pricing"));
const PricingComparison = lazy(() => import("@/components/sections/PricingComparison"));
const InteractiveDemo = lazy(() => import("@/components/sections/InteractiveDemo"));
const ROICalculator = lazy(() => import("@/components/sections/ROICalculator"));
const ContactForm = lazy(() => import("@/components/sections/ContactForm"));
const FAQ = lazy(() => import("@/components/sections/FAQ"));
const TrustIndicators = lazy(() => import("@/components/sections/TrustIndicators"));
const TrustBadges = lazy(() => import("@/components/sections/TrustBadges"));
const CTA = lazy(() => import("@/components/sections/CTA"));
const Footer = lazy(() => import("@/components/sections/Footer"));
const FloatingSocialProof = lazy(() => import("@/components/sections/FloatingSocialProof"));
const WelcomePopup = lazy(() => import("@/components/WelcomePopup"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

export default function LandingClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-12 h-12 rounded-full border-[3px] border-accent/20 border-t-accent animate-spin" />
          <span className="font-mono text-xs text-accent tracking-[3px] uppercase">Cargando núcleo...</span>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center"><div className="w-12 h-12 rounded-full border-[3px] border-accent/20 border-t-accent animate-spin" /></div>}>
      <LangProvider>
        <main className="relative">
        <Cursor />
        <Analytics />
        <MetaPixel />
        <AnimatedBackground />
        <div className="relative z-10">
          <Navbar />

          <GuaranteeBanner />

          <Hero />

          <Stats />

          <Integrations />

          <Features />

          <HowItWorks />

          <BeforeAfter />

          <ScreensShowcase />

          <Pricing />
          <PricingComparison />

          <InteractiveDemo />

          <ROICalculator />

          <ContactForm />

          <FAQ />

          <TrustIndicators />
          <TrustBadges />

          <CTA />

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
