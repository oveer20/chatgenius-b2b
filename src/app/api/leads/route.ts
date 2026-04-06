import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase-server";

/**
 * STRATIX INTELLIGENCE — LEADS ENGINE (V30.0)
 * Gestión segura de prospectos y trazabilidad de marketing (UTM).
 */

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 1. Parámetros de Filtrado (V40.0)
  const { searchParams } = new URL(req.url);
  const botIdFilter = searchParams.get("botId");
  const scoreFilter = searchParams.get("score");
  const intentFilter = searchParams.get("intent");

  // 2. Seguridad: Obtener los IDs de los bots del usuario
  const { data: userBots } = await supabase.from("bots").select("id").eq("user_id", user.id);
  const botIds = userBots?.map(b => b.id) || [];

  // Iniciar Query Base
  let query = supabase
    .from("leads")
    .select("*, bots(name)")
    .in("bot_id", botIds);

  // Aplicar Filtros Dinámicos
  if (botIdFilter && botIds.includes(botIdFilter)) {
    query = query.eq("bot_id", botIdFilter);
  }
  if (scoreFilter) {
    query = query.eq("score", scoreFilter);
  }
  if (intentFilter) {
    query = query.eq("intent", intentFilter);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, phone, botId, sessionId, 
      utm_source, utm_medium, utm_campaign, page_url,
      metadata = {} 
    } = body;

    if (!botId || !name) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([
        { 
          bot_id: botId, 
          session_id: sessionId,
          name, 
          email, 
          phone, 
          utm_source,
          utm_medium,
          utm_campaign,
          page_url,
          metadata 
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leadId: data[0].id });
  } catch (err: any) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
