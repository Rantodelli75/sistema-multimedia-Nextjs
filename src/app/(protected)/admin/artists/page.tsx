"use client"

import React from 'react'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm'

interface Artist {
  id: string
  name: string
  bio?: string
  createdAt: Date
  userId: string
  // Add other fields as necessary
}

const columns = [
  { key: 'name' as keyof Artist, label: 'Nombre de Artísta' },
  { key: 'bio' as keyof Artist, label: 'Biografía' },
  { key: 'createdAt' as keyof Artist, label: 'Fecha de Creación' },
  // Add more columns as desired
]

export default function ArtistsAdminPage() {
  const [data, setData] = React.useState<Artist[]>([])
  const [users, setUsers] = React.useState<{ id: string, name?: string, email?: string }[]>([])
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchArtists = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/artists')
      if (response.ok) {
        const result = await response.json()
        setData(result.listArtists)
      } else {
        throw new Error('Error al obtener artistas')
      }
    } catch (error) {
      toast({ 
        title: 'Error al cargar artistas', 
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetch('/api/admin/artists')
      .then(res => res.json())
      .then((data: Artist[]) => setData(data))
      .catch(() => toast({ title: 'Error fetching artists', variant: 'destructive' }))
  }, [toast])

  React.useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then((data) => setUsers(data.listUsers))
      .catch(() => toast({ title: 'Error fetching users', variant: 'destructive' }))
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

  const artistFields: FieldDefinition<Artist>[] = [
    { key: 'name', label: 'Name', placeholder: 'Enter name', required: true, maxLength: 50, pattern: '^[A-Za-zÀ-ÿ\\s]{1,50}$' },
    { key: 'bio', label: 'Bio', placeholder: 'Enter bio', required: false, maxLength: 500 },
    { 
      key: 'userId', 
      label: 'User', 
      type: 'select',
      required: true,
      options: users.map(user => ({
        value: user.id,
        label: `${user.name || 'Unnamed'} (${user.email || 'No email'})`
      }))
    },
  ]

  const { renderForm } = useRenderForm<Artist>(artistFields, handleCreate)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Artists</h1>
      {isLoading ? (
        <div>Cargando artistas...</div>
      ) : (
        <DataTable
          data={data}
          columns={columns}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        renderForm={renderForm}
          itemsPerPage={10}
        />
      )}
    </div>
  )
}