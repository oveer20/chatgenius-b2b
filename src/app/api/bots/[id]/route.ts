import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@/utils/supabase/server';

async function checkOwnership(botId: string): Promise<{ authorized: boolean; response?: NextResponse }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { authorized: false, response: NextResponse.json({ error: 'No autorizado' }, { status: 401 }) };

  const { data: bot } = await supabase.from('bots').select('user_id').eq('id', botId).single();
  if (!bot || bot.user_id !== user.id) return { authorized: false, response: NextResponse.json({ error: 'No autorizado o activo no encontrado' }, { status: 403 }) };

  return { authorized: true };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'ID de activo requerido' }, { status: 400 });

    const { authorized, response } = await checkOwnership(id);
    if (!authorized) return response;

    const { data, error } = await supabaseAdmin
      .from('bots')
      .select('id, name, description, system_prompt, knowledge_base, model, temperature, created_at, updated_at, email_alerts_to')
      .eq('id', id)
      .single();

    if (error || !data) return NextResponse.json({ error: 'Activo IA no encontrado' }, { status: 404 });
    return NextResponse.json({ success: true, bot: data });
  } catch (error) {
    console.error('/// CRITICAL GET ERROR ///', error);
    return NextResponse.json({ error: 'Fallo en la arquitectura de consulta' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { authorized, response } = await checkOwnership(id);
    if (!authorized) return response;

    const body = await request.json();
    const { name, description, system_prompt, knowledge_base, model, temperature } = body;

    const { data, error } = await supabaseAdmin
      .from('bots')
      .update({ name, description, system_prompt, knowledge_base, model, temperature, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: 'Fallo al actualizar el activo IA' }, { status: 500 });
    return NextResponse.json({ success: true, bot: data });
  } catch (error) {
    console.error('/// CRITICAL UPDATE ERROR ///', error);
    return NextResponse.json({ error: 'Fallo crítico al actualizar' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Se requiere ID' }, { status: 400 });

    const { authorized, response } = await checkOwnership(id);
    if (!authorized) return response;

    const { error } = await supabaseAdmin.from('bots').delete().eq('id', id);
    if (error) return NextResponse.json({ error: 'Fallo al eliminar el activo' }, { status: 500 });

    return NextResponse.json({ success: true, message: 'Activo IA desmantelado correctamente' });
  } catch (error) {
    console.error('/// CRITICAL DELETE ERROR ///', error);
    return NextResponse.json({ error: 'Fallo crítico' }, { status: 500 });
  }
}
