"use client";

import React from 'react';
import { DataTable } from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

interface Song {
  id: string;
  artistId: string;
  title: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number;
  filePath: string;
  createdAt: Date;
}

interface Artist {
  id: string;
  name: string;
}

const columns = [
  { key: 'title' as keyof Song, label: 'Title' },
  { key: 'genre' as keyof Song, label: 'Genre' },
  { key: 'releaseDate' as keyof Song, label: 'Release Date' },
  { key: 'duration' as keyof Song, label: 'Duration' },
  { key: 'createdAt' as keyof Song, label: 'Created At' },
];

export default function SongsAdminPage() {
  const [data, setData] = React.useState<Song[]>([]);
  const { toast } = useToast();
  const [artists, setArtists] = React.useState<Artist[]>([]);

  React.useEffect(() => {
    fetch('/api/admin/artists')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.listArtists) {
          setArtists(data.data.listArtists);
        }
      })
      .catch(() => toast({ 
        title: 'Error al cargar los artistas', 
        variant: 'destructive' 
      }));
  }, [toast]);

  const handleCreate = async (newSongData: any) => {
    try {
      const formData = new FormData();
  
      // Asegúrate de que artistId y otros campos no sean BigInt
      const artistId = typeof newSongData.artistId === 'bigint' ? newSongData.artistId.toString() : newSongData.artistId;
  
      formData.append('audio', newSongData.filePath);
      formData.append('title', newSongData.title || '');
      formData.append('genre', newSongData.genre || '');
      formData.append('artistId', artistId || '');
      formData.append('releaseDate', newSongData.releaseDate ? new Date(newSongData.releaseDate).toISOString() : new Date().toISOString());
  
      const res = await fetch('/api/admin/songs/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      });
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
        throw new Error(errorData.error || 'Error al subir la canción');
      }
  
      const result = await res.json();
  
      if (result.success) {
        setData(prev => [...prev, result.data]);
        toast({
          title: 'Canción subida exitosamente',
          style: { backgroundColor: 'green', color: 'white' }
        });
      } else {
        throw new Error(result.error || 'Error al procesar la respuesta del servidor');
      }
  
    } catch (error) {
      console.error('Error en handleCreate:', error);
      toast({
        title: error instanceof Error ? error.message : 'Error al crear la canción',
        variant: 'destructive'
      });
    }
  };

  const handleUpdate = async (id: string, updatedFields: Partial<Song>) => {
    try {
      const res = await fetch(`/api/admin/songs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })
      if (res.ok) {
        setData((prev) =>
          prev.map((song) => (song.id.toString() === id ? { ...song, ...updatedFields } : song))
        )
        toast({ title: 'Song updated successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to update song')
      }
    } catch (error) {
      toast({ title: 'Error updating song', variant: 'destructive' })
    }
  }
  
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/songs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setData((prev) => prev.filter((song) => song.id.toString() !== id))
        toast({ title: 'Song deleted successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to delete song')
      }
    } catch (error) {
      toast({ title: 'Error deleting song', variant: 'destructive' })
    }
  }

  const songFields: FieldDefinition<Song>[] = [
    { 
      key: 'title', 
      label: 'Title', 
      required: true, 
      maxLength: 100 
    },
    { 
      key: 'genre', 
      label: 'Genre', 
      required: false 
    },
    { 
      key: 'artistId', 
      label: 'Artist', 
      type: 'select',
      required: true,
      options: artists.map(artist => ({
        value: artist.id,
        label: artist.name || 'Unnamed Artist'
      }))
    },
    { 
      key: 'releaseDate', 
      label: 'Release Date', 
      type: 'date' 
    },
    { 
      key: 'filePath', 
      label: 'Audio File', 
      type: 'file',
      required: true,
      accept: 'audio/mpeg, audio/mp3' 
    }
  ];

  const { renderForm } = useRenderForm<Song>(songFields, handleCreate);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Songs Management</h1>
      <DataTable
        data={data}
        columns={columns}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        renderForm={renderForm}
        itemsPerPage={10}
      />
    </div>
  );
}


