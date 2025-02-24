import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    const likes = await prisma.songLike.findMany({
      where: { userId: userId },
      include: { song: true }, // Incluye información de la canción
    });

    return NextResponse.json(likes);
  } catch (error) {
    console.error('Error al obtener likes:', error);
    return NextResponse.json({ error: 'Error al obtener likes' }, { status: 500 });
  }
}