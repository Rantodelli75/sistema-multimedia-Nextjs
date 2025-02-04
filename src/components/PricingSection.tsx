import { motion } from "framer-motion"
import { FaCheck } from "react-icons/fa"
import { useState } from "react"

const plans = [
  {
    name: "Basic",
    price: "$4.99",
    features: ["Ad-supported listening", "Basic audio quality", "Limited skips"],
  },
  {
    name: "Premium",
    price: "$9.99",
    features: ["Ad-free listening", "High-quality audio", "Unlimited skips", "Offline mode"],
  },
  {
    name: "Family",
    price: "$14.99",
    features: ["Up to 6 accounts", "Ad-free listening", "High-quality audio", "Parental controls"],
  },
]

export default function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="pt-[10vh] pb-[30vh] px-4 bg-gradient-to-b from-blue-900 to-purple-900">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">Choose Your Plan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-purple-800 bg-opacity-50 p-8 rounded-lg text-center relative overflow-hidden backdrop-filter backdrop-blur-lg"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              className="absolute inset-0 bg-purple-600 opacity-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0.2 : 0 }}
            />
            <h4 className="text-2xl font-semibold mb-4 text-purple-200">{plan.name}</h4>
            <p className="text-4xl font-bold mb-6 text-purple-300">
              {plan.price}
              <span className="text-sm">/month</span>
            </p>
            <ul className="text-left mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center mb-2 text-purple-100">
                  <FaCheck className="text-green-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Choose Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

