import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, botId, sessionId, metadata = {} } = body;

    if (!botId || !name) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        { 
          bot_id: botId, 
          session_id: sessionId,
          name, 
          email, 
          phone, 
          metadata 
        }
      ])
      .select();

    if (error) {
      console.error('Error insertando lead:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leadId: data[0].id });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
