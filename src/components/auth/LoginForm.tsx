'use client'

import { motion } from "framer-motion"

interface FormLoginProps {
  onSubmit: (formData: FormData) => Promise<void>
  error: string
  loading: boolean
}

export default function FormLogin({ onSubmit , error, loading }: FormLoginProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-8 w-full max-w-sm md:w-96 bg-transparent mx-auto md:mx-0"
    >
      <h1 className="text-3xl font-bold text-white mb-6">Welcome Back</h1>
      <form action={onSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-white placeholder-opacity-70"
            placeholder="Enter your email"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-white placeholder-opacity-70"
            placeholder="Enter your password"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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
