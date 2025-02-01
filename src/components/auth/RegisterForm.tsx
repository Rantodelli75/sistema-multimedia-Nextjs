'use client'

import { motion } from "framer-motion"
import { registerSchema } from "@/lib/zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface FormRegisterProps {
  onSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>
  error: string | null
  loading: boolean
}

export default function FormRegister({ onSubmit, error, loading }: FormRegisterProps) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-8 w-full max-w-sm md:w-96 bg-transparent mx-auto md:mx-0"
    >
      <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name
          </label>
          <input
            {...form.register("name")}
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-white placeholder-opacity-70"
            placeholder="Enter your name"
          />
          {form.formState.errors.name && (
            <span className="text-red-500 text-sm">{form.formState.errors.name.message}</span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            {...form.register("email")}
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-white placeholder-opacity-70"
            placeholder="Enter your email"
          />
          {form.formState.errors.email && (
            <span className="text-red-500 text-sm">{form.formState.errors.email.message}</span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            {...form.register("password")}
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-white placeholder-opacity-70"
            placeholder="Enter your password"
          />
          {form.formState.errors.password && (
            <span className="text-red-500 text-sm">{form.formState.errors.password.message}</span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </motion.div>
      </form>
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </motion.div>
  )
} 