"use client"

import React from 'react'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm'

interface Artist {
  id: string
  name: string
  bio?: string
  createdAt: string
  userId: string
  user: {
    name?: string
    email?: string
  }
  _count: {
    songs: number
    artistLikes: number
  }
}

const columns = [
  { key: 'id' as keyof Artist, label: 'ID' },
  { key: 'name' as keyof Artist, label: 'Nombre' },
  { key: 'bio' as keyof Artist, label: 'Biografía' },
  { 
    key: 'createdAt' as keyof Artist, 
    label: 'Fecha de Creación',
    render: (artist: Artist) => new Date(artist.createdAt).toLocaleDateString()
  },
  { 
    key: 'user' as keyof Artist, 
    label: 'Usuario',
    render: (artist: Artist) => artist.user?.name || artist.user?.email || 'N/A'
  },
  {
    key: '_count' as keyof Artist,
    label: 'Canciones',
    render: (artist: Artist) => artist._count.songs
  }
]

const artistFields: FieldDefinition<Artist>[] = [
  { 
    key: 'name' as keyof Artist, 
    label: 'Nombre', 
    placeholder: 'Nombre del artista', 
    required: true 
  },
  { 
    key: 'bio' as keyof Artist, 
    label: 'Biografía', 
    placeholder: 'Biografía del artista',
    type: 'textarea'
  },
  { 
    key: 'userId' as keyof Artist, 
    label: 'Usuario', 
    placeholder: 'Seleccione un usuario',
    type: 'select',
    required: true
  }
]

export default function ArtistsAdminPage() {
  const [data, setData] = React.useState<Artist[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const { toast } = useToast()

  const handleCreate = async (newArtist: Partial<Artist>) => {
    try {
      const res = await fetch('/api/admin/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArtist),
      })
      
      if (!res.ok) {
        throw new Error('Error al crear artista')
      }

      await fetchArtists()
      toast({ 
        title: 'Artista creado correctamente',
        style: { backgroundColor: 'green', color: 'white' }
      })
    } catch (error) {
      toast({ 
        title: 'Error al crear artista',
        variant: 'destructive'
      })
    }
  }

  const handleUpdate = async (id: string, updatedFields: Partial<Artist>) => {
    try {
      const res = await fetch(`/api/admin/artists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })

      if (!res.ok) {
        throw new Error('Error al actualizar artista')
      }

      await fetchArtists()
      toast({ 
        title: 'Artista actualizado correctamente',
        style: { backgroundColor: 'green', color: 'white' }
      })
    } catch (error) {
      toast({ 
        title: 'Error al actualizar artista',
        variant: 'destructive'
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/artists?id=${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        throw new Error('Error al eliminar artista')
      }

      await fetchArtists()
      toast({ 
        title: 'Artista eliminado correctamente',
        style: { backgroundColor: 'green', color: 'white' }
      })
    } catch (error) {
      toast({ 
        title: 'Error al eliminar artista',
        variant: 'destructive'
      })
    }
  }

  const fetchArtists = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/admin/artists')
      
      if (!response.ok) {
        throw new Error('Error al obtener artistas')
      }

      const result = await response.json()
      if (result.success) {
        setData(result.data.listArtists)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido')
      toast({ 
        title: 'Error al cargar artistas',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchArtists()
  }, [])

  const renderForm = (item: Artist | null, onSubmit: (data: Artist) => void) => {
    const fields = [
      { 
        key: 'name', 
        label: 'Nombre', 
        placeholder: 'Nombre del artista', 
        required: true,
        value: item?.name 
      },
      { 
        key: 'bio', 
        label: 'Biografía', 
        placeholder: 'Biografía del artista',
        type: 'textarea',
        value: item?.bio
      },
      { 
        key: 'createdAt', 
        label: 'Fecha de Creación',
        readOnly: true,
        render: (value: any) => value ? new Date(value).toLocaleDateString() : 'N/A'
      },
      {
        key: 'user',
        label: 'Usuario',
        readOnly: true,
        render: (value: any) => value?.name || value?.email || 'N/A'
      }
    ]
    const { renderForm } = useRenderForm<Artist>(
      item ? fields as FieldDefinition<Artist>[] : artistFields, 
      item ? (data) => onSubmit(data) : handleCreate
    )
    
    return renderForm(item, onSubmit)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Artistas</h1>
      
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Cargando artistas...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && (
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