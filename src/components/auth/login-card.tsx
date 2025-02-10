"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./registerForm"
import { FormLoginProps } from "./types"

export const formVariants = {
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

export const glassStyle = "bg-white/10 backdrop-blur-[2px] drop-shadow-2xl rounded-2xl border-[1px] border-white/20 border-r-white/10 border-b-white/10"

export default function LoginCard({ onLoginSubmit, onRegisterSubmit, error, loading, status }: FormLoginProps) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className={`relative w-full ${isLogin ? '-top-40' : '-top-60'}`}>
      <AnimatePresence mode="wait">
        {isLogin ? (
          <LoginForm 
            onLoginSubmit={onLoginSubmit}
            setIsLogin={setIsLogin}
            error={error}
            status={status || undefined}
            loading={loading}
          />
        ) : (
          <RegisterForm
           
            onRegisterSubmit={onRegisterSubmit}
            setIsLogin={setIsLogin}
            error={error}
            status={status || undefined}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
