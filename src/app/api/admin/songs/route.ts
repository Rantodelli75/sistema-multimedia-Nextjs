import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from 'auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    console.log('Session:', session); // Log de la sesión

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalSongs = await prisma.song.count();
    console.log('Total Songs Count:', totalSongs); // Log del total de canciones

    const songs = await prisma.song.findMany({
      select: {
        id: true,
        title: true,
        duration: true,
        releaseDate: true,
        createdAt: true,
      }
    });
    console.log('Songs from Database:', songs); // Log de las canciones obtenidas de la base de datos

    // Convertir BigInt a String en el resultado
    const listSongs = songs.map(song => ({
      ...song,
      id: String(song.id), // Convertir BigInt a String
      createdAt: song.createdAt.toISOString(), // Formatear fecha
    }));
    console.log('Formatted Songs List:', listSongs); // Log de la lista de canciones formateadas

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