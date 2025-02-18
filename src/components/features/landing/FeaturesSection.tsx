import { motion } from "framer-motion"
import { FaMusic, FaHeadphones, FaMicrophone, FaUserFriends, FaChartLine, FaMobileAlt } from "react-icons/fa"

const features = [
  { icon: FaMusic, title: "Listas de Reproducción Curadas", description: "Descubre nueva música adaptada a tus gustos" },
  { icon: FaHeadphones, title: "Audio de Alta Calidad", description: "Experimenta la música con una calidad cristalina" },
  { icon: FaMicrophone, title: "Sesiones en Vivo", description: "Únete a sesiones de transmisión en vivo exclusivas" },
  { icon: FaUserFriends, title: "Escucha Social", description: "Comparte y disfruta música con amigos" },
  {
    icon: FaChartLine,
    title: "Recomendaciones Personalizadas",
    description: "Recibe sugerencias basadas en tus hábitos de escucha",
  },
  { icon: FaMobileAlt, title: "Modo Offline", description: "Descarga tus pistas favoritas para escuchar sin conexión" },
]

export default function FeaturesSection() {
  return (
    <section className="py-[20vh] px-4 bg-gradient-to-b from-[#492bad] to-blue-900">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">Características</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-[#fefefe] bg-opacity-10 rounded-lg p-6 text-center backdrop-filter backdrop-blur-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
          >
            <feature.icon className="text-5xl mb-4 mx-auto text-purple-400" />
            <h4 className="text-xl font-semibold mb-2 text-purple-200">{feature.title}</h4>
            <p className="text-purple-100">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

