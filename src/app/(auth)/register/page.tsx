'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { handleRegister } from "actions/auth-action"
import { z } from "zod"
import { registerSchema } from "@/lib/zod"
import LoginPageComponent from '@/components/features/auth/login_page'
import RegisterForm from '@/components/auth/RegisterForm'
import VideoBackground from '@/components/auth/VideoBackground'
import CircularWaveAnimation from '@/components/auth/CircularWaveAnimation'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (isPending) return

    setError(null)
    startTransition(async () => {
      const response = await handleRegister(values)
      if (response.error) {
        setError(response.error)
      } else {
        router.push("/dashboard")
      }
    })
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center md:justify-start md:pl-[10vw] xl:pl-[15vw] 2xl:pl-[20vw] overflow-hidden bg-gray-100">
      <VideoBackground />
      <div className="relative z-10 w-full md:w-auto md:ml-16 xl:ml-24 2xl:ml-32 scale-100 xl:scale-110 2xl:scale-125">
        <CircularWaveAnimation>
          <RegisterForm 
            onSubmit={handleSubmit}
            error={error}
            loading={isPending}
          />
        </CircularWaveAnimation>
      </div>
    </main>
  )
}   

