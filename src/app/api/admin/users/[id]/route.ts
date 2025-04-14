import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from 'auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = params.id
    const body = await request.json()
    
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Usuario no encontrado' 
      }, { status: 404 })
    }

    // Actualizar el usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data: body,
    })

    return NextResponse.json({ 
      success: true, 
      user: updatedUser 
    })

  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error al actualizar usuario',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}