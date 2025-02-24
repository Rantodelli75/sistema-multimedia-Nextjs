import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from 'auth';
import { hash } from 'bcrypt';

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const totalUsers = await prisma.user.count();
    const listUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        role: true,
      }
    });
    return NextResponse.json(
      {
        success: true,
        data: {
          totalUsers,
          listUsers
        }
      }
    );
  } catch (error) {
    console.error('Error al obtener total de usuarios:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Error al obtener total de usuarios',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, name, password, role = 'USER' } = body

    // Validar datos requeridos
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email y password son requeridos' 
      }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'El usuario ya existe' 
      }, { status: 400 })
    }

    // Hashear el password
    const hashedPassword = await hash(password, 10)

    // Crear el usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      }
    })

    // Omitir el password en la respuesta
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({ 
      success: true, 
      user: userWithoutPassword 
    })

  } catch (error) {
    console.error('Error al crear usuario:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error al crear usuario',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Obtener el ID del usuario de los parámetros de la URL
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID de usuario requerido' 
      }, { status: 400 })
    }

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

    // Evitar que un admin se elimine a sí mismo
    if (id === session.user.id) {
      return NextResponse.json({ 
        success: false, 
        error: 'No puedes eliminar tu propia cuenta' 
      }, { status: 400 })
    }

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Usuario eliminado correctamente' 
    })

  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error al eliminar usuario',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, name, email, role } = body
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error al actualizar usuario',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}