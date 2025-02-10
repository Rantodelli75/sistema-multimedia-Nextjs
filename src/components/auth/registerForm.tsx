"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formVariants, glassStyle } from "./login-card"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { registerSchema } from "@/lib/zod"
import { emailRegex, passwordRegex } from "@/lib/regex"

interface RegisterFormProps {
  onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
  setIsLogin: (value: boolean) => void
  error?: string
  status?: number
  loading?: boolean
}

export function RegisterForm({ onRegisterSubmit, setIsLogin, loading, error, status }: RegisterFormProps) {
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registerErrors, setRegisterErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const { toast } = useToast()

  // Regex para validaciones

  useEffect(() => {
    if (error && status !== undefined) {
      status === 418 ? toast({
        variant: "destructive",
        title: "Alerta",
        description: error,
      }) : status === 200 ? toast({
        variant: "default",
        title: "Éxito",
        description: error,
      }) : toast({
        variant: "destructive",
        title: "Error",
        description: error,
      })
    }
  }, [error, status, toast])

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {}

    if (registerName.trim() === "") {
      errors.name = "El nombre es requerido."
    }

    if (!emailRegex.test(registerEmail)) {
      errors.email = "Correo electrónico inválido."
    }

    if (!passwordRegex.test(registerPassword)) {
      errors.password = "La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número."
    }

    if (registerPassword !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden."
    }

    setRegisterErrors(errors)

    if (Object.keys(errors).length === 0) {
      try {
        await onRegisterSubmit({
          name: registerName,
          email: registerEmail,
          password: registerPassword
        })
        // Solo cambiamos a login si no hay errores
        if (!error) {
          setIsLogin(true)
        }
      } catch (err) {
        console.error("Error en el registro:", err)
      }
    }
  }

  return (
    <motion.div
      key="register"
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute w-full"
    >
      <form onSubmit={handleRegisterSubmit} className={`${glassStyle} px-8 pt-6 pb-8 mb-4`}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
        <div className="mb-4 space-y-2">
          <Label htmlFor="register-name" className="text-white">
            Nombre
          </Label>
          <Input
            type="text"
            id="register-name"
            name="name"
            placeholder="Ingresa tu nombre"
            required
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl ${registerErrors.name ? 'border-red-500' : ''}`}
          />
          {registerErrors.name && <p className="text-red-500 text-sm">{registerErrors.name}</p>}
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="register-email" className="text-white">
            Email
          </Label>
          <Input
            type="email"
            id="register-email"
            name="email"
            placeholder="Ingresa tu email"
            required
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl ${registerErrors.email ? 'border-red-500' : ''}`}
          />
          {registerErrors.email && <p className="text-red-500 text-sm">{registerErrors.email}</p>}
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="register-password" className="text-white">
            Contraseña
          </Label>
          <Input
            type="password"
            id="register-password"
            name="password"
            placeholder="Ingresa tu contraseña"
            required
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl ${registerErrors.password ? 'border-red-500' : ''}`}
          />
          {registerErrors.password && <p className="text-red-500 text-sm">{registerErrors.password}</p>}
        </div>
        <div className="mb-6 space-y-2">
          <Label htmlFor="confirm-password" className="text-white">
            Confirmar contraseña
          </Label>
          <Input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirma tu contraseña"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl ${registerErrors.confirmPassword ? 'border-red-500' : ''}`}
          />
          {registerErrors.confirmPassword && <p className="text-red-500 text-sm">{registerErrors.confirmPassword}</p>}
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-xl" disabled={loading}>
            {loading ? "Cargando..." : "Registrarse"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsLogin(true)}
            className="border-white/30 text-black hover:text-white hover:bg-white/20 backdrop-blur-xl"
          >
            Volver al login
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
