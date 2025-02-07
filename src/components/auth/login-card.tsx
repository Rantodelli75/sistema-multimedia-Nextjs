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
}

export default function LoginCard({ onLoginSubmit, onRegisterSubmit, error, loading }: FormLoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const { toast } = useToast()

  // Show error toast when error prop changes
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      })
      console.log("error")
    }
  }, [error, toast])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
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
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              onLoginSubmit({
                email: formData.get('email') as string,
                password: formData.get('password') as string
              });
            }} className={`${glassStyle} px-8 pt-6 pb-8 mb-4`}>
              <h2 className="text-2xl font-bold mb-6 text-center text-white font-coolvetica">Login</h2>
              <div className="mb-4 space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60  backdrop-blur-xl rounded-xl"
                />
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60  backdrop-blur-xl rounded-xl"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit" className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-xl">
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsLogin(false)}
                  className="border-white/30 text-black hover:text-white hover:bg-white/20 backdrop-blur-xl"
                >
                  Register
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
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              console.log(formData)
              const userData = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string
              };
              onRegisterSubmit(userData);
              setIsLogin(true);
              toast({
                title: "Registrado con éxito",
                description: "Ahora puedes iniciar sesión para que se envie el correo de verificación",
              })
            }} className={`${glassStyle} px-8 pt-6 pb-8 mb-4`}>
              <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
              <div className="mb-4 space-y-2">
                <Label htmlFor="register-name" className="text-white">
                  Name
                </Label>
                <Input
                  type="text"
                  id="register-name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl"
                />
                <Label htmlFor="register-email" className="text-white">
                  Email
                </Label>
                <Input
                  type="email"
                  id="register-email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl"
                />
              </div>
              <div className="mb-4 space-y-2">
                <Label htmlFor="register-password" className="text-white">
                  Password
                </Label>
                <Input
                  type="password"
                  id="register-password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl"
                />
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="confirm-password" className="text-white">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit" className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-xl">
                  Register
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsLogin(true)}
                  className="border-white/30 text-black hover:text-white hover:bg-white/20 backdrop-blur-xl"
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
