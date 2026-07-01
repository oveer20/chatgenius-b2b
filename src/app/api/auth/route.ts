import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña requeridos' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Primero intentar sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || email.split('@')[0],
        },
      },
    });

    if (signUpError) {
      // Si ya existe el usuario, intentar login
      if (signUpError.message.includes('already') || signUpError.code === 'user_already_exists') {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          return NextResponse.json(
            { error: loginError.message },
            { status: 401 }
          );
        }

        return NextResponse.json({ 
          success: true, 
          user: loginData.user,
          message: 'Login exitoso - usuario existente'
        });
      }

      return NextResponse.json(
        { error: signUpError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      user: signUpData.user,
      message: 'Cuenta creada exitosamente'
    });

  } catch (error: unknown) {
    console.error('Auth error:', error);
    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}