"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerSchema } from "@/lib/zod"
import { z } from "zod"

interface FormLoginProps {
  onLoginSubmit: (formData: FormData) => Promise<void>
  onRegisterSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
  error: string
  loading: boolean
}

export default function LoginCard({ onLoginSubmit, onRegisterSubmit, error, loading }: FormLoginProps) {
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  const glassStyle = "bg-white/30 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl"

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
    <div className="relative w-full -top-40">
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
              onLoginSubmit(formData);
            }} className={`${glassStyle} px-8 pt-6 pb-8 mb-4`}>
              <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
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
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl"
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
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50 backdrop-blur-xl"
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-red-500 text-sm mt-2"
                >
                  <div className="flex items-center gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {error}
                  </div>
                </motion.div>
              )}
              <div className="flex items-center justify-between">
                <Button type="submit" className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-xl">
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsLogin(false)}
                  className="border-white/30 text-white hover:bg-white/20 backdrop-blur-xl"
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
                  className="border-white/30 text-white hover:bg-white/20 backdrop-blur-xl"
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
