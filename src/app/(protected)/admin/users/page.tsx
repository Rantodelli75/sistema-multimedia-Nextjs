"use client"
import React from 'react'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm'
import { Role } from '@prisma/client'

// Define User type based on Prisma model
interface User {
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
  password: string
  createdAt: Date
  role: Role
  // Add other fields as necessary
}
const columns = [
  { key: 'id' as keyof User, label: 'ID' },
  { key: 'name' as keyof User, label: 'Name' },
  { key: 'email' as keyof User, label: 'Email' },
  { key: 'createdAt' as keyof User, label: 'Created At' },
  { key: 'emailVerified' as keyof User, label: 'Email Verified' },
  { key: 'role' as keyof User, label: 'Role' },
  // Add more columns as desired
]

export default function UsersAdminPage() {
  const [data, setData] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const { toast } = useToast()

  // Agregar función para obtener usuarios
  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/users')
      if (!response.ok) {
        throw new Error('Error al obtener usuarios')
      }
      const result = await response.json()
      setData(result.data.listUsers)
    } catch (error) {
      toast({ 
        title: 'Error al cargar usuarios', 
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Agregar useEffect para cargar datos al montar el componente
  React.useEffect(() => {
    fetchUsers()

  }, [])

  // Separar campos para crear y editar
  const createUserFields: FieldDefinition<User>[] = [
    { key: 'name', label: 'Name', placeholder: 'Enter name', required: true, maxLength: 50, pattern: '^[A-Za-zÀ-ÿ\\s]{1,50}$' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true, maxLength: 255 },
    { key: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true, maxLength: 255 },
    { key: 'role', label: 'Role', type: 'select', options: ['ADMIN', 'USER'], required: true },
  ]

  const editUserFields: FieldDefinition<User>[] = columns.map(column => ({
    key: column.key,
    label: column.label,
    type: column.key === 'role' ? 'select' : 
          column.key === 'email' ? 'email' : 
          column.key === 'emailVerified' || column.key === 'createdAt' ? 'datetime-local' : 
          'text',
    options: column.key === 'role' ? ['ADMIN', 'USER', 'ARTIST'] : undefined,
    required: ['name', 'email', 'role'].includes(String(column.key)),
  }))

  const handleCreate = async (newUser: User) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (res.ok) {
        fetchUsers()
        toast({ title: 'User created successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to create user')
      }
    } catch (error) {
      toast({ title: 'Error creating user', variant: 'destructive' })
    }
  }

  const handleUpdate = async (id: string, updatedFields: Partial<User>) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })
      if (res.ok) {
        fetchUsers()
        toast({ title: 'User updated successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to update user')
      }
    } catch (error) {
      toast({ title: 'Error updating user', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { 
        method: 'DELETE'
      })
      
      if (res.ok) {
        await fetchUsers() // Recargar la lista después de eliminar
        toast({ 
          title: 'Usuario eliminado correctamente', 
          style: { backgroundColor: 'green', color: 'white' } 
        })
      } else {
        const error = await res.json()
        throw new Error(error.error || 'Error al eliminar usuario')
      }
    } catch (error) {
      toast({ 
        title: error instanceof Error ? error.message : 'Error al eliminar usuario', 
        variant: 'destructive' 
      })
    }
  }

  // Modificar la función renderForm para usar diferentes campos según el modo
  const renderForm = (item: User | null, onSubmit: (data: User) => void) => {
    const fields = item ? editUserFields : createUserFields
    const { renderForm } = useRenderForm<User>(fields, handleCreate)
    return renderForm(item, onSubmit)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {isLoading ? (
        <div>Cargando usuarios...</div>
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