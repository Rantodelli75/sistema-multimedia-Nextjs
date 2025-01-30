"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaCheck } from "react-icons/fa"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  highlighted?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, highlighted = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border ${highlighted ? "border-[#f72585]" : "border-white/10"
        }`}
    >
      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? "text-[#f72585]" : "text-white"}`}>{title}</h3>
      <p className="text-4xl font-bold text-white mb-6">
        {price}
        <span className="text-lg font-normal">/month</span>
      </p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white/80">
            <FaCheck className="text-[#f72585] mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${highlighted ? "bg-[#f72585] hover:bg-[#f72585]/80 text-white" : "bg-white/10 hover:bg-white/20 text-white"
          }`}
      >
        Choose Plan
      </Button>
    </motion.div>
  )
}

export default PricingCard

