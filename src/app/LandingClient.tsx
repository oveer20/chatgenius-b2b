"use client";

import { Suspense, lazy } from "react";
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

function SectionFallback() {
  return <div className="h-64 w-full" />;
}

export default function LandingClient() {
  return (
    <LangProvider>
      <main className="relative">
        <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center"><div className="w-12 h-12 rounded-full border-[3px] border-accent/20 border-t-accent animate-spin" /></div>}>
          <Cursor />
        </Suspense>
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
          <Suspense fallback={<SectionFallback />}>
            <HowItWorks />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <BeforeAfter />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ScreensShowcase />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Pricing />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <PricingComparison />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <InteractiveDemo />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ROICalculator />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContactForm />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TrustIndicators />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TrustBadges />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <CTA />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Footer />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <FloatingSocialProof />
        </Suspense>
        <Suspense fallback={null}>
          <WelcomePopup />
        </Suspense>
        <Suspense fallback={null}>
          <ExitIntentPopup />
        </Suspense>
        <Toaster theme="dark" richColors position="top-center" />
      </main>
    </LangProvider>
  );
}
