import { Suspense } from "react";
import { Metadata } from "next";
import LandingClient from "./LandingClient";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: 'Stratix Intelligence | Arquitectura de IA Estratégica B2B',
  description: 'Vende más, duerme mejor. Stratix implementa Opal Logic y RAG Neuronal para automatizar ventas, calificar leads y cerrar negocios 24/7 con infalibilidad estratégica.',
  keywords: ['IA para Inmobiliarias', 'Automatización de Ventas B2B', 'Opal Logic', 'RAG Neuronal', 'SaaS Inteligencia Artificial', 'Stratix Intelligence Bogotá Medellín'],
  openGraph: {
    title: 'Stratix Intelligence | Arquitectura de IA Corporativa',
    description: 'Vende más, duerme mejor. Automatización omnicanal de Élite para negocios de alto impacto.',
    url: 'https://stratix-intelligence-ia.vercel.app',
    siteName: 'Stratix Intelligence',
    images: [
      {
        url: '/stratix_shield.svg',
        width: 800,
        height: 600,
        alt: 'Stratix Intelligence S-Shield Architecture',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratix Intelligence | Venta Autónoma de Élite',
    description: 'La infraestructura de IA más avanzada para el sector B2B e Inmobiliario.',
    images: ['/stratix_shield.svg'],
  }
};

export default function LandingPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060B14' }} />}>
        <LandingClient />
      </Suspense>
    </ErrorBoundary>
  );
}
