"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, registerSchema } from "@/lib/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import React from "react"

interface FormLoginProps {
  onLoginSubmit: (values: z.infer<typeof loginSchema>) => Promise<void>
  onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
  error: string
  loading: boolean
  status: number | null
}

export default function LoginCard({ onLoginSubmit, onRegisterSubmit, error, loading, status }: FormLoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const { toast } = useToast()

  // Estados para el formulario de login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({})

  // Estados para el formulario de registro
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registerErrors, setRegisterErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({})

  // Regex para validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  // Mostrar error toast cuando cambia el error prop
  useEffect(() => {
    if (error) {
      if (status !== undefined) {
        status === 418 ? toast({
          variant: "destructive",
          title: "Alerta",
          description: error,
        }) : status === 200 ? toast({
          variant: "default",
          title: "Exito",
          description: error,
        }) : toast({
          variant: "destructive",
          title: "Error",
          description: error,
        })
        console.log("error")
      }
    }
  }, [error, toast, status])

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
      const userData = {
        name: registerName,
        email: registerEmail,
        password: registerPassword
      }
      await onRegisterSubmit(userData)
      setIsLogin(true)
    }
  }

  const glassStyle = "bg-white/10 backdrop-blur-[2px] drop-shadow-2xl rounded-2xl border-[1px] border-white/20 border-r-white/10 border-b-white/10"

  const formVariants = {
    initial: {
      y: "100vh",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className={`relative w-full ${isLogin ? '-top-40' : '-top-60'}`}>
      <AnimatePresence mode="wait">
        {isLogin ? (
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
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingresa tu email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60  backdrop-blur-xl rounded-xl ${loginErrors.email ? 'border-red-500' : ''}`}
                />
                {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email}</p>}
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="password" className="text-white">
                  Contraseña
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60  backdrop-blur-xl rounded-xl ${loginErrors.password ? 'border-red-500' : ''}`}
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
        ) : (
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
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl ${registerErrors.name ? 'border-red-500' : ''}`}
                />
                {registerErrors.name && <p className="text-red-500 text-sm">{registerErrors.name}</p>}
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
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl ${registerErrors.email ? 'border-red-500' : ''}`}
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
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl ${registerErrors.password ? 'border-red-500' : ''}`}
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
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl ${registerErrors.confirmPassword ? 'border-red-500' : ''}`}
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
        )}
      </AnimatePresence>
    </div>
  )
}
