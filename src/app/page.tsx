import { Suspense } from "react";
import { Metadata } from "next";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: 'Stratix Intelligence | Tu negocio en piloto automático',
  description: 'Atiende, califica y cierra ventas 24/7 con el estándar de IA para empresas B2B. Tecnología Opal Logic y RAG Neuronal.',
  openGraph: {
    title: 'Stratix Intelligence | Arquitectura de IA Corporativa',
    description: 'Vende más, duerme mejor. Automatización omnicanal de Élite.',
    images: ['/stratix_shield.svg'],
  }
};

export default function LandingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060B14' }} />}>
      <LandingClient />
    </Suspense>
  );
}
