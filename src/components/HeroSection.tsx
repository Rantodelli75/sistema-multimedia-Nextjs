import { motion } from "framer-motion"
import { FaPlay } from "react-icons/fa"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="text-center px-4">
        <motion.h2
          className="text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Nightgrovve
        </motion.h2>
        <motion.p
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover the best nocturnal beats
        </motion.p>
        <motion.button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full flex items-center mx-auto transition-all duration-300 relative overflow-hidden group"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.location.href = '/login';
          }}
        >
          <span className="relative z-10 group-hover:text-white flex items-center">
            <FaPlay className="mr-2" /> Start Listening
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none "
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-auto pointer-events-none ">
          <path
            fill="rgba(109, 40, 217, 0.4)"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </section>
  )
}

