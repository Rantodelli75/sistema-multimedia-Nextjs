"use client";

import React from 'react';
import { DataTable } from '@/components/common/DataTable'; // Asumo que DataTable maneja bien las fechas como string ISO
import { useToast } from '@/hooks/use-toast';
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm';
// Quita los imports de 'path' y 'fs' del frontend, no se usan/deben usar aquí
// import path from 'path';
// import fs from 'fs';
// El import de uuidv4 tampoco parece usarse directamente en este componente
// import { v4 as uuidv4 } from 'uuid';


interface Song {
  id: string; // Asegúrate que siempre sea string
  artistId: string; // Asegúrate que siempre sea string
  title: string;
  genre?: string;
  releaseDate?: string | Date; // Puede ser string (ISO) o Date, DataTable debe manejarlo
  duration?: number;
  filePath: string;
  createdAt: string | Date; // Puede ser string (ISO) o Date
}

interface Artist {
  id: string; // Asumo que el ID del artista también es string
  name: string;
}

// Ajusta las columnas si quieres formatear las fechas o mostrar el nombre del artista
const columns = [
  { key: 'title' as keyof Song, label: 'Title' },
  { key: 'genre' as keyof Song, label: 'Genre' },
  // { key: 'artistName' as keyof Song, label: 'Artist' }, // Si incluyes el nombre del artista desde la API
  { key: 'releaseDate' as keyof Song, label: 'Release Date' }, // DataTable debería poder mostrar la fecha
  { key: 'duration' as keyof Song, label: 'Duration' }, // Asegúrate que la API lo devuelva si lo necesitas
  { key: 'createdAt' as keyof Song, label: 'Created At' }, // DataTable debería poder mostrar la fecha
];

