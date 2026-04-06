import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  const status = {
    supabase: false,
    openai: false,
    gemini: false,
    firebase: false,
    timestamp: new Date().toISOString()
  };

  try {
    // 1. Supabase Check
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    status.supabase = true;

    // 2. OpenAI Check
    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      // No mandamos chat real por costo, solo verificamos objeto
      status.openai = !!openai;
    }

    // 3. Gemini Check
    if (process.env.GOOGLE_GEMINI_API_KEY) {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
      status.gemini = !!genAI;
    }

    // 4. Firebase Check (Admin apps length)
    const admin = await import("firebase-admin");
    status.firebase = admin.apps.length > 0;

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json({ ...status, error: "Error en el sistema de autodiagnóstico" }, { status: 500 });
  }
}
