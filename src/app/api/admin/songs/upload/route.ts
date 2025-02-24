import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    // Verificar que audioFile sea un objeto File
    if (!(audioFile instanceof File)) {
      return NextResponse.json({ error: 'No se proporcionó un archivo de audio válido' }, { status: 400 });
    }

    // Generar un nombre único para el archivo
    const fileName = `${uuidv4()}-${audioFile.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName); // Asegúrate de que esta carpeta exista
    console.log(filePath);
    // Guardar el archivo en el sistema de archivos
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    await fs.promises.writeFile(filePath, buffer);

    // Guardar la información del archivo en la base de datos
    const newSong = await prisma.song.create({
      data: {
        title: audioFile.name,
        filePath: filePath, 
        artistId: parseInt(formData.get('artistId') as string), 
        genre: formData.get('genre') as string, 
        duration: audioFile.size, 
        releaseDate: new Date(Date.now()), 
      },
    });

    return NextResponse.json(newSong);
  } catch (error) {
    console.error('Error al subir el archivo de audio:', error);
    return NextResponse.json({ error: 'Error al subir el archivo de audio' }, { status: 500 });
  }
}