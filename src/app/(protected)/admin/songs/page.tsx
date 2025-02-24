"use client"

import React from 'react'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm'

interface Song {
  id: string
  artistId: string
  title: string
  genre?: string
  releaseDate?: Date
  duration?: number
  filePath: string
  createdAt: Date
}

const columns = [
  { key: 'title' as keyof Song, label: 'Title' },
  { key: 'genre' as keyof Song, label: 'Genre' },
  { key: 'releaseDate' as keyof Song, label: 'Release Date' },
  { key: 'duration' as keyof Song, label: 'Duration' },
  { key: 'createdAt' as keyof Song, label: 'Created At' },
]

export default function SongsAdminPage() {
  const [data, setData] = React.useState<Song[]>([])
  const { toast } = useToast()
  const [title, setTitle] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [artistId, setArtistId] = React.useState('');
  const [releaseDate, setReleaseDate] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [filePath, setFilePath] = React.useState('');
  const [audioFile, setAudioFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    fetch('/api/admin/songs')
      .then((res) => res.json())
      .then((data: Song[]) => setData(data))
      .catch(() => toast({ title: 'Error fetching songs', variant: 'destructive' }))
  }, [toast])

  const handleCreate = async (newSong: Song) => {
    try {
      const res = await fetch('/api/admin/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSong),
      })
      if (res.ok) {
        const createdSong = await res.json()
        setData((prev) => [...prev, createdSong])
        toast({ title: 'Song created successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to create song')
      }
    } catch (error) {
      toast({ title: 'Error creating song', variant: 'destructive' })
    }
  }

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

  const renderForm = (item: Song | null, onSubmit: (item: Song) => void) => {
    const [title, setTitle] = React.useState(item?.title || '')
    const [genre, setGenre] = React.useState(item?.genre || '')
    const [artistId, setArtistId] = React.useState(item?.artistId?.toString() || '')
    const [releaseDate, setReleaseDate] = React.useState(
      item?.releaseDate ? new Date(item.releaseDate).toISOString().split('T')[0] : ''
    )
    const [duration, setDuration] = React.useState(item?.duration?.toString() || '')
    const [filePath, setFilePath] = React.useState(item?.filePath || '')

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const newSong = {
        title,
        genre,
        artistId: parseInt(artistId),
        releaseDate: new Date(releaseDate),
        duration: parseInt(duration),
        audioFile, // Enviar el archivo de audio
      };
  
      try {
        const formData = new FormData();
        formData.append('audio', audioFile!); // Asegúrate de que audioFile no sea null
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('artistId', artistId);
        formData.append('releaseDate', releaseDate);
        formData.append('duration', duration);
  
        const response = await fetch('/api/admin/songs/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const createdSong = await response.json();
          setData(prev => [...prev, createdSong]);
          toast({ title: 'Canción creada exitosamente', style: { backgroundColor: 'green', color: 'white' } });
        } else {
          throw new Error('Error al crear la canción');
        }
      } catch (error) {
        toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
      }
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAudioFile(file);
      }
    };

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Registrar Nueva Canción</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              maxLength={100}
              className="input-class"
            />
          </label>
            <label>
              Genre:
              <input
                type="text"
                value={genre}
                onChange={e => setGenre(e.target.value)}
                className="input-class"
              />
            </label>
            <label>
              Artist ID:
              <input
                type="number"
                value={artistId}
                onChange={e => setArtistId(e.target.value)}
                required
                className="input-class"
              />
            </label>
            <label>
              Release Date:
              <input
                type="date"
                value={releaseDate}
                onChange={e => setReleaseDate(e.target.value)}
                className="input-class"
              />
            </label>
            <label>
              Duration (seconds):
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                min="0"
                className="input-class"
              />
            </label>
            <label>
              File Path:
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                required
                className="input-class"
              />
            </label>
            <button type="submit" className="button-class">Submit</button>
          </form>
        </div>
    )
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Songs Management</h1>
      <DataTable
        data={data.map((song) => ({ ...song, id: song.id.toString() }))}
        columns={columns}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        renderForm={renderForm}
        itemsPerPage={10}
      />
    </div>
  )
}