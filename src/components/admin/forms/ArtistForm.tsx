"use client"

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'

interface Artist {
  id: string
  name: string
  bio?: string
  createdAt: Date
  userId: string
  // Add other fields as necessary
}

const columns = [
  { key: 'name' as keyof Artist, label: 'Name' },
  { key: 'bio' as keyof Artist, label: 'Bio' },
  { key: 'createdAt' as keyof Artist, label: 'Created At' },
  // Add more columns as desired
]

export default function ArtistsAdminPage() {
  const [data, setData] = React.useState<Artist[]>([])
  const { toast } = useToast()

  React.useEffect(() => {
    fetch('/api/admin/artists')
      .then(res => res.json())
      .then((data: Artist[]) => setData(data))
      .catch(() => toast({ title: 'Error fetching artists', variant: 'destructive' }))
  }, [toast])

  const handleCreate = async (newArtist: Artist) => {
    try {
      const res = await fetch('/api/admin/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArtist),
      })
      if (res.ok) {
        const createdArtist = await res.json()
        setData(prev => [...prev, createdArtist])
        toast({ title: 'Artist created successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to create artist')
      }
    } catch (error) {
      toast({ title: 'Error creating artist', variant: 'destructive' })
    }
  }

  const handleUpdate = async (id: string, updatedFields: Partial<Artist>) => {
    try {
      const res = await fetch(`/api/admin/artists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })
      if (res.ok) {
        setData(prev => prev.map(artist => artist.id === id ? { ...artist, ...updatedFields } : artist))
        toast({ title: 'Artist updated successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to update artist')
      }
    } catch (error) {
      toast({ title: 'Error updating artist', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/artists/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setData(prev => prev.filter(artist => artist.id !== id))
        toast({ title: 'Artist deleted successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to delete artist')
      }
    } catch (error) {
      toast({ title: 'Error deleting artist', variant: 'destructive' })
    }
  }

  const renderForm = (item: Artist | null, onSubmit: (item: Artist) => void) => {
    const [name, setName] = React.useState(item?.name || '')
    const [bio, setBio] = React.useState(item?.bio || '')
    const [userId, setUserId] = React.useState(item?.userId || '')

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const artist: Artist = {
        id: item?.id || '',
        name,
        bio,
        userId,
        createdAt: item?.createdAt || new Date(),
      }
      onSubmit(artist)
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
            maxLength={50}
            pattern="^[A-Za-zÀ-ÿ\s]{1,50}$"
            title="El nombre solo debe contener letras y espacios."
            className="input-class"
          />
        </label>
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
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
      <h1 className="text-2xl font-bold mb-4">Artists</h1>
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