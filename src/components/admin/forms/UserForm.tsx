"use client"

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { DataTable } from '@/components/DataTable'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'

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

  React.useEffect(() => {
    // Fetch users data from API
    fetch('/api/admin/users')
      .then(res => res.json())
      .then((data: User[]) => setData(data))
      .catch(() => toast({ title: 'Error fetching users', variant: 'destructive' }))
  }, [toast])

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

  const renderForm = (item: User | null, onSubmit: (item: User) => void) => {
    const [name, setName] = React.useState(item?.name || '')
    const [email, setEmail] = React.useState(item?.email || '')
    const [password, setPassword] = React.useState('')

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const user: User = {
        id: item?.id || '',
        name,
        email,
        password: password || item?.password || '',
        createdAt: item?.createdAt || new Date(),
      }
      onSubmit(user)
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
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            maxLength={255}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Ingrese un correo electrónico válido."
            className="input-class"
          />
        </label>
        {!item && (
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              maxLength={128}
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y un carácter especial (@, $, !, %, *, ?, &)."
              className="input-class"
            />
          </label>
        )}
        <button type="submit" className="button-class">Submit</button>
      </form>
    )
  }

  return (
    <AdminLayout>
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
    </AdminLayout>
  )
}