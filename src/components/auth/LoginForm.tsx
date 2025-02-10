import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formVariants, glassStyle } from "./login-card"
import { emailRegex, passwordRegex } from "@/lib/regex"

interface LoginFormProps {
  onLoginSubmit: (values: { email: string; password: string }) => Promise<void>
  setIsLogin: (value: boolean) => void
  error?: string
  status?: number
  loading?: boolean
}

export function LoginForm({ onLoginSubmit, setIsLogin, loading }: LoginFormProps) {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({})

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors: { email?: string; password?: string } = {}

    if (!emailRegex.test(loginEmail)) {
      errors.email = "Correo electrónico inválido."
    }

    if (!passwordRegex.test(loginPassword)) {
      errors.password = "La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número."
    }

    setLoginErrors(errors)

    if (Object.keys(errors).length === 0) {
      await onLoginSubmit({
        email: loginEmail,
        password: loginPassword
      })
    }
  }

  return (
    <motion.div
      key="login"
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute w-full"
    >
      <form onSubmit={handleLoginSubmit} className={`${glassStyle} px-8 pt-6 pb-8 mb-4`}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white font-coolvetica">Login</h2>
        <div className="mb-4 space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl ${loginErrors.email ? 'border-red-500' : ''}`}
          />
          {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email}</p>}
        </div>
        <div className="mb-6 space-y-2">
          <Label htmlFor="password" className="text-white">Contraseña</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl ${loginErrors.password ? 'border-red-500' : ''}`}
          />
          {loginErrors.password && <p className="text-red-500 text-sm">{loginErrors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-xl" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsLogin(false)}
            className="border-white/30 text-black hover:text-white hover:bg-white/20 backdrop-blur-xl"
          >
            Registrarse
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
