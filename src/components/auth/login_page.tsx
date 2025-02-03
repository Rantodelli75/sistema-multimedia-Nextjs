import LoginForm from "./LoginForm"
import { registerSchema } from "@/lib/zod"
import { z } from "zod"

interface FormLoginProps {
    onLoginSubmit: (formData: FormData) => Promise<void>
    onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
    error: string
    loading: boolean
}

export default function LoginPageComponent({ onLoginSubmit, onRegisterSubmit, error, loading }: FormLoginProps) {
  return (
    <LoginForm 
      onLoginSubmit={onLoginSubmit}
      onRegisterSubmit={onRegisterSubmit}
      error={error}
      loading={loading}
    />
  )
}

