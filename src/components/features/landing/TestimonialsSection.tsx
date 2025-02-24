import { motion } from "framer-motion"
import { useState } from "react"
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const testimonios = [
  {
    name: "Dwayne Jhonson",
    text: "Nightgrovve ha transformado completamente mi experiencia de escuchar música por la noche. ¡Las listas de reproducción seleccionadas son perfectas!",
  },
  {
    name: "Rafael Dellicarpini",
    text: "Me encantan las funciones sociales. Compartir música con amigos nunca ha sido tan fácil o divertido.",
  },
  { name: "Nicolasito", text: "La calidad del sonido es inigualable. Es como estar en un concierto privado todas las noches." },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonios.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonios.length) % testimonios.length)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-900 to-blue-900">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">Lo Que Dicen Nuestros Usuarios</h3>
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-[#fefefe] bg-opacity-10 p-8 rounded-lg text-center backdrop-filter backdrop-blur-lg"
        >
          <FaQuoteLeft className="text-4xl text-purple-400 mb-4 mx-auto" />
          <p className="mb-4 italic text-purple-100 text-lg">&quot;{testimonios[currentIndex].text}&quot;</p>
          <p className="font-semibold text-purple-300">- {testimonios[currentIndex].name}</p>
        </motion.div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
