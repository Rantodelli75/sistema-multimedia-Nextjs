import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from 'auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const totalUsers = await prisma.user.count();
    const listUsers = await prisma.user.findMany();
    return NextResponse.json({ totalUsers, listUsers });
  } catch (error) {
    console.error('Error al obtener total de usuarios:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Error al obtener total de usuarios',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}