"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaMap, FaChartLine, FaCompactDisc, FaPlay, FaHeart, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"
import { signOut } from "next-auth/react"
import { useEffect } from "react"
import { FaCopyright } from "react-icons/fa6"

const menuItems = [
  { icon: FaMap, text: "Descubrir", href: "#" },
  { icon: FaChartLine, text: "Tendencias", href: "#" },
  { icon: FaCompactDisc, text: "Álbum", href: "#" },
  { icon: FaPlay, text: "Lista de Reproducción", href: "#" },
  { icon: FaHeart, text: "Favoritos", href: "#" },
]

const bottomMenuItems = [
  { icon: FaUser, text: "Perfil", href: "#" },
  { icon: FaCog, text: "Configuración", href: "#" },
]
interface User {
  name: string;
  email: string;
  image: null | string;
}

interface Session {
  user: User;
  expires: string;
}

interface SessionData {
  session: Session;
}

export default function Sidebar({ session }: { session: SessionData }) {

  return (
    <motion.nav 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-[200px] sticky top-0 left-0 lg:w-64 h-screen bg-black/20 backdrop-blur-lg p-4 lg:p-6 flex flex-col justify-between lg:space-evenly
                 shadow-lg"
    >
      <div>
        <div className="user-info flex flex-col items-center gap-2 lg:gap-3 mb-6 lg:mb-8">
          <img
            src={session.session.user.image ? session.session.user.image : "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/37e5ccfa-f9ee-458b-afa2-dcd85b495e4e"}
            alt="user"
            className="w-16 h-16 lg:w-24 lg:h-24 rounded-full"
          />
          <p className="text-white font-semibold text-sm lg:text-base">{session.session.user.name ? session.session.user.name : session.session.user.email}</p>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} 
                className="flex items-center gap-3 text-white/60 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10">
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="space-y-2">
        {bottomMenuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}
              className="flex items-center gap-3 text-white/60 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10">
              <item.icon className="w-5 h-5" />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 text-white/60 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </li>
      </ul>
      <div>
        <p className="text-white/60 text-xs flex gap-1 justify-center"> 
          <span>
            <FaCopyright className="w-5 h-5" />
          </span>
          <span className="text-white/60 mt-[2px]">2025</span>
        </p>
      </div>
    </motion.nav>
  )
}