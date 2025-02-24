"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaHeadphones } from "react-icons/fa"

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-nightgroove-white-alpha-10 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FaHeadphones className="h-8 w-8 text-nightgroove-primary" />
              <span className="ml-2 text-xl font-bold text-white">NightGroove</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="#features"
                className="text-white hover:text-nightgroove-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-white hover:text-nightgroove-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Pricing
              </Link>
              <Link href="#about" className="text-white hover:text-nightgroove-primary px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          <div>
            <Button className="bg-[#f72585] hover:bg-[#2CD88F]/80 text-white px-4 py-2 rounded-full text-sm font-medium">
              Login
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

