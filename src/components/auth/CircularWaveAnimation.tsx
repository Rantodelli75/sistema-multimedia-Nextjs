"use client"

import type React from "react"
import { motion } from "framer-motion"

interface CircularWaveAnimationProps {
  children: React.ReactNode
}

export default function CircularWaveAnimation({ children }: CircularWaveAnimationProps) {
  const waves = [1, 2, 3, 4, 5]

  return (
    <div className="relative">
      {waves.map((wave) => (
        <motion.div
          key={wave}
          className="absolute rounded-full border-2 border-white"
          style={{
            width: `${80 + wave * 15}%`,
            height: `${80 + wave * 15}%`,
            top: "-10%",
            left: "-10%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2],
            borderRadius: ["50%", "48%", "52%", "50%"],
          }}
          transition={{
            duration: 6 + wave,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: wave * 0.2,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

