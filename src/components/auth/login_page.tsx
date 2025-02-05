import LoginForm from "./LoginForm"
import { registerSchema } from "@/lib/zod"
import { z } from "zod"

interface FormLoginProps {
    onLoginSubmit: (formData: FormData) => Promise<void>
    onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
    error: string
    loading: boolean
    isVerified: boolean
}

export default function LoginPageComponent({ onLoginSubmit, onRegisterSubmit, error, loading, isVerified }: FormLoginProps) {
  return (
    <LoginForm 
      onLoginSubmit={onLoginSubmit}
      onRegisterSubmit={onRegisterSubmit}
      error={error}
      loading={loading}
      isVerified={isVerified}
    />
  )
}

