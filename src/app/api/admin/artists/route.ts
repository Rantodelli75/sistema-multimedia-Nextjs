import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from 'auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const totalArtists = await prisma.artist.count();
    return NextResponse.json({ totalArtists });
  } catch (error) {
    console.error('Error al obtener total de artistas:', error);
    return NextResponse.json({ error: 'Error al obtener total de artistas' }, { status: 500 });
  }
}