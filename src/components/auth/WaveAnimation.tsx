"use client"

import { motion } from "framer-motion"

export default function WaveAnimation() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <motion.svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration: 5,
          ease: "easeInOut",
        }}
      >
        <motion.path
          fill="#4F46E5"
          fillOpacity="1"
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,133.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>
    </div>
  )
}

