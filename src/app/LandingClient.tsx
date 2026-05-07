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
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProof from "@/components/SocialProof";
// import ChatFloat from "@/components/ChatFloat"; // Removed to fix UI overlap
import AIModels from "@/components/sections/AIModels";
import VideoDemo from "@/components/sections/VideoDemo";
import MediaLogos from "@/components/sections/MediaLogos";
import CalendlyWidget from "@/components/CalendlyWidget";

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
            <Hero />
            <VideoDemo />
            <MediaLogos />
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
          {/* <ChatFloat /> */} // Removed to fix UI overlap
          <SocialProof />
          <Toaster theme="dark" richColors position="top-center" />
        </main>
        </LangProvider>
        </ThemeProvider>
      </Suspense>
  );
}