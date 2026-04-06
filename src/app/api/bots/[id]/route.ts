import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * STRATIX INTELLIGENCE — BOT ENTITY API (V11.5)
 * Gestión estratégica de Activos de IA Individuales.
 */

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID de activo requerido' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('bots')
      .select('id, name, description, model, temperature, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Activo IA no encontrado o inaccesible' }, { status: 404 });
    }

    return NextResponse.json({ success: true, bot: data });
  } catch (error) {
    console.error('/// CRITICAL GET ERROR ///', error);
    return NextResponse.json({ error: 'Fallo en la arquitectura de consulta' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Se requiere ID para eliminación estratégica' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('bots')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('/// ERROR DELETING BOT ///', error);
      return NextResponse.json({ error: 'Fallo al eliminar el activo de la infraestructura' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Activo IA desmantelado correctamente' });
  } catch (error) {
    console.error('/// CRITICAL DELETE ERROR ///', error);
    return NextResponse.json({ error: 'Fallo crítico en el motor de desmantelamiento' }, { status: 500 });
  }
}
