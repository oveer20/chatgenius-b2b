"use client";

import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

import { LangProvider } from "@/components/LangContext";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
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
const InteractiveDemo = lazy(() => import("@/components/sections/InteractiveDemo"));
const ROICalculator = lazy(() => import("@/components/sections/ROICalculator"));
const FAQ = lazy(() => import("@/components/sections/FAQ"));
const CTA = lazy(() => import("@/components/sections/CTA"));
const Footer = lazy(() => import("@/components/sections/Footer"));
const FloatingSocialProof = lazy(() => import("@/components/sections/FloatingSocialProof"));

function SectionFallback({ height = "h-[500px]" }: { height?: string }) {
  return (
    <div className={`${height} w-full flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-[2px] border-accent/20 border-t-accent animate-spin" />
        <div className="font-mono text-[11px] text-text-muted tracking-wider">CARGANDO</div>
      </div>
    </div>
  );
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
        <ScrollProgress />
        <div className="relative z-10">
          <Navbar />
          <GuaranteeBanner />
          <Hero />
          <hr className="section-divider" />
          <Stats />
          <Integrations />
          <hr className="section-divider" />
          <Features />
          <Suspense fallback={<SectionFallback height="h-[600px]" />}>
            <HowItWorks />
          </Suspense>
          <hr className="section-divider" />
          <Suspense fallback={<SectionFallback height="h-[600px]" />}>
            <BeforeAfter />
          </Suspense>
          <Suspense fallback={<SectionFallback height="h-[550px]" />}>
            <ScreensShowcase />
          </Suspense>
          <hr className="section-divider" />
          <Suspense fallback={<SectionFallback height="h-[700px]" />}>
            <Pricing />
          </Suspense>
          <Suspense fallback={<SectionFallback height="h-[600px]" />}>
            <InteractiveDemo />
          </Suspense>
          <Suspense fallback={<SectionFallback height="h-[550px]" />}>
            <ROICalculator />
          </Suspense>
          <Suspense fallback={<SectionFallback height="h-[450px]" />}>
            <FAQ />
          </Suspense>
          <hr className="section-divider" />
          <Suspense fallback={<SectionFallback height="h-[550px]" />}>
            <CTA />
          </Suspense>
          <Suspense fallback={<SectionFallback height="h-[450px]" />}>
            <Footer />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <FloatingSocialProof />
        </Suspense>
        <Toaster theme="dark" richColors position="top-center" />
      </main>
    </LangProvider>
  );
}
