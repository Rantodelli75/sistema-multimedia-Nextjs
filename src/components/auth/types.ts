import { z } from "zod"
import { loginSchema, registerSchema } from "@/lib/zod"

export interface FormLoginProps {
  onLoginSubmit: (values: z.infer<typeof loginSchema>) => Promise<void>
  onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
  error: string
  loading: boolean
  status: number | null
}

export interface PasswordInputProps {
  id: string
  name: string
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  placeholder: string
}