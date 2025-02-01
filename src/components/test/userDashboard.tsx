"use client"

import { motion } from "framer-motion"
import { FaMap, FaChartLine, FaCompactDisc, FaPlay, FaHeart, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"
import Sidebar from "./Sidebar"
import MusicContent from "./MusicContent"

export default function UserDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#282828] bg-cover bg-center bg-no-repeat" 
         >
      <Sidebar />
      <MusicContent />
    </div>
  )
}
