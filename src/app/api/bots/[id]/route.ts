import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: 'Bot ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('bots')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting bot:', error);
      return NextResponse.json({ error: 'Failed to delete bot' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Bot deleted successfully' });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
