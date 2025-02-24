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

interface Artist {
  id: string
  name: string
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
  const [audioFile, setAudioFile] = React.useState<File | null>(null)
  const [artists, setArtists] = React.useState<Artist[]>([])

  React.useEffect(() => {
    fetch('/api/admin/songs')
      .then((res) => res.json())
      .then((data: Song[]) => setData(data))
      .catch(() => toast({ title: 'Error fetching songs', variant: 'destructive' }))
  }, [toast])

  React.useEffect(() => {
    fetch('/api/admin/artists')
      .then(res => res.json())
      .then((data) => {
        setArtists(data.data.listArtists);
        console.log(data.data.listArtists)
      })
      .catch(() => toast({ title: 'Error fetching artists', variant: 'destructive' }))
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
      key: 'duration', 
      label: 'Duration (seconds)', 
      type: 'number',
      required: true 
    },
    { 
      key: 'filePath', 
      label: 'Audio File', 
      type: 'file',
      required: true,
      accept: 'audio/*' 
    }
  ]

  const { renderForm } = useRenderForm<Song>(songFields, handleCreate)

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