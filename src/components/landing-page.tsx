"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import FeaturesSection from "@/components/FeaturesSection"
import PopularPlaylistsSection from "@/components/PopularPlaylistsSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import PricingSection from "@/components/PricingSection"

export default function LandingPage() {
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

