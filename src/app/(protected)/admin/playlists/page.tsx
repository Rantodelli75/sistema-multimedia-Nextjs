"use client"

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { DataTable } from '@/components/DataTable'
import { useToast } from '@/hooks/use-toast'

// Define Playlist type based on Prisma model
interface Playlist {
  id: string        // Convertimos BigInt a string para el DataTable
  userId: string
  name: string
  description?: string
  createdAt: Date
}

const columns = [
  { key: 'name' as keyof Playlist, label: 'Name' },
  { key: 'description' as keyof Playlist, label: 'Description' },
  { key: 'createdAt' as keyof Playlist, label: 'Created At' },
]

export default function PlaylistsAdminPage() {
  const [data, setData] = React.useState<Playlist[]>([])
  const { toast } = useToast()

  React.useEffect(() => {
    fetch('/api/admin/playlists')
      .then(res => res.json())
      .then((rawData) => {
        // Convertir BigInt id a string
        const formattedData = rawData.map((playlist: any) => ({
          ...playlist,
          id: playlist.id.toString()
        }))
        setData(formattedData)
      })
      .catch(() => toast({ title: 'Error fetching playlists', variant: 'destructive' }))
  }, [toast])

  const handleCreate = async (newPlaylist: Playlist) => {
    try {
      const res = await fetch('/api/admin/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPlaylist,
          id: undefined // Remove id for creation
        }),
      })
      if (res.ok) {
        const createdPlaylist = await res.json()
        setData(prev => [...prev, {
          ...createdPlaylist,
          id: createdPlaylist.id.toString()
        }])
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

  const renderForm = (item: Playlist | null, onSubmit: (item: Playlist) => void) => {
    const [name, setName] = React.useState(item?.name || '')
    const [description, setDescription] = React.useState(item?.description || '')
    const [userId, setUserId] = React.useState(item?.userId || '')

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const playlist: Playlist = {
        id: item?.id || '',
        userId,
        name,
        description,
        createdAt: item?.createdAt || new Date(),
      }
      onSubmit(playlist)
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            maxLength={100}
            className="input-class"
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={500}
            className="input-class"
          />
        </label>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
            className="input-class"
          />
        </label>
        <button type="submit" className="button-class">Submit</button>
      </form>
    )
  }

  return (
    <AdminLayout>
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
    </AdminLayout>
  )
}