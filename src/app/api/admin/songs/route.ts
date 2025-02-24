import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from 'auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const totalSongs = await prisma.song.count();
    const songs = await prisma.song.findMany({
      select: {
        id: true,
        title: true,
        duration: true,
        releaseDate: true,
        createdAt: true,
      }
    })

    // Convertir BigInt a String en el resultado
    const listSongs = songs.map(song => ({
      ...song,
      id: String(song.id), // Convertir BigInt a String
      createdAt: song.createdAt.toISOString(), // Formatear fecha
    }));

    return NextResponse.json({ 
      success: true,
      data: {
        totalSongs, 
        listSongs
      }
    });

  } catch (error) {
    console.error('Error al obtener canciones:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Error al obtener total de canciones',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}