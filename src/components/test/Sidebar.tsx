"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaMap, FaChartLine, FaCompactDisc, FaPlay, FaHeart, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"
import { signOut } from "next-auth/react"

const menuItems = [
  { icon: FaMap, text: "Discover", href: "#" },
  { icon: FaChartLine, text: "Trending", href: "#" },
  { icon: FaCompactDisc, text: "Album", href: "#" },
  { icon: FaPlay, text: "Playlist", href: "#" },
  { icon: FaHeart, text: "Favorites", href: "#" },
]

const bottomMenuItems = [
  { icon: FaUser, text: "Profile", href: "#" },
  { icon: FaCog, text: "Settings", href: "#" },
]

export default function Sidebar() {
  return (
    <motion.nav 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="main-menu w-64 h-screen bg-black/20 backdrop-blur-lg p-6 flex flex-col justify-between"
    >
      <div>
        <div className="user-info flex flex-col items-center gap-3 mb-8">
          <img
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/37e5ccfa-f9ee-458b-afa2-dcd85b495e4e"
            alt="user"
            className="w-24 h-24 rounded-full"
          />
          <p className="text-white font-semibold">Jane Wilson</p>
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
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </motion.nav>
  )
}