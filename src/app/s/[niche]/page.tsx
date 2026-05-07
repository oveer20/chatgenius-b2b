import { Metadata } from "next";
import NicheClient from "./NicheClient";

const NICHES = {
  inmobiliarias: {
    title: "IA para Inmobiliarias | Stratix Intelligence",
    desc: "Automatiza la agenda de visitas y califica compradores 24/7. El asistente IA que vende propiedades mientras duermes.",
    keyword: "IA inmobiliaria",
    cta: "Automatizar mi inmobiliaria",
    icon: "🏠",
  },
  clinicas: {
    title: "IA para Clínicas y Salud | Stratix Intelligence",
    desc: "Reduce inasistencias un 80% con recordatorios automáticos y agenda citas sin intervención humana.",
    keyword: "IA para clínicas",
    cta: "Automatizar mi clínica",
    icon: "🏥",
  },
  ecommerce: {
    title: "IA para E-commerce | Stratix Intelligence",
    desc: "Recupera carritos abandonados y responde dudas de envíos al instante. Aumenta tus conversiones un 25%.",
    keyword: "IA para ecommerce",
    cta: "Automatizar mi tienda",
    icon: "🛒",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche } = await params;
  const data = NICHES[niche as keyof typeof NICHES];
  if (!data) return { title: "Stratix Intelligence" };
  return {
    title: data.title,
    description: data.desc,
  };
}

export default async function NichePage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const data = NICHES[niche as keyof typeof NICHES];
  
  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: '#060B14', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Nicho no encontrado. Vuelve al <a href="/" style={{ color: '#D4AF37' }}>inicio</a>.</h1>
      </div>
    );
  }

  return <NicheClient data={data} niche={niche} />;
}
