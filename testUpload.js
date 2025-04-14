import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simula la función de guardar canción
const saveSong = async (filePath) => {
  try {
    const fileName = `${uuidv4()}.mp3`;
    const publicPath = `/music/${fileName}`;

    // Asegúrate de que el directorio existe
    const dir = path.join(__dirname, 'public', 'music');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Guardar archivo en public/music
    const destinationPath = path.join(dir, fileName);
    const fileBuffer = fs.readFileSync(filePath); // Lee el archivo desde la ruta proporcionada

    // Escribir archivo en el sistema de archivos
    fs.writeFileSync(destinationPath, fileBuffer);

    console.log(`Archivo guardado en: ${publicPath}`);
  } catch (error) {
    console.error('Error al guardar la canción:', error);
  }
};

// Cambia 'ruta/al/archivo.mp3' por la ruta real de tu archivo de audio
const audioFilePath = path.join('C:', 'Users', 'rdell', 'Desktop', 'DannyOceanxSechPriti.mp3');
saveSong(audioFilePath);