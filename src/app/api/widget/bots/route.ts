import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const botId = searchParams.get("id");

    const supabase = await createClient();
    
    let query = supabase.from("bots").select("*").order("created_at", { ascending: false });
    
    if (botId) {
      query = query.eq("id", botId);
    }

    const { data, error } = await query.limit(1);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });
    }

    const bot = data[0];
    
    const publicBot = {
      id: bot.id,
      name: bot.name,
      description: bot.description,
      system_prompt: bot.system_prompt,
      knowledge_base: bot.knowledge_base,
      model: bot.model,
      temperature: bot.temperature
    };

    return NextResponse.json(publicBot);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
  }
}