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
    options: [], // Se llenará dinámicamente
    required: true
  }
]

export default function ArtistsAdminPage() {
  const [data, setData] = React.useState<Artist[]>([])
  const [users, setUsers] = React.useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const { toast } = useToast()

  const handleCreate = async (newArtist: Partial<Artist>) => {
    console.log("Creating artist:", newArtist)
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

  const fetchArtists = React.useCallback(async () => {
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
  }, [toast])

  const fetchUsers = React.useCallback(async () => {
    console.log('Fetching users...');
    try {
      const response = await fetch('/api/admin/users');

      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }

      const result = await response.json();
      console.log('API response for users:', result);
      if (result.success) {
        setUsers(result.data.listUsers);
      } else {
        throw new Error(result.error);
      }
    } catch {
      toast({ 
        title: 'Error al cargar usuarios',
        variant: 'destructive',
      });
    }
  }, [toast]);

  React.useEffect(() => {
    fetchArtists()
    fetchUsers()
  }, [fetchArtists, fetchUsers])
  console.log('Users:', users)

  const renderForm = (item: Artist | null, onSubmit: (data: Artist) => void) => {
    console.log('Estado de usuarios antes de renderizar el formulario:', users);
    const fields: FieldDefinition<Artist>[] = [
      { 
        key: 'name', 
        label: 'Nombre', 
        placeholder: 'Nombre del artista', 
        required: true
      },
      { 
        key: 'bio', 
        label: 'Biografía', 
        placeholder: 'Biografía del artista',
        type: 'textarea'
      },
      { 
        key: 'userId', 
        label: 'Usuario', 
        placeholder: 'Seleccione un usuario',
        type: 'select',
        options: users.map(user => ({ value: user.id, label: user.name })),
        required: true
      }
    ];

    const { renderForm } = useRenderForm<Artist>(fields, (data) => {
      console.log('Submitting new artist:', data);
      onSubmit(data);
    });
    return renderForm(item, onSubmit);
  };

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Cargando usuarios...</span>
      </div>
    );
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
          userList={users}
        />
      )}
    </div>
  )
}