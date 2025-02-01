"use client"

import { motion } from "framer-motion"

export default function WaveAnimation() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      {/* Wave para pantallas pequeñas */}
      <motion.svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full xl:hidden"
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

      {/* Wave para pantallas grandes (>1500px) */}
      <motion.svg
        viewBox="0 0 2560 520"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full hidden xl:block"
        initial={{ y: 150 }}
        animate={{ y: 0 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration: 6,
          ease: "easeInOut",
        }}
      >
        <motion.path
          fill="#4F46E5"
          fillOpacity="1"
          initial={{
            d: "M0,128L120,144C240,160,480,192,720,186.7C960,181,1200,139,1440,138.7C1680,139,1920,181,2160,186.7C2400,192,2640,160,2760,144L2880,128L2880,520L2760,520C2640,520,2400,520,2160,520C1920,520,1680,520,1440,520C1200,520,960,520,720,520C480,520,240,520,120,520L0,520Z"
          }}
          animate={{
            d: "M0,192L120,170.7C240,149,480,107,720,101.3C960,96,1200,128,1440,154.7C1680,181,1920,203,2160,186.7C2400,171,2640,117,2760,90.7L2880,64L2880,520L2760,520C2640,520,2400,520,2160,520C1920,520,1680,520,1440,520C1200,520,960,520,720,520C480,520,240,520,120,520L0,520Z"
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 8,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  )
}

