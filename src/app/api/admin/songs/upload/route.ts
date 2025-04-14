import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!(audioFile instanceof File)) {
      return NextResponse.json(
        { error: 'No se proporcionó un archivo de audio válido' }, 
        { status: 400 }
      );
    }

    // Validar el tipo de archivo
    if (!audioFile.type.startsWith('audio/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser un archivo de audio' }, 
        { status: 400 }
      );
    }

    // Crear la carpeta si no existe
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generar nombre único
    const fileName = `${uuidv4()}-${audioFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Guardar el archivo
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    await fs.promises.writeFile(filePath, buffer);

    // Crear entrada en la base de datos
    const newSong = await prisma.song.create({
      data: {
        title: formData.get('title') as string,
        filePath: `/uploads/${fileName}`,
        artistId: parseInt(formData.get('artistId') as string),
        genre: formData.get('genre') as string,
        releaseDate: new Date(formData.get('releaseDate') as string),
        duration: 0, // Aquí podrías agregar lógica para obtener la duración real del archivo
      },
    });

    return NextResponse.json(newSong);
  } catch (error) {
    console.error('Error al subir el archivo de audio:', error);
    return NextResponse.json(
      { error: 'Error al subir el archivo de audio' }, 
      { status: 500 }
    );
  }
}