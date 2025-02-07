'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useState, useTransition, useEffect } from 'react'
import LoginPageComponent from '@/components/auth/login_page'
import { loginSchema, registerSchema } from '@/lib/zod'
import { z } from 'zod'
import { authenticate, handleRegister } from 'actions/auth-action'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/auth/loading-spinner'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [session.status, router])

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
    setStatus(null)
    
    startTransition(async () => {
      try {
        const response = await handleRegister(values)
        setStatus(response.status)
        
        if (response.success) {
          router.push('/login')
          setError(response.message || 'Usuario registrado exitosamente')
          setStatus(200)
        } else {
          setError(response.message || 'Error durante el registro')
        }
      } catch (error) {
        setError('Error durante el registro')
        setStatus(500)
      }
    })
  }
  if (session.status === 'authenticated' || session.status === 'loading') {
    return <LoadingSpinner />
  } else {  
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
}
