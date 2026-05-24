import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { event, properties } = await req.json();
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    let userId: string | null = null;

    if (authHeader) {
      const { data: { user } } = await supabaseAdmin.auth.getUser(authHeader);
      userId = user?.id || null;
    }

    await supabaseAdmin.from("analytics_events").insert([{
      user_id: userId,
      event,
      properties: properties || {},
      created_at: new Date().toISOString(),
    }]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