export default function SongsAdminPage() {
  const [data, setData] = React.useState<Song[]>([]);
  const { toast } = useToast();
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [isLoading, setIsLoading] = React.useState(true); // Estado para la carga inicial

  // --- useEffect para cargar Artistas (existente) ---
  React.useEffect(() => {
    fetch('/api/admin/artists') // Asegúrate que esta API devuelva IDs como strings si es necesario
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
        })
      .then(result => { // Cambiado 'data' a 'result' para evitar confusión con el estado 'data'
        if (result.success && result.data?.listArtists) {
           // Asegúrate que los IDs de los artistas sean strings si los usas como value en el select
           const formattedArtists = result.data.listArtists.map((artist: any) => ({
               ...artist,
               id: String(artist.id) // Convertir ID a string
           }));
          setArtists(formattedArtists);
        } else {
            throw new Error(result.error || 'Failed to parse artists');
        }
      })
      .catch((error) => toast({
        title: 'Error al cargar los artistas',
        description: error.message,
        variant: 'destructive'
      }));
  }, [toast]); // Dependencia correcta


  // --- NUEVO useEffect para cargar Canciones ---
  React.useEffect(() => {
    setIsLoading(true); // Iniciar carga
    // Asegúrate que la ruta API sea la correcta donde está tu función GET
    // Probablemente '/api/admin/songs' si sigue la convención, no '/upload'
    fetch('/api/admin/songs')
      .then(res => {
        if (!res.ok) {
          // Intenta obtener el mensaje de error del cuerpo si es posible
          return res.json().then(errData => {
            throw new Error(errData.error || `HTTP error! status: ${res.status}`);
          }).catch(() => {
            // Si no hay cuerpo JSON o falla al parsear, usa el status text
            throw new Error(`Failed to fetch songs. Status: ${res.status} ${res.statusText}`);
          });
        }
        return res.json();
      })
      .then(result => {
        // Accede a la lista de canciones dentro de la estructura 'data'
        if (result.success && result.data && Array.isArray(result.data.listSongs)) {
          // La API ya debería devolver los IDs como strings y las fechas como ISO strings.
          // Si DataTable necesita objetos Date, puedes mapear aquí, pero usualmente no es necesario.
          // Ejemplo si necesitaras parsear fechas (generalmente no requerido):
          // const songsWithDates = result.data.listSongs.map((song: any) => ({
          //   ...song,
          //   releaseDate: song.releaseDate ? new Date(song.releaseDate) : undefined,
          //   createdAt: new Date(song.createdAt),
          // }));
          // setData(songsWithDates);
          setData(result.data.listSongs); // Usar directamente si DataTable maneja ISO strings
        } else {
          throw new Error(result.error || 'Invalid data format received for songs');
        }
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        toast({
          title: 'Error al cargar las canciones',
          description: error.message,
          variant: 'destructive'
        });
        setData([]); // Resetea los datos en caso de error
      })
      .finally(() => {
        setIsLoading(false); // Terminar carga, ocurra error o no
      });
  }, [toast]); // Dependencia: toast

  // --- Handler para Crear Canción (existente, revisa consistencia) ---
  const handleCreate = async (newSongData: any) => {
    try {
        const formData = new FormData();

        // Asegúrate que el ID del artista sea string (ya lo haces)
        const artistId = String(newSongData.artistId);

        if (!(newSongData.filePath instanceof File)) {
            throw new Error("Debes seleccionar un archivo de audio");
        }

        formData.append('audio', newSongData.filePath);
        formData.append('title', newSongData.title || '');
        formData.append('genre', newSongData.genre || '');
        formData.append('artistId', artistId);
        // Enviar fecha como ISO string es correcto
        formData.append('releaseDate', newSongData.releaseDate ? new Date(newSongData.releaseDate).toISOString() : new Date().toISOString());

        // La ruta para POST es '/api/admin/songs/upload' según tu código original
        const res = await fetch('/api/admin/songs/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            // Intenta obtener el mensaje de error del backend
            let errorMsg = `Error al subir la canción (Status: ${res.status})`;
            try {
                const errorData = await res.json(); // Intenta parsear como JSON
                errorMsg = errorData.error || errorData.message || JSON.stringify(errorData);
            } catch (e) {
                errorMsg = await res.text(); // Si no es JSON, toma el texto
            }
            throw new Error(errorMsg);
        }

        const result = await res.json();

        // La API POST devuelve { success: true, data: { ...newSong } }
        if (result.success && result.data) {
            // La API ya devuelve los IDs como strings, así que la doble conversión es redundante
            // const sanitizedSong = {
            //   ...result.data,
            //   id: String(result.data.id), // La API ya lo hace
            //   artistId: String(result.data.artistId) // La API ya lo hace
            // };
            // Asegúrate que el objeto `result.data` coincida con la interfaz Song
            setData(prev => [...prev, result.data]); // Añade el objeto directamente
            toast({ title: 'Canción subida exitosamente', style: { backgroundColor: 'green', color: 'white' } });
        } else {
            throw new Error(result.error || 'Respuesta inválida del servidor tras subir la canción');
        }

    } catch (error) {
        console.error('Error en handleCreate:', error);
        toast({
            title: error instanceof Error ? error.message : 'Error al crear la canción',
            variant: 'destructive'
        });
    }
};

  // --- Handlers para Update y Delete (existentes) ---
  // Asegúrate que las rutas API para PUT y DELETE sean correctas
  // Por ejemplo: `/api/admin/songs/${id}`
  const handleUpdate = async (id: string, updatedFields: Partial<Song>) => {
    try {
      // Asume que la ruta es /api/admin/songs/[id] para PUT
      const res = await fetch(`/api/admin/songs/${id}`, { // Verifica esta ruta
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })
      if (res.ok) {
          // Opcional: obtener la canción actualizada de la respuesta si la API la devuelve
          const updatedSongFromServer = await res.json();
          if (updatedSongFromServer.success && updatedSongFromServer.data) {
                setData((prev) =>
                    prev.map((song) => (song.id === id ? { ...song, ...updatedSongFromServer.data } : song))
                );
          } else {
              // Actualización optimista si la API no devuelve la canción actualizada
              setData((prev) =>
                prev.map((song) => (song.id === id ? { ...song, ...updatedFields } : song))
              );
          }
        toast({ title: 'Song updated successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update song')
      }
    } catch (error) {
       console.error("Error updating song:", error);
      toast({ title: 'Error updating song', description: error instanceof Error ? error.message : '', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
       // Asume que la ruta es /api/admin/songs/[id] para DELETE
      const res = await fetch(`/api/admin/songs/${id}`, { method: 'DELETE' }) // Verifica esta ruta
      if (res.ok) {
        setData((prev) => prev.filter((song) => song.id !== id)) // Quita el toString() si id ya es string
        toast({ title: 'Song deleted successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete song')
      }
    } catch (error) {
        console.error("Error deleting song:", error);
      toast({ title: 'Error deleting song', description: error instanceof Error ? error.message : '', variant: 'destructive' })
    }
  }

  // --- Definición de Campos del Formulario (existente) ---
  // Asegúrate que los values de artistId en options sean strings
  const songFields: FieldDefinition<Song>[] = [
    { key: 'title', label: 'Title', required: true, maxLength: 100 },
    { key: 'genre', label: 'Genre', required: false },
    {
      key: 'artistId',
      label: 'Artist',
      type: 'select',
      required: true,
      options: artists.map(artist => ({
        value: String(artist.id), // Asegurar que el value es string
        label: artist.name || 'Unnamed Artist'
      }))
    },
    { key: 'releaseDate', label: 'Release Date', type: 'date' },
    { key: 'filePath', label: 'Audio File', type: 'file', required: true, accept: 'audio/mpeg, audio/mp3' }
  ];

  // --- Hook para renderizar el formulario (existente) ---
  const { renderForm } = useRenderForm<Song>(songFields, handleCreate);

  // --- Renderizado del Componente ---
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Songs Management</h1>
      {/* Mostrar estado de carga */}
      {isLoading ? (
        <p>Cargando canciones...</p>
      ) : (
        <DataTable
          data={data}
          columns={columns}
          onCreate={handleCreate} // Pasa la función handleCreate
          onUpdate={handleUpdate} // Pasa la función handleUpdate
          onDelete={handleDelete} // Pasa la función handleDelete
          renderForm={renderForm} // Pasa la función para renderizar el form
          itemsPerPage={10}
          // Asegúrate que DataTable tenga props para pasar estas funciones y renderForm
        />
      )}
    </div>
  );
}