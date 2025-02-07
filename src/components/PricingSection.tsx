import { motion } from "framer-motion"
import { FaCheck } from "react-icons/fa"
import { useState } from "react"

const plans = [
  {
    name: "Básico",
    price: "$4.99",
    features: ["Reproducción con anuncios", "Calidad de audio básica", "Saltos limitados"],
  },
  {
    name: "Premium",
    price: "$9.99",
    features: ["Reproducción sin anuncios", "Audio de alta calidad", "Saltos ilimitados", "Modo sin conexión"],
  },
  {
    name: "Familiar",
    price: "$14.99",
    features: ["Hasta 6 cuentas", "Reproducción sin anuncios", "Audio de alta calidad", "Control parental"],
  },
]

export default function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleLogin = () => {
    window.location.href = '/login'  // O usa router.push('/login') si estás usando Next.js
  }

  return (
    <section className="pt-[10vh] pb-[30vh] px-4 bg-gradient-to-b from-blue-900 to-purple-900">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">Elige tu Plan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-[#fefefe] bg-opacity-10 p-8 rounded-lg text-center relative overflow-hidden backdrop-filter backdrop-blur-lg"
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
              <span className="text-sm">/mes</span>
            </p>
            <ul className="text-left mb-6 min-h-[120px]">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center mb-2 text-purple-100">
                  <FaCheck className="text-green-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              onClick={handleLogin}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-white">Elegir Plan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

