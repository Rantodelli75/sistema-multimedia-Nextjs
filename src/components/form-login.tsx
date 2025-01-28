'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authenticate } from '../../actions/auth-action'

export default function FormLogin() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true)
      setError('')
      
      const response = await authenticate(formData)
      
      if (response.success) {
        // Redirigir al usuario si el login fue exitoso
        router.push('/dashboard') // o la ruta que desees
        router.refresh() // Actualizar el estado de la sesión
      } else {
        setError(response.message)
      }
    } catch (error) {
      setError('Error al iniciar sesión')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit}>
      {/* Tus campos de formulario */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        required
      />
      
      <button 
        type="submit"
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </form>
  )
}