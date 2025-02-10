'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import LoginCard from "./login-card"
import SpinningRecord from "./spinning-record"
import ParticlesBg from "./particles-background"
import { loginSchema, registerSchema } from "@/lib/zod"
import { z } from "zod"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"

interface FormLoginProps {
  onLoginSubmit: (values: z.infer<typeof loginSchema>) => Promise<void>
  onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
  error: string
  loading: boolean
  isVerified: boolean
  status: number | null
}

export default function LoginPage({ onLoginSubmit, onRegisterSubmit, error, loading, isVerified, status  }: FormLoginProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [showLoginComponent, setShowLoginComponent] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (showLogin) {
      const timer = setTimeout(() => {
        setShowLoginComponent(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [showLogin])
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBg />
      </div>

      <AnimatePresence>
        {showLoginComponent && (
          <motion.div
            initial={{ opacity: -0.5, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md relative mb-24 z-10"
          >
            <LoginCard onLoginSubmit={onLoginSubmit} onRegisterSubmit={onRegisterSubmit} error={error} loading={loading} status={status}/>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ width: "50vw", height: "50vh", bottom: "50%", left: "50%" }}
        animate={showLogin ? {
          width: ["50vh", "150vh", "150vh"],
          height: ["50vh", "150vh", "150vh"],
          bottom: ["50%", "-200vh", "-120vh"],
          left: ["50%", "50%", "50%"]
        } : {}}
        transition={{ 
          duration: 2,
          times: [0, 0.6, 1],
          ease: "easeInOut"
        }}
        className="absolute -translate-x-1/2 pointer-events-none z-10"
      >
        <SpinningRecord showLogin={showLogin} />
      </motion.div>
      {isVerified && (
        <AlertDialog defaultOpen>
          <AlertDialogContent className="bg-white/10 backdrop-blur-[2px] drop-shadow-2xl rounded-2xl border-[1px] border-white/20 border-r-white/10 border-b-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Your account is verified</AlertDialogTitle>
              <AlertDialogDescription className="text-white/80">
                Your account is verified. You can now login.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-xl">
                Understood
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </main>
  )
}
