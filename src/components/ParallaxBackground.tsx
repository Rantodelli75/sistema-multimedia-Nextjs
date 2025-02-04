import { motion } from "framer-motion"
import { useMemo } from "react"

export default function ParallaxBackground() {
  const particles = useMemo(
    () =>
      [...Array(50)].map((_, i) => ({
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
      })),
    [],
  )

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-30"
          style={{
            width: particle.size + "px",
            height: particle.size + "px",
            top: particle.y,
            left: particle.x,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </>
  )
}

