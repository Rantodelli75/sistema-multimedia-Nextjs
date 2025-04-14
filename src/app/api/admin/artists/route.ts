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

    const totalArtists = await prisma.artist.count();
    const artists = await prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        bio: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        songs: {
          select: {
            id: true,
            title: true,
          }
        },
        _count: {
          select: {
            songs: true,
            artistLikes: false,
          }
        }
      }
    });

    // Convertir BigInt a String en el resultado, incluyendo los IDs de las canciones
    const listArtists = artists.map(artist => ({
      ...artist,
      id: String(artist.id),
      songs: artist.songs.map(song => ({
        ...song,
        id: String(song.id)
      })),
      createdAt: artist.createdAt.toISOString(),
    }));

    return NextResponse.json({ 
      success: true,
      data: {
        totalArtists, 
        listArtists
      }
    });

  } catch (error) {
    console.error('Error al obtener artistas:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Error al obtener total de artistas',
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
    const { name, bio, userId } = body

    // Validar datos requeridos
    if (!name || !userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Nombre y userId son requeridos' 
      }, { status: 400 })
    }

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Usuario no encontrado' 
      }, { status: 404 })
    }

    // Crear el artista
    const newArtist = await prisma.artist.create({
      data: {
        name,
        bio,
        userId
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Convertir BigInt a String en la respuesta
    const serializedArtist = {
      ...newArtist,
      id: String(newArtist.id),
      userId: String(newArtist.userId),
      createdAt: newArtist.createdAt.toISOString()
    }

    return NextResponse.json({ 
      success: true, 
      data: serializedArtist 
    })

  } catch (error) {
    console.error('Error al crear artista:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error al crear artista',
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

    // Obtener el ID del artista de los parámetros de la URL
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID del artista requerido' 
      }, { status: 400 })
    }

    // Primero verificar si el artista existe
    const existingArtist = await prisma.artist.findUnique({
      where: { id }
    })

    if (!existingArtist) {
      return NextResponse.json({ 
        success: false, 
        error: 'Artista no encontrado' 
      }, { status: 404 })
    }

    // Eliminar el artista
    await prisma.artist.delete({
      where: { id }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Artista eliminado correctamente' 
    })

  } catch (error) {
    console.error('Error al eliminar artista:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error al eliminar artista',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
