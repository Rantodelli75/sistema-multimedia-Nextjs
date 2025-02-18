"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function LoadingSpinner({ shouldReturn }: { shouldReturn?: boolean }) {
 
    const router = useRouter()
    useEffect(() => {
    if (shouldReturn) {
        router.replace('/login')
    }
 }, [shouldReturn, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#282828]">
      <motion.div
        className="h-16 w-16 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-purple-300 border-l-purple-300"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}
