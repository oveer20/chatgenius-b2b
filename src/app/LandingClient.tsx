"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { FiMenu, FiX } from "react-icons/fi";

import { createClient } from "@/utils/supabase/client";
import ChatWidget from "@/components/ChatWidget";

// Sub-componentes Atómicos
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingPricing from "@/components/landing/LandingPricing";
import LandingROI from "@/components/landing/LandingROI";
import LandingFAQ from "@/components/landing/LandingFAQ";

/**
 * SearchParamsHandler (V50.31)
 * Aísla totalmente el uso de searchParams para evitar de-opts fatales en Next.js 15.
 */
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
    } catch (e) {
      console.warn("🛡️ Stratix: SearchParams isolation protected a hydration skip.");
    }
  }, [searchParams, hasAutoCheckedOut, onCheckout]);

  return null;
}

export default function LandingClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log("🚀 Stratix Intelligence V50.31 - Survival Shield Loaded");
  }, []);

  // Hydration Shield Crítico
  if (!isMounted) return <div style={{ minHeight: '100vh', background: '#060B14' }} />;

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060B14' }} />}>
      <LandingClientContent />
    </Suspense>
  );
}

function LandingClientContent() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [currency, setCurrency] = useState<'USD' | 'COP'>('COP');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#060B14' }} />;

  const handleCheckout = async (planId: string) => {
    try {
      if (!supabase) {
        toast.error("Configuración incompleta: Supabase no detectado.");
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { 
        router.push(`/login?redirect=/&plan=${planId}`); 
        return; 
      }
      const endpoint = currency === 'COP' ? "/api/checkout" : "/api/checkout/stripe";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, email: user.email, userId: user.id })
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else if (mounted) toast.error("Error al iniciar el pago: " + (data.error || "Desconocido"));
    } catch (err) {
      if (mounted) toast.error("Hubo un problema con la pasarela de pagos.");
    }
  };

  return (
    <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      
      {/* Search Shield Isolated */}
      <Suspense fallback={null}>
        <SearchParamsHandler onCheckout={handleCheckout} />
      </Suspense>

      {/* NAVEGACIÓN */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: isScrolled ? '1rem 5%' : '1.5rem 5%', 
        background: isScrolled ? 'rgba(6,11,20,0.98)' : 'transparent', 
        backdropFilter: isScrolled ? 'blur(20px)' : 'none', 
        position: 'sticky', top: 0, zIndex: 100, 
        borderBottom: isScrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
        transition: 'all 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/stratix_shield.svg" alt="Logo" style={{ width: '32px', height: '32px' }} />
          <span style={{ fontSize: '1.4rem', fontWeight: 900 }}>Stratix Intelligence</span>
        </div>
        <div className="sx-desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
          <a href="#roi" style={{ color: 'white', textDecoration: 'none', opacity: 0.5 }}>ROI</a>
          <a href="#planes" style={{ color: 'white', textDecoration: 'none', opacity: 0.5 }}>Planes</a>
          <Link href="/login" style={{ padding: '11px 24px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '10px', textDecoration: 'none', fontWeight: 900 }}>Acceso Élite</Link>
        </div>
      </nav>

      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingPricing handleCheckout={handleCheckout} currency={currency} setCurrency={setCurrency} />
        <LandingROI />
        <LandingFAQ />
      </main>

      <footer style={{ padding: '7rem 5% 4rem', background: '#020508', borderTop: '1px solid rgba(212,175,55,0.05)', textAlign: 'center' }}>
        <p style={{ opacity: 0.2, fontSize: '0.85rem' }}>© 2026 Stratix Intelligence. Colombia. 🛡️ (V50.31)</p>
      </footer>

      {/* UI SEGURA TRAS HIDRATACIÓN */}
      <Toaster theme="dark" richColors position="top-center" />
      <ChatWidget />
    </div>
  );
}
