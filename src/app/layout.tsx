import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatGenius B2B — Asistentes de IA para Soporte al Cliente",
  description:
    "Crea y entrena chatbots con inteligencia artificial para tu empresa en minutos. Automatiza tu atención al cliente y aumenta ventas 24/7.",
  keywords: [
    "AI chatbot",
    "B2B SaaS",
    "customer support AI",
    "chatbots para empresas",
    "atención al cliente automatizada",
    "soporte 24/7",
    "inteligencia artificial",
  ],
  authors: [{ name: "ChatGenius" }],
  openGraph: {
    title: "ChatGenius B2B — Asistentes de IA",
    description:
      "Automatiza tu atención al cliente con chatbots inteligentes.",
    type: "website",
    locale: "es_ES",
    siteName: "ChatGenius",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGenius B2B — Asistentes de IA",
    description:
      "Automatiza tu atención al cliente con chatbots inteligentes.",
  },
  robots: {
    index: true,
    follow: true,
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
              name: "ChatGenius B2B",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                price: "49.00",
                priceCurrency: "USD",
              },
              description:
                "Plataforma B2B para crear chatbots con Inteligencia Artificial para atención al cliente automatizada.",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
