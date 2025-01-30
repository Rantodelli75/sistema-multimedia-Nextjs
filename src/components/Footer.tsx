"use client"
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 block w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NightGroove</h3>
            <p className="text-sm text-gray-400">Experience the future of music streaming.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-nightgroove-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-nightgroove-primary">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-nightgroove-primary">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-nightgroove-primary">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-nightgroove-primary">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">&copy; 2023 NightGroove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

