import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatGenius — IA que entiende tu negocio",
  description:
    "El asistente de IA más inteligente para equipos que quieren moverse más rápido. Automatiza, responde, convierte.",
  openGraph: {
    title: "ChatGenius — IA que entiende tu negocio",
    description:
      "Automatiza conversaciones, responde al instante y convierte cada interacción en una oportunidad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
