"use client"

import React from 'react'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm'
import { useParams } from 'next/navigation'

interface PlaylistSong {
  id: string
  title: string
  artist: string
}

interface Song {
  id: string
  title: string
  artist: string
}

const columns= [
  { key: 'id' as keyof PlaylistSong, label: 'ID' },
  { key: 'title' as keyof PlaylistSong, label: 'Title' },
  { key: 'artist' as keyof PlaylistSong, label: 'Artist' },
]

export default function PlaylistSongsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [playlistSongs, setPlaylistSongs] = React.useState<PlaylistSong[]>([])
  const [availableSongs, setAvailableSongs] = React.useState<Song[]>([])
  const playlistId = params.id

  React.useEffect(() => {
    Promise.all([
      fetch(`/api/admin/playlists/${playlistId}/songs`).then(res => res.json()),
      fetch('/api/admin/songs').then(res => res.json())
    ]).then(([playlistData, songsData]) => {
      setPlaylistSongs(playlistData.songs)
      setAvailableSongs(songsData.listSongs.map((song: any) => ({
        ...song,
        id: song.id.toString()
      })))
    }).catch(() => {
      toast({ title: 'Error fetching data', variant: 'destructive' })
    })
  }, [playlistId, toast])

  const handleCreate = async (newSong: { id: string }) => {
    try {
      const res = await fetch(`/api/admin/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: newSong.id }),
      })
      if (res.ok) {
        const addedSong = await res.json()
        setPlaylistSongs(prev => [...prev, addedSong])
        toast({ title: 'Song added to playlist', style: { backgroundColor: 'green', color: 'white' } })
      }
    } catch (error) {
      toast({ title: 'Error adding song', variant: 'destructive' })
    }
  }

  const handleDelete = async (songId: string) => {
    try {
      const res = await fetch(`/api/admin/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setPlaylistSongs(prev => prev.filter(song => song.id !== songId))
        toast({ title: 'Song removed from playlist', style: { backgroundColor: 'green', color: 'white' } })
      }
    } catch (error) {
      toast({ title: 'Error removing song', variant: 'destructive' })
    }
  }

  const songFields: FieldDefinition<{ id: string }>[] = [
    {
      key: 'id',
      label: 'Song',
      type: 'select',
      required: true,
      options: (availableSongs || []).map(song => ({
        value: song.id,
        label: `${song.title} - ${song.artist}`
      }))
    }
  ]

  const { renderForm } = useRenderForm<{ id: string }>(songFields, handleCreate)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Playlist Songs</h1>
      <DataTable
        data={playlistSongs}
        columns={columns}
        itemsPerPage={10}
        onCreate={handleCreate}
        onDelete={handleDelete}
        renderForm={renderForm}
      />
    </div>
  )
}
