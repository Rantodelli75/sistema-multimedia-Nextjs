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
      className={`bg-nightgroove-black-alpha-5 backdrop-blur-lg rounded-2xl p-6 border ${
        highlighted ? "border-nightgroove-primary" : "border-nightgroove-black-alpha-10"
      }`}
    >
      <h3 className={`text-2xl font-bold mb-2 ${
        highlighted ? "text-nightgroove-primary" : "text-black"
      }`}>{title}</h3>
      <p className="text-4xl font-bold text-black mb-6">
        {price}
        <span className="text-lg font-normal">/month</span>
      </p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-nightgroove-white-alpha-60">
            <FaCheck className="text-nightgroove-primary mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${
          highlighted 
            ? "bg-nightgroove-primary hover:bg-nightgroove-primary/80 text-white" 
            : "bg-nightgroove-black-alpha-10 hover:bg-nightgroove-black-alpha-20 text-black"
        }`}
      >
        Choose Plan
      </Button>
    </motion.div>
  )
}

export default PricingCard

