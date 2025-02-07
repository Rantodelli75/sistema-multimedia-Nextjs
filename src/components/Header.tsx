import { motion } from "framer-motion"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    open: { 
      height: "180px",  // aumentado para dar más espacio
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-purple-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.h1
              className="text-2xl font-bold text-purple-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Nightgrovve
            </motion.h1>
            <nav className="hidden md:block">
              <motion.ul
                className="flex space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {["Inicio", "Características", "Playlists", "Precios"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-purple-200 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </motion.ul>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-purple-200 hover:text-white">
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        <motion.nav
          className="md:hidden overflow-hidden"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          <ul className="flex flex-col items-center py-3">
            {["Inicio", "Características", "Listas", "Precios"].map((item, index) => (
              <li key={index} className="w-full text-center">
                <a href="#" className="block py-2 text-purple-200 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </header>
  )
}

