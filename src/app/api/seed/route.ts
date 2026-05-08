import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const SAMPLE_LEADS = [
  { name: "Carolina Mendoza", email: "carolina.mendoza@techcorp.co", phone: "+573001234567", company: "TechCorp Colombia", score: "Hot", intent: "Quiero automatizar mi equipo de ventas con IA", source: "whatsapp" },
  { name: "Andres Villamizar", email: "avillamizar@globaldata.io", phone: "+573051234567", company: "GlobalData SAS", score: "Hot", intent: "Cuantas conversaciones puede manejar mensualmente", source: "web" },
  { name: "Maria Fernanda Lopez", email: "mflopez@innovatech.com", phone: "+573101234567", company: "Innovatech SA", score: "Hot", intent: "Necesito integrar WhatsApp con mi CRM actual", source: "instagram" },
  { name: "Roberto Sanchez", email: "rsanchez@ventasplus.com", phone: "+573151234567", company: "VentasPlus", score: "Warm", intent: "Quiero saber el precio del plan profesional", source: "whatsapp" },
  { name: "Daniela Ruiz", email: "druiz@marketingdigital.co", phone: "+573201234567", company: "Marketing Digital", score: "Warm", intent: "Tienen alguna prueba gratuita", source: "web" },
  { name: "Carlos Martinez", email: "cmartinez@finanzasweb.com", phone: "+573251234567", company: "FinanzasWeb", score: "Warm", intent: "Cuanto cuesta el plan basico", source: "instagram" },
  { name: "Paula Gonzalez", email: "pgonzalez@agencia360.com", phone: "+573301234567", company: "Agencia 360", score: "Warm", intent: "Pueden atender en ingles", source: "whatsapp" },
  { name: "Jorge Ramirez", email: "jramirez@softworks.co", phone: "+573351234567", company: "Softworks", score: "Warm", intent: "Se integra con HubSpot", source: "web" },
  { name: "Sofia Torres", email: "storres@ecommerceplus.com", phone: "+573401234567", company: "EcommercePlus", score: "Cold", intent: "Hola, que es esto?", source: "instagram" },
  { name: "Miguel Castro", email: "mcastro@startupx.co", phone: "+573451234567", company: "StartupX", score: "Cold", intent: "Vi su anuncio en facebook", source: "facebook" },
  { name: "Laura Diaz", email: "ldiaz@consultores.com", phone: "+573501234567", company: "Consultores Asociados", score: "Cold", intent: "Hola", source: "web" },
  { name: "Fernando Gomez", email: "fgomez@empresa.com", phone: "+573551234567", company: "Empresa SA", score: "Hot", intent: "Necesito agendar una reunion para hablar de integraciones", source: "whatsapp" },
  { name: "Valentina Castro", email: "vcastro@prospeccion.ai", phone: "+573601234567", company: "Prospeccion AI", score: "Hot", intent: "Cual es el ROI promedio de sus clientes", source: "web" },
  { name: "Alejandro Perez", email: "aperez@ventaspro.co", phone: "+573651234567", company: "VentasPro", score: "Warm", intent: "Tienen dokumentacion de la api", source: "web" },
  { name: "Natalia Mendez", email: "nmendez@blossomco.com", phone: "+573701234567", company: "BlossomCo", score: "Hot", intent: "Quiero automatizar las respuestas de mi bot de Instagram", source: "instagram" },
  { name: "Diego Herrera", email: "dherrera@mediosdigitales.co", phone: "+573751234567", company: "Medios Digitales", score: "Warm", intent: "Que tan rapido se configura", source: "whatsapp" },
  { name: "Claudia Rojas", email: "crojas@cloudops.com", phone: "+573801234567", company: "CloudOps SAS", score: "Cold", intent: "Me pueden llamar", source: "phone" },
  { name: "Sebastian Aguirre", email: "saguirre@nexogen.io", phone: "+573851234567", company: "NexoGen", score: "Hot", intent: "Estamos listos para empezar, cuando podemos agendar?", source: "whatsapp" },
  { name: "Gabriela Silva", email: "gsilva@inteligenciasocial.com", phone: "+573901234567", company: "Inteligencia Social", score: "Warm", intent: "El plan enterprise incluye soporte dedicado?", source: "web" },
  { name: "Nicolas Ospina", email: "nospina@ventasauto.com", phone: "+573951234567", company: "VentasAuto", score: "Hot", intent: "Cerramos 50 leads en 30 dias con su tool, wow", source: "whatsapp" },
];

const SAMPLE_BOT_ID = "00000000-0000-0000-0000-000000000001";

export async function GET(req: NextRequest) {
  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: bots } = await supabaseAdmin
    .from("bots")
    .select("id, name")
    .eq("user_id", user.id)
    .limit(1);

  const botId = bots && bots.length > 0 ? bots[0].id : SAMPLE_BOT_ID;

  const { data: existing } = await supabaseAdmin
    .from("leads")
    .select("id, name, bot_id")
    .eq("bot_id", botId)
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json({ seeded: false, reason: "Already has leads", botId });
  }

  const inserts = SAMPLE_LEADS.map((lead, i) => ({
    ...lead,
    bot_id: botId,
    created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabaseAdmin.from("leads").insert(inserts);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ seeded: true, count: inserts.length, botId });
}