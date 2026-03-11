import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin for backend operations (using secret key if available)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function GET(request: NextRequest) {
  const { data, error } = await supabase.from("bots").select("*").order("updated_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await supabase.from("bots").insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;
  const { data, error } = await supabase.from("bots").update(updates).eq("id", id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
