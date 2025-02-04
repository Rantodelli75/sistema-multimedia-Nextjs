import { motion } from "framer-motion"
import { useState } from "react"
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const testimonials = [
  {
    name: "Alex Johnson",
    text: "Nightgrovve has completely transformed my late-night listening experience. The curated playlists are spot on!",
  },
  {
    name: "Samantha Lee",
    text: "I love the social features. Sharing music with friends has never been easier or more fun.",
  },
  { name: "Michael Chen", text: "The sound quality is unmatched. It's like being in a private concert every night." },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-900 to-blue-900">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">What Our Users Say</h3>
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-purple-800 bg-opacity-50 p-8 rounded-lg text-center backdrop-filter backdrop-blur-lg"
        >
          <FaQuoteLeft className="text-4xl text-purple-400 mb-4 mx-auto" />
          <p className="mb-4 italic text-purple-100 text-lg">"{testimonials[currentIndex].text}"</p>
          <p className="font-semibold text-purple-300">- {testimonials[currentIndex].name}</p>
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

