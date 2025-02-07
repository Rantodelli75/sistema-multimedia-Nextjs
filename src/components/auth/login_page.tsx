import LoginForm from "./LoginForm"
import { loginSchema, registerSchema } from "@/lib/zod"
import { z } from "zod"

interface FormLoginProps {
    onLoginSubmit: (values: z.infer<typeof loginSchema>) => Promise<void>
    onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
    error: string
    loading: boolean
    isVerified: boolean
    status: number | null
}

export default function LoginPageComponent({ onLoginSubmit, onRegisterSubmit, error, loading, isVerified, status }: FormLoginProps) {
  return (
    <LoginForm 
      onLoginSubmit={onLoginSubmit}
      onRegisterSubmit={onRegisterSubmit}
      error={error}
      loading={loading}
      isVerified={isVerified}
      status={status}
    />
  )
}

