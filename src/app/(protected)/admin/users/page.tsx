"use client"

import React from 'react'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import { useRenderForm, FieldDefinition } from '@/hooks/useRenderForm'

// Define User type based on Prisma model
interface User {
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
  password: string
  createdAt: Date
  // Add other fields as necessary
}

const columns = [
  { key: 'name' as keyof User, label: 'Name' },
  { key: 'email' as keyof User, label: 'Email' },
  { key: 'createdAt' as keyof User, label: 'Created At' },
  // Add more columns as desired
]

export default function UsersAdminPage() {
  const [data, setData] = React.useState<User[]>([])
  const { toast } = useToast()

  // Definición de campos para el formulario
  const userFields: FieldDefinition<User>[] = [
    { key: 'name', label: 'Name', placeholder: 'Enter name', required: true, maxLength: 50, pattern: '^[A-Za-zÀ-ÿ\\s]{1,50}$' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true, maxLength: 255 },
    // Nota: en este ejemplo se maneja la contraseña solo al crear
  ]

  const handleCreate = async (newUser: User) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (res.ok) {
        const createdUser = await res.json()
        setData(prev => [...prev, createdUser])
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
        setData(prev => prev.map(user => user.id === id ? { ...user, ...updatedFields } : user))
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
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setData(prev => prev.filter(user => user.id !== id))
        toast({ title: 'User deleted successfully', style: { backgroundColor: 'green', color: 'white' } })
      } else {
        throw new Error('Failed to delete user')
      }
    } catch (error) {
      toast({ title: 'Error deleting user', variant: 'destructive' })
    }
  }

  // Utilizamos el hook para obtener la función renderForm.
  const { renderForm } = useRenderForm<User>(userFields, handleCreate)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
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