import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { botId, name, email, whatsapp } = await request.json();

    if (!botId) {
      return NextResponse.json({ error: "botId is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([
        { 
          bot_id: botId, 
          name, 
          email, 
          whatsapp 
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, lead: data[0] });
  } catch (error: any) {
    console.error("/// LEAD API ERROR ///");
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
