'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import LoginCard from "./login-card"
import SpinningRecord from "./spinning-record"
import { registerSchema } from "@/lib/zod"
import { z } from "zod"

interface FormLoginProps {
  onLoginSubmit: (formData: FormData) => Promise<void>
  onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
  error: string
  loading: boolean
}

export default function FormLogin({ onLoginSubmit, onRegisterSubmit, error, loading }: FormLoginProps) {
 const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true)
    }, 3500) // Ajusta este valor para controlar cuándo aparece el formulario de login

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-nightgroove-tertiary to-nightgroove-secondary p-4 relative overflow-hidden">
      {/* Decorative circles for background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-800/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md relative mb-24 z-10"
          >
            <LoginCard onLoginSubmit={onLoginSubmit} onRegisterSubmit={onRegisterSubmit} error={error} loading={loading}/>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ width: "50vw", height: "50vh", bottom: "50%", left: "50%" }}
        animate={showLogin ? { width: "150vw", height: "150vh", bottom: "-120vh", left: "50%" } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute -translate-x-1/2 pointer-events-none z-10"
      >
          <SpinningRecord />
      </motion.div>
    </main>
  )
}
