import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

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

    return NextResponse.json({
      success: true,
      data: newSong
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