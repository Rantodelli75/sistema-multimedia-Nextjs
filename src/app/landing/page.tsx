"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaHeadphones, FaPlay, FaSpotify, FaSoundcloud, FaUser, FaHeart, FaShare } from "react-icons/fa"
import { useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import TestimonialCard from "@/components/TestimonialCard"
import PricingCard from "@/components/PricingCard"

export default function LandingPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={ref} className="bg-black min-h-screen">
      <Navbar />

      {/* Hero Section with Parallax */}
      <motion.div className="relative h-screen flex items-center justify-center overflow-hidden" style={{ opacity }}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f72585] via-[#7209b7] to-[#3a0ca3] opacity-50" />

        {/* Animated circles background */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="flex justify-center mb-6" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FaHeadphones className="text-8xl text-[#f72585]" />
          </motion.div>
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-white">Night</span>
            <span className="text-[#f72585]">Groove</span>
          </h1>
          <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of music streaming with our revolutionary platform. Join millions of users and
            discover your next favorite track.
          </p>
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button size="lg" className="bg-[#f72585] hover:bg-[#f72585]/80 text-white px-8 py-6 text-lg rounded-full">
              Start Listening
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#f72585] text-[#f72585] hover:bg-[#f72585] hover:text-white px-8 py-6 text-lg rounded-full"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/30 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-[#f72585]">NightGroove</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Discover the features that make us stand out from the crowd
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <div className="text-[#f72585] text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-black to-[#3a0ca3]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Dont just take our word for it - hear from our satisfied users
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Alex Johnson"
              role="Music Producer"
              content="NightGroove has revolutionized the way I discover new music. The AI-powered recommendations are spot on!"
            />
            <TestimonialCard
              name="Samantha Lee"
              role="Fitness Instructor"
              content="I use NightGroove for all my workout playlists. The offline mode is a game-changer for my outdoor sessions."
            />
            <TestimonialCard
              name="Michael Chen"
              role="Software Developer"
              content="The audio quality on NightGroove is unmatched. It's the perfect companion for my coding sessions."
            />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Find the perfect plan for your listening needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="$9.99"
              features={["Ad-free music streaming", "Listen offline", "High quality audio"]}
            />
            <PricingCard
              title="Pro"
              price="$14.99"
              features={["Everything in Basic", "AI-powered playlists", "Exclusive content", "Multi-device sync"]}
              highlighted={true}
            />
            <PricingCard
              title="Family"
              price="$19.99"
              features={["Everything in Pro", "Up to 6 accounts", "Parental controls", "Shared playlists"]}
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div className="relative py-20 px-4" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#f72585] via-[#7209b7] to-[#3a0ca3] opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Experience the Future of Music?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-xl mb-8"
          >
            Join millions of music lovers and start your journey today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" className="bg-white text-[#f72585] hover:bg-white/90 px-8 py-6 text-lg rounded-full">
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#f72585] px-8 py-6 text-lg rounded-full"
            >
              View Plans
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}

const features = [
  {
    icon: <FaPlay />,
    title: "High Quality Streaming",
    description: "Experience crystal clear audio with our premium quality streaming service.",
  },
  {
    icon: <FaSpotify />,
    title: "Smart Playlists",
    description: "Let our AI create the perfect playlist based on your music taste.",
  },
  {
    icon: <FaSoundcloud />,
    title: "Offline Mode",
    description: "Download your favorite tracks and listen anywhere, anytime.",
  },
  {
    icon: <FaUser />,
    title: "Personalized Recommendations",
    description: "Discover new music tailored to your unique taste and listening habits.",
  },
  {
    icon: <FaHeart />,
    title: "Collaborative Playlists",
    description: "Create and share playlists with friends for the ultimate music experience.",
  },
  {
    icon: <FaShare />,
    title: "Social Sharing",
    description: "Share your favorite tracks and playlists on social media with ease.",
  },
]
