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

  // ... (tus useEffect para cargar datos permanecen igual)

  const handleCreate = async (newSongData: any) => {
    try {
      const formData = new FormData();
      formData.append('audio', newSongData.filePath); // Asegúrate de que el campo de archivo se llame 'audio'
      formData.append('title', newSongData.title);
      formData.append('genre', newSongData.genre);
      formData.append('artistId', newSongData.artistId);
      formData.append('releaseDate', newSongData.releaseDate);
  
      const res = await fetch('/api/admin/songs', {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        const createdSong = await res.json();
        setData((prev) => [...prev, createdSong]);
        toast({ title: 'Song created successfully', style: { backgroundColor: 'green', color: 'white' } });
      } else {
        throw new Error('Failed to create song in database');
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Error creating song', variant: 'destructive' });
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


