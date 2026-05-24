import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import WhatsAppStickyMobile from "@/components/WhatsAppStickyMobile";
import ScarcityPopup from "@/components/ScarcityPopup";
import CalendlyWidget from "@/components/CalendlyWidget";
import CalendlyButton from "@/components/CalendlyButton";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/components/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://stratix-intelligence-ia.vercel.app'),
  title: {
    default: 'Stratix Intelligence | IA que Cierra Ventas 24/7',
    template: '%s | Stratix Intelligence'
  },
  description: 'El agente de ventas más avanzado de LATAM. Automatiza WhatsApp, Instagram y Web 24/7. +1,800 empresas ya lo usan. Reduces costo de adquisición hasta 60%.',
  keywords: ["IA ventas automatizadas", "WhatsApp Business IA", "automatización ventas Colombia", "Stratix Intelligence", "chatbot ventas", "agente IA inmobiliario", "RAG neuronal", "automatización B2B", "inteligencia artificial ventas", "asistente virtual ventas", "Lead qualification AI", "Colombia IA negocio"],
  authors: [{ name: 'Stratix Intelligence' }],
  creator: 'Stratix Intelligence',
  publisher: 'Stratix Intelligence',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://stratix-intelligence-ia.vercel.app',
  },
  verification: {
    google: 'uSkS-Tt36J-Dy_boeR36cOMHaGYd3vD-yCfY79B84Is',
  },
  icons: {
    icon: "/stratix_shield.svg",
    apple: [{ url: "/stratix_shield.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
  openGraph: {
    title: 'Stratix Intelligence | IA que Cierra Ventas 24/7',
    description: '+1,800 empresas en LATAM usan Stratix para automatizar ventas mientras duermen.',
    url: 'https://stratix-intelligence-ia.vercel.app',
    siteName: 'Stratix Intelligence',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Stratix Intelligence' },
    ],
    type: 'website',
    locale: 'es_CO',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratix | IA que Cierra Ventas 24/7',
    description: '+1,800 empresas en LATAM usan Stratix para automatizar ventas.',
    images: ['/og-image.png'],
    creator: '@stratix',
    site: '@stratix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C3EKFHJ4FE"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C3EKFHJ4FE');
          `,
        }} />
        {/* Google Tag Manager - for GTM container */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T8VQKWXX');`,
        }} />
        
        {/* Schema.org - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Stratix Intelligence",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Cloud, Web, WhatsApp, Instagram",
              "url": "https://stratix-intelligence-ia.vercel.app",
              "description": "Agente de IA para automatización de ventas 24/7 en WhatsApp, Instagram y Web",
              "offers": {
                "@type": "Offer",
                "price": "49.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1871",
                "bestRating": "5",
                "worstRating": "4"
              },
              "creator": {
                "@type": "Organization",
                "name": "Stratix Intelligence",
                "url": "https://stratix-intelligence-ia.vercel.app",
                "location": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Bogotá",
                    "addressCountry": "CO"
                  }
                }
              }
            }),
          }}
        />

        {/* Schema.org - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Stratix Intelligence",
              "url": "https://stratix-intelligence-ia.vercel.app",
              "logo": "https://stratix-intelligence-ia.vercel.app/stratix_shield.svg",
              "description": "Agente de IA para automatización de ventas 24/7",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bogotá",
                "addressRegion": "Cundinamarca",
                "addressCountry": "CO"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+573159269287",
                "contactType": "sales",
                "availableLanguage": ["Spanish", "English"]
              },
              "sameAs": [
                "https://wa.me/573159269287"
              ]
            }),
          }}
        />

        {/* Schema.org - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "¿Cuánto tiempo tarda en configurarse Stratix?", "acceptedAnswer": { "@type": "Answer", "text": "En 15 minutos tienes tu primer agente configurado. No necesitas experiencia técnica." }},
                { "@type": "Question", "name": "¿Stratix se integra con mi CRM?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Conectamos con HubSpot, Salesforce, Zoho, Pipedrive y cualquier sistema con API." }},
                { "@type": "Question", "name": "¿Hay garantía?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. 7 días gratis y garantía de devolución del 100% en 30 días." }},
                { "@type": "Question", "name": "¿Stratix funciona con WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Se integra directamente con WhatsApp Business API, respondiendo automáticamente en segundos, 24/7." }},
                { "@type": "Question", "name": "¿Cuánto cuesta?", "acceptedAnswer": { "@type": "Answer", "text": "Desde $49 USD/mes. Sin contratos largos. Empieza gratis y cancela cuando quieras." }},
                { "@type": "Question", "name": "¿Necesito conocimientos técnicos?", "acceptedAnswer": { "@type": "Answer", "text": "No. Configurar Stratix toma 15 minutos. Solo subes tu información." }},
                { "@type": "Question", "name": "¿Qué pasa si el cliente quiere hablar con un humano?", "acceptedAnswer": { "@type": "Answer", "text": "El bot detecta la intención y transfiere automáticamente a tu equipo cuando es necesario." }},
                { "@type": "Question", "name": "¿Puedo cancelar en cualquier momento?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Sin contratos largos ni penalizaciones. Cancela desde tu dashboard cuando quieras." }},
                { "@type": "Question", "name": "¿Cuántos agentes puedo tener?", "acceptedAnswer": { "@type": "Answer", "text": "Desde 1 agente en el plan Starter hasta ilimitados en el plan Enterprise." }}
              ]
            }),
          }}
        />

        {/* Schema.org - VideoObject */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Stratix Intelligence Demo",
              "description": "Mira cómo Stratix automatiza ventas en WhatsApp, Instagram y Web 24/7",
              "uploadDate": "2026-05-08",
              "duration": "PT1M",
              "embedUrl": "https://stratix-intelligence-ia.vercel.app",
              "thumbnailUrl": "https://stratix-intelligence-ia.vercel.app/stratix_shield.svg",
            }),
          }}
        />
      </head>
      <body className="m-0 p-0">
        <ThemeProvider>
        {/* Google Tag Manager noscript */}
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T8VQKWXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }} />
        {children}
        <FloatingWhatsApp />
        <WhatsAppStickyMobile />
        <ScarcityPopup />
        <CalendlyWidget />
        <CookieConsent />
        <CalendlyButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
