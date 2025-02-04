'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import LoginCard from "./login-card"
import SpinningRecord from "./spinning-record"
import ParticlesBg from "./particles-background"
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
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBg />
      </div>

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
