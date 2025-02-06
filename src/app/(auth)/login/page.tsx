'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useState, useTransition } from 'react'
import { authenticate, handleRegister } from 'actions/auth-action'
import FormLogin from "@/components/form-login";
import LoginPageComponent from '@/components/auth/login_page';
import { loginSchema, registerSchema } from '@/lib/zod';
import { z } from 'zod';

export default function LoginPage() {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (loading) return;

    try {
      setLoading(true);
      setError('');
      
      const response = await authenticate(values);
      console.log('Respuesta de autenticación:', response); // Para debugging
      
      if (response.success) {
        router.replace(response.redirectUrl || '/dashboard');
      } else {
        setError(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error completo:', error);
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  const handleRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (isPending) return

    setError(null)
    startTransition(async () => {
      const response = await handleRegister(values)
      if (response.error) {
        setError(response.error)
      } else {
        router.push("/dashboard")
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
    />
  );
}
