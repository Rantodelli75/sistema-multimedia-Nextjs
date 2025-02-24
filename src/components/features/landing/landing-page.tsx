"use client"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import HeroSection from "@/components/features/landing/HeroSection"
import FeaturesSection from "@/components/features/landing/FeaturesSection"
import PopularPlaylistsSection from "@/components/features/landing/PopularPlaylistsSection"
import TestimonialsSection from "@/components/features/landing/TestimonialsSection"
import PricingSection from "@/components/features/landing/PricingSection"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import LoadingSpinner from "../auth/loading-spinner"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [session.status])
  if (session.status === 'authenticated' || session.status === 'loading') {
    return <LoadingSpinner />
  }
  else {    
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
        <Header />
      <HeroSection />
      <FeaturesSection />
      <PopularPlaylistsSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </main>
  )
}
}
