'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useState, useTransition } from 'react'
import LoginPageComponent from '@/components/auth/login_page'
import { loginSchema, registerSchema } from '@/lib/zod'
import { z } from 'zod'
import { authenticate, handleRegister } from 'actions/auth-action'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (loading) return

    try {
      setLoading(true)
      setError('')
      setStatus(null)

      const response = await authenticate(values)
      setStatus(response.status !== undefined ? response.status : null)
      if (response.success) {
        router.replace('/dashboard')
      } else {
        setError(response.message || 'Error durante el inicio de sesión')
      }
    } catch (error) {
      console.error('Error de autenticación:', error)
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (isPending) return

    setError(null)
    startTransition(async () => {
      const response = await handleRegister(values)
      if (response.success) {
        router.push('/login')
        setError(response.message || 'Usuario registrado exitosamente')
      } else {
        setError(response.message || 'Error durante el registro')
      }
    })
  }

  return (
    <LoginPageComponent
      onLoginSubmit={handleLoginSubmit}
      onRegisterSubmit={handleRegisterSubmit}
      error={error || ''}
      loading={loading}
      isVerified={isVerified}
      status={status}
    />
  )
}
