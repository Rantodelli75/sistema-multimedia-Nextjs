"use client"
import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import MusicContent from "./MusicContent"
import { FaBars, FaMusic } from "react-icons/fa"


export default function UserDashboardLayout(session: any) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
 

  return (
    <div className="relative flex min-h-screen bg-[#282828] bg-cover bg-center bg-no-repeat">
      {/* Mobile Toggle Buttons */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-black/20 p-2 rounded-lg"
        onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      >
        <FaBars className="text-white w-6 h-6" />
      </button>
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-black/20 p-2 rounded-lg"
        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
      >
        <FaMusic className="text-white w-6 h-6" />
      </button>

      {/* Left Sidebar */}
      <div className={`fixed md:relative z-40 ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}>
        <Sidebar session={session}/>
      </div>

      {/* Main Content */}
      <MusicContent />

      {/* Overlay for mobile when sidebar is open */}
      {(isLeftSidebarOpen || isRightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => {
            setIsLeftSidebarOpen(false)
            setIsRightSidebarOpen(false)
          }}
        />
      )}
    </div>
  )
}

