"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function SpinningRecord({ showLogin }: { showLogin: boolean }) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [isLoginAnimationComplete, setIsLoginAnimationComplete] = useState(true)

  useEffect(() => {
    if (showLogin) {
      const timer2 = setTimeout(() => {
        setIsLoginAnimationComplete(false)
      }, 1500)
      return () => clearTimeout(timer2)
    }
  }, [showLogin])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true)
    }, 2000) // Ajusta este valor para controlar cuándo comienza la animación de giro

    
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.5, y: "-50vh" }}
      animate={isAnimationComplete ? { scale: 1, y: 0 } : { scale: 2, y: 0 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        scale: { duration: 1 },
        y: { duration: 1.5, ease: "easeInOut" },
      }}
      className="w-full h-full"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-2xl"
        animate={isAnimationComplete ? { rotate: 360 } : { rotate: 0 }}
        transition={isAnimationComplete ? { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
      >
        <defs>
          <radialGradient id="recordGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="70%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#recordGradient)" />
        <circle cx="50" cy="50" r={isLoginAnimationComplete ? "20" : "35"} fill="#ffffff" opacity="0.8" />
        <circle cx="50" cy="50" r="5" fill="#1a1a1a" />
        <g opacity="0.7">
          <path d="M50 10 A40 40 0 0 1 90 50" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M50 10 A40 40 0 0 0 10 50" fill="none" stroke="#ffffff" strokeWidth="0.5" />
        </g>
      </motion.svg>
    </motion.div>
  )
}

