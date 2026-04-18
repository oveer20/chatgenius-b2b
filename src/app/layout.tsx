import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ChatWidget from "@/components/ChatWidget";

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600", "700", "900"],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stratix-intelligence.vercel.app'),
  title: {
    default: 'Stratix Intelligence | Architectural AI for Enterprise Growth',
    template: '%s | Stratix Intelligence'
  },
  description: 'Automatización de ventas y atención al cliente con IA de grado industrial. Stratix implementa Opal Logic y RAG Neuronal para calificar leads y escalar operaciones B2B 24/7.',
  keywords: ["Stratix Intelligence", "IA B2B", "Opal Logic", "RAG Neural", "Lead Automation", "SaaS Enterprise AI", "AI for Real Estate", "Neural Business Engine"],
  icons: { icon: "/stratix_shield.svg" },
  openGraph: {
    title: 'Stratix Intelligence | Neural Business Infrastructure',
    description: 'Transforma tu atención al cliente en una máquina de ventas autónoma con Stratix Intelligence.',
    url: 'https://stratixintelligence.com',
    siteName: 'Stratix Intelligence',
    images: [{ url: '/stratix_shield.svg', width: 1200, height: 630, alt: 'Stratix Intelligence S-Shield' }], 
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratix Intelligence | Venta Autónoma de Élite',
    description: 'La infraestructura de IA más avanzada para el sector B2B de alto impacto.',
    images: ['/stratix_shield.svg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        {/* Analytics Dashboard Sync (V38.0) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Stratix Intelligence",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Cloud",
              offers: {
                "@type": "Offer",
                price: "49.00",
                priceCurrency: "USD",
              }
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#060B14', color: '#F8F9FA' }}>
        {children}
      </body>
</html>
  );
}