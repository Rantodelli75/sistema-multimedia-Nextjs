"use client"

import { motion } from "framer-motion"
import { FaMap, FaChartLine, FaCompactDisc, FaPlay, FaHeart, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"
import Sidebar from "./Sidebar"
import MusicContent from "./MusicContent"

export default function UserDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-cover bg-center bg-no-repeat" 
         style={{ 
           backgroundImage: `url(https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/aa462558-0106-4268-9864-d34a4f35531f)` 
         }}>
      <Sidebar />
      <MusicContent />
    </div>
  )
}
