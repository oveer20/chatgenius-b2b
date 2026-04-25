"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Toaster } from "sonner";

import { LangProvider } from "@/components/LangContext";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Particles from "@/components/ui/Particles";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Logos from "@/components/sections/Logos";
import LiveDemo from "@/components/sections/LiveDemo";
import Features from "@/components/sections/Features";
import FAQ from "@/components/sections/FAQ";
import TrustBadges from "@/components/sections/TrustBadges";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import ScheduleDemo from "@/components/sections/ScheduleDemo";
import LeadCapture from "@/components/sections/LeadCapture";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Analytics from "@/components/Analytics";
import MetaPixel from "@/components/MetaPixel";
import WelcomePopup from "@/components/WelcomePopup";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ChatFloat from "@/components/ChatFloat";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProof from "@/components/SocialProof";
import AIModels from "@/components/sections/AIModels";

function SearchParamsHandler({ onCheckout }: { onCheckout: (plan: string) => void }) {
  const searchParams = useSearchParams();
  const [hasAutoCheckedOut, setHasAutoCheckedOut] = useState(false);

  useEffect(() => {
    try {
      const planFromUrl = searchParams.get("plan");
      if (planFromUrl && !hasAutoCheckedOut) {
        setHasAutoCheckedOut(true);
        onCheckout(planFromUrl);
      }
    } catch (e) {}
  }, [searchParams, hasAutoCheckedOut, onCheckout]);

  return null;
}

export default function LandingClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div style={{ minHeight: '100vh', background: '#070910' }} />;

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#070910' }} />}>
      <LangProvider>
        <LandingClientContent />
      </LangProvider>
    </Suspense>
  );
}

function LandingClientContent() {
  const router = useRouter();

  const handleCheckout = async (planId: string) => {
    router.push(`/login?redirect=/dashboard&plan=${planId}`);
  };

  return (
<main style={{ position: 'relative' }}>
        <Cursor />
        <Analytics />
        <MetaPixel />
        <Particles />
        <AnimatedBackground />
        <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <Hero />
        <Stats />
        <Logos />
        <LiveDemo />
        <Features />
        <AIModels />
        <FAQ />
        <TrustBadges />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <ScheduleDemo />
        <LeadCapture />
        <CTA />
        <Footer />
      </div>
      <WelcomePopup />
      <ExitIntentPopup />
      <WhatsAppFloat />
      <ChatFloat />
      <SocialProof />
      <Toaster theme="dark" richColors position="top-center" />
    </main>
  );
}