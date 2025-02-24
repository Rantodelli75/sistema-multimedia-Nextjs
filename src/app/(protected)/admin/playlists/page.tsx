"use client"

import React from 'react'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm'
import Link from 'next/link'

// Definición del tipo Playlist basado en el modelo Prisma
interface Playlist {
  id: string        // Convertido de BigInt a string para DataTable
  userId: string
  name: string
  description?: string
  createdAt: Date
}

const columns = [
  { key: 'name' as keyof Playlist, label: 'Name' },
  { key: 'description' as keyof Playlist, label: 'Description' },
  { key: 'createdAt' as keyof Playlist, label: 'Created At' },
  { 
    key: 'id' as keyof Playlist, 
    label: 'Actions',
    render: (playlist: Playlist) => (
      <Link href={`/admin/playlists/${playlist.id}`}>
        Manage Songs
      </Link>
    )
  }
]

export default function PlaylistsAdminPage() {
  const [data, setData] = React.useState<Playlist[]>([])
  const [users, setUsers] = React.useState<{ id: string, name?: string, email?: string }[]>([])
  const { toast } = useToast()

  React.useEffect(() => {
    fetch('/api/admin/playlists')
      .then(res => res.json())
      .then(data => setData(data.listPlaylists.map((playlist: any) => ({
        ...playlist,
        id: playlist.id.toString()
      }))))
      .catch(() => toast({ title: 'Error fetching playlists', variant: 'destructive' }))
  }, [toast])

  React.useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data.listUsers))
      .catch(() => toast({ title: 'Error fetching users', variant: 'destructive' }))
  }, [toast])

  const handleCreate = async (newPlaylist: Playlist & { songs?: string[] }) => {
    try {
      const { songs, ...playlistData } = newPlaylist
      const res = await fetch('/api/admin/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...playlistData, 
          id: undefined,
          songs: songs || [] 
        }),
      })
      if (res.ok) {
        const createdPlaylist = await res.json()
        setData(prev => [...prev, { ...createdPlaylist, id: createdPlaylist.id.toString() }])
        toast({ title: 'Playlist created successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to create playlist')
      }
    } catch (error) {
      toast({ title: 'Error creating playlist', variant: 'destructive' })
    }
  }

  const handleUpdate = async (id: string, updatedFields: Partial<Playlist>) => {
    try {
      const res = await fetch(`/api/admin/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })
      if (res.ok) {
        setData(prev => prev.map(playlist => 
          playlist.id === id ? { ...playlist, ...updatedFields } : playlist
        ))
        toast({ title: 'Playlist updated successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to update playlist')
      }
    } catch (error) {
      toast({ title: 'Error updating playlist', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/playlists/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setData(prev => prev.filter(playlist => playlist.id !== id))
        toast({ title: 'Playlist deleted successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to delete playlist')
      }
    } catch (error) {
      toast({ title: 'Error deleting playlist', variant: 'destructive' })
    }
  }

  const playlistFields: FieldDefinition<Playlist>[] = [
    { key: 'name', label: 'Name', placeholder: 'Enter playlist name', required: true, maxLength: 100 },
    { key: 'description', label: 'Description', placeholder: 'Enter description', required: false, maxLength: 500 },
    { 
      key: 'userId', 
      label: 'User', 
      type: 'select',
      required: true,
      options: (users || []).map(user => ({
        value: user.id,
        label: `${user.name || 'Unnamed'} (${user.email || 'No email'})`
      }))
    },
  ]

  const { renderForm } = useRenderForm<Playlist>(playlistFields, handleCreate)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Playlists</h1>
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
  )
}