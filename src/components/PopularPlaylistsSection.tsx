import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const playlists = [
  { name: "Late Night Vibes", image: "/placeholder.svg?height=300&width=300", tracks: 20 },
  { name: "Chill Electronica", image: "/placeholder.svg?height=300&width=300", tracks: 15 },
  { name: "Midnight Jazz", image: "/placeholder.svg?height=300&width=300", tracks: 18 },
  { name: "Dark Ambient", image: "/placeholder.svg?height=300&width=300", tracks: 12 },
]

export default function PopularPlaylistsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-[20vh] px-4 bg-[#fefefe] bg-opacity-10  bg-gradient-to-b from-blue-900 to-purple-900">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-300">Popular Playlists</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {playlists.map((playlist, index) => (
          <motion.div
            key={index}
            className="bg-[#fefefe] bg-opacity-10 rounded-lg overflow-hidden shadow-lg relative cursor-pointer backdrop-filter backdrop-blur-lg"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Image
              src={playlist.image || "/placeholder.svg"}
              alt={playlist.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-2 text-purple-200">{playlist.name}</h4>
              <p className="text-purple-300">{playlist.tracks} tracks</p>
            </div>
            <motion.div
              className="absolute inset-0 bg-purple-600 bg-opacity-70 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
            >
              <button className="bg-white text-purple-800 font-bold py-2 px-4 rounded-full hover:bg-purple-200 transition-colors">
                Play Now
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

