import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { auth } from 'auth';

// Configuración para manejar archivos grandes
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '11mb',
  },
}

export async function POST(request: NextRequest) {
  try {
    // Aumentar el tiempo de espera para archivos grandes
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!(audioFile instanceof File)) {
      return NextResponse.json(
        { error: 'No se proporcionó un archivo de audio válido' }, 
        { status: 400 }
      );
    }

    // Validar tamaño del archivo (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (audioFile.size > maxSize) {
      return NextResponse.json({ 
        error: 'El archivo excede el tamaño máximo permitido de 10MB' 
      }, { status: 400 });
    }

    // Validar el tipo de archivo
    if (!audioFile.type.startsWith('audio/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser un archivo de audio' }, 
        { status: 400 }
      );
    }

    // Crear la carpeta music si no existe
    const uploadDir = path.join(process.cwd(), 'public/music');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generar nombre único
    const fileName = `${uuidv4()}-${audioFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    try {
      // Guardar el archivo en chunks para manejar archivos grandes
      const chunks = [];
      const reader = audioFile.stream().getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      
      const buffer = Buffer.concat(chunks);
      await fs.promises.writeFile(filePath, buffer);
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      return NextResponse.json(
        { error: 'Error al guardar el archivo de audio' },
        { status: 500 }
      );
    }

    // Crear entrada en la base de datos
    const newSong = await prisma.song.create({
      data: {
        title: formData.get('title') as string,
        filePath: `/music/${fileName}`,
        artistId: parseInt(formData.get('artistId') as string),
        genre: formData.get('genre') as string || '',
        releaseDate: new Date(formData.get('releaseDate') as string || new Date()),
        duration: 0,
      },
    });

    // Convertir campos que pueden ser BigInt a String
    return NextResponse.json({
      success: true,
      data: {
        ...newSong,
        id: newSong.id.toString(), // Convertir id a string
        artistId: newSong.artistId.toString(), // Convertir artistId a string
        // Si hay otros campos que puedan ser BigInt, conviértelos también
      }
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Error al procesar la solicitud',
        details: error instanceof Error ? error.message : 'Error desconocido'
      }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    // console.log('Session:', session); // Puedes comentar/eliminar logs en producción

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalSongs = await prisma.song.count();
    // console.log('Total Songs Count:', totalSongs);

    const songs = await prisma.song.findMany({
      select: { // <--- SELECCIONAR TODOS LOS CAMPOS NECESARIOS
        id: true,
        title: true,
        genre: true,        // Añadido
        releaseDate: true,
        duration: true,
        filePath: true,     // Añadido
        createdAt: true,
        artistId: true      // Añadido
        // Si quisieras el nombre del artista directamente:
        // artist: { select: { name: true } } // (requiere ajustar el map y la interfaz Song)
      },
      orderBy: {
        createdAt: 'desc' // Opcional: mantener un orden consistente
      }
    });
    // console.log('Songs from Database:', songs);

    // Convertir BigInt a String y formatear fechas en el resultado
    const listSongs = songs.map(song => ({
      ...song,
      id: String(song.id),                // Convertir id a string
      artistId: String(song.artistId),    // Convertir artistId a string (IMPORTANTE)
      createdAt: song.createdAt.toISOString(), // Formatear fecha createdAt
      // Opcional: Formatear releaseDate si es necesario o prefieres ISO string
      // releaseDate: song.releaseDate ? song.releaseDate.toISOString() : null,
    }));
    // console.log('Formatted Songs List:', listSongs);

    // Devolver la estructura anidada
    return NextResponse.json({
      success: true,
      data: {
        totalSongs,
        listSongs // El array de canciones está aquí
      }
    });

  } catch (error) {
    console.error('Error al obtener canciones:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al obtener canciones', // Mensaje más específico
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}