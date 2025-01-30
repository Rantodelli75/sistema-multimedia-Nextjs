"use client"
import { motion } from "framer-motion"
import { FaQuoteLeft } from "react-icons/fa"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
    >
      <FaQuoteLeft className="text-[#f72585] text-3xl mb-4" />
      <p className="text-white/80 mb-4">{content}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-[#f72585] rounded-full mr-4"></div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-white/60 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard

