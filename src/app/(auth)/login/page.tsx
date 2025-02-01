'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authenticate } from 'actions/auth-action'
import FormLogin from "@/components/form-login";
import LoginPageComponent from '@/components/auth/login_page';

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    if (loading) return

    try {
      setLoading(true)
      setError('')
      
      const response = await authenticate(formData)
      
      if (response.success) {
        router.replace('/dashboard')
      } else {
        setError(response.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      setError('Error al iniciar sesión')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPageComponent
      onSubmit={handleSubmit}
      error={error}
      loading={loading}   />
  );
}
