import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://stratix-intelligence.vercel.app'),
  title: 'Stratix Intelligence — El Estándar B2B de IA',
  description: 'Arquitectura de Inteligencia Artificial para empresas de alto rendimiento. Automatiza ventas, soporte y captura leads con tecnología RAG de Élite.',
  keywords: ["inteligencia artificial", "SaaS B2B", "CRM con IA", "Stratix Intelligence", "automatización de ventas", "WhatsApp Bot Inteligente", "RAG B2B", "captador de leads"],
  authors: [{ name: "Stratix Intelligence" }],
  icons: {
    icon: "/stratix_shield.svg",
    apple: "/stratix_shield.svg",
  },
  openGraph: {
    title: 'Stratix Intelligence | Arquitectura de IA Corporativa',
    description: 'Automatiza tu proceso de ventas y atención omnicanal con nuestra suite integrada de IA. Creado por arquitectos para dueños de negocios exigentes.',
    images: ['/stratix_shield.svg'], 
    type: 'website',
    url: 'https://stratix-intelligence.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratix Intelligence | La Suite de IA Corporativa',
    description: 'Escala tus operaciones con inteligencia estratégica y captura leads 24/7.',
    images: ['/stratix_shield.svg'],
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
      <body>
        {children}
        <script src="/widget.js" data-bot-id="demo" defer></script>
      </body>
    </html>
  );
}