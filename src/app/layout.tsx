import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Stratix AI — Architectural Strategic Intelligence',
  description: 'El estándar global de inteligencia estratégica para empresas B2B de élite. Automatización, diseño y estrategia impulsada por el Ecosistema Stratix.',
  keywords: ["soporte 24/7", "inteligencia artificial", "IA B2B", "Stratix AI"],
  authors: [{ name: "Stratix AI" }],
  // 👇 Esta sección es la que activa el escudo en la pestaña del navegador
  icons: {
    icon: "/stratix_shield.svg",
    apple: "/stratix_shield.svg",
  },
  openGraph: {
    title: 'Stratix AI | Ecosistema de Inteligencia para Negocios de Élite',
    description: 'Automatiza tu proceso de ventas y atención con una suite integrada de IA. Tecnología avanzada para empresas estratégicas.',
    images: ['/stratix_shield.svg'], // Actualizado a .svg
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratix AI | La Suite de IA Corporativa',
    description: 'Escala tus operaciones con inteligencia estratégica.',
    images: ['/stratix_shield.svg'], // Actualizado a .svg
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Stratix AI",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                price: "49.00",
                priceCurrency: "USD",
              },
              description:
                "El ecosistema definitivo de IA para empresas. Automatiza tu atención al cliente con tecnología avanzada de Google Labs.",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}