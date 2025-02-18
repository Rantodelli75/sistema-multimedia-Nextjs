import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import { motion } from "framer-motion"

export default function Footer() {
  const socialIcons = [
    { Icon: FaFacebook, link: "#" },
    { Icon: FaTwitter, link: "#" },
    { Icon: FaInstagram, link: "#" },
    { Icon: FaYoutube, link: "#" },
  ]

  return (
    <footer className="py-12 px-4 bg-purple-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-bold mb-4 text-purple-300">Nightgrovve</h4>
          <p className="text-purple-200">Tu compañero definitivo de música nocturna.</p>
        </div>
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold mb-4 text-purple-300">Enlaces Rápidos</h5>
          <ul className="space-y-2">
            {["Sobre Nosotros", "Carreras", "Prensa", "Noticias"].map((item, index) => (
              <motion.li key={index} whileHover={{ x: 5 }}>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold mb-4 text-purple-300">Legal</h5>
          <ul className="space-y-2">
            {["Términos de Servicio", "Política de Privacidad", "Política de Cookies"].map((item, index) => (
              <motion.li key={index} whileHover={{ x: 5 }}>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold mb-4 text-purple-300">Conectar</h5>
          <div className="flex justify-center md:justify-start space-x-4">
            {socialIcons.map(({ Icon, link }, index) => (
              <motion.a
                key={index}
                href={link}
                className="text-purple-200 hover:text-white transition-colors"
                whileHover={{ y: -5 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-purple-200">
        <p>&copy; {new Date().getFullYear()} Nightgrovve. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

