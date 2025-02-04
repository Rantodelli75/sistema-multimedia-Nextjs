import { motion } from "framer-motion"

export default function AnimatedSVG() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto mb-4">
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        stroke="#8B5CF6"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.path
        d="M50 30 L50 70 M30 50 L70 50"
        stroke="#8B5CF6"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
      />
    </svg>
  )
}

