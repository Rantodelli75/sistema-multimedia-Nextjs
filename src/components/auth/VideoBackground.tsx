"use client"

import { useState, useEffect } from "react"

export default function VideoBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const videoSrc = isMobile
    ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/disco_mobile_background-1BHkJh0C2hKABSygbzpnNZN7wMyfrE.mp4"
    : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/disco_desktop_background-Q2YZqpS2zjGS1pJ8qJFgj4jp4NjfzO.mp4"

  return (
    <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

