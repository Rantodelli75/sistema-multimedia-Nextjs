"use client"

import { motion } from "framer-motion"
import { FaPlay, FaHeart, FaEllipsisH, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { useState } from "react"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselIndicator,
  useCarousel 
} from '@/components/ui/carousel'

const popularPlaylists = [
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/95b52c32-f5da-4fe6-956d-a5ed118bbdd2",
    title: "Midnight Moods"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6ddf81f5-2689-4f34-bf80-a1e07f14621c",
    title: "Party Starters"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ab52d9d0-308e-43e0-a577-dce35fedd2a3",
    title: "Relaxing Tones"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/20c8fdd5-9f4a-4917-ae90-0239a52e8334",
    title: "Smooth Jazz Journey"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/df461a99-2fb3-4d55-ac16-2e0c6dd783e1",
    title: "Uplifting Rhythms"
  }
]

const recommendedSongs = [
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ea61baa7-9c4b-4f43-805e-81de5fc8aa2b",
    title: "Blank Space",
    artist: "Taylor Swift",
    duration: "4:33"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/666e065b-eb53-4320-a580-30e266370955",
    title: "Lose Control",
    artist: "Teddy Swims",
    duration: "3:30"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/619ed17f-5df2-4d32-a419-78f120a1aa5c",
    title: "Be The One",
    artist: "Dua Lipa",
    duration: "3:24"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/0ed3f51d-b769-4256-a4dd-8f35b12a1690",
    title: "Delicate",
    artist: "Taylor Swift",
    duration: "3:54"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/33779e1a-55f9-402a-b004-002395d0fbf1",
    title: "Last Christmas",
    artist: "Wham!",
    duration: "4:39"
  }
]

const featuredArtists = [
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/37e5ccfa-f9ee-458b-afa2-dcd85b495e4e",
    name: "Taylor Swift"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/37e5ccfa-f9ee-458b-afa2-dcd85b495e4e",
    name: "Taylor Swift"
  },
  {
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/37e5ccfa-f9ee-458b-afa2-dcd85b495e4e",
    name: "Taylor Swift"
  }
]

export default function MusicContent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(recommendedSongs[0])

  const handleIndexChange = (newIndex: number) => {
    if (newIndex >= popularPlaylists.length) {
      setCurrentIndex(0)
    } else if (newIndex < 0) {
      setCurrentIndex(popularPlaylists.length - 1)
    } else {
      setCurrentIndex(newIndex)
    }
  }

  const transition = {
    type: "spring",
    bounce: 0,
    duration: 0.7
  }

  return (
    <div className="flex flex-1">
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Popular Playlist</h1>
        <div className="relative">
          <Carousel
            initialIndex={0}
            index={currentIndex}
            onIndexChange={handleIndexChange}
            className="w-full max-w-5xl mx-auto relative"
          >
            <CarouselContent
              className="h-[30vh] overflow-visible"
              transition={{
                duration: 0.7,
                ease: "easeInOut"
              }}
            >
              {popularPlaylists.map((playlist, idx) => {
                const isCenter = idx === currentIndex
                const isLeft = idx === currentIndex - 1 || (currentIndex === 0 && idx === popularPlaylists.length - 1)
                const isRight = idx === currentIndex + 1 || (currentIndex === popularPlaylists.length - 1 && idx === 0)
                
                return (
                  <CarouselItem 
                    key={idx}
                    className="relative flex items-center justify-center basis-1/3"
                  >
                    <motion.div
                      className="relative w-[20vw] h-full rounded-2xl overflow-hidden"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ 
                        scale: isCenter ? 1 : 0.8,
                        opacity: isCenter ? 1 : 0.5,
                        x: isLeft ? -20 : isRight ? 20 : 0,
                        zIndex: isCenter ? 10 : 0
                      }}
                      transition={transition}
                    >
                      <img 
                        src={playlist.image}
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isCenter ? 1 : 0.3 }}
                      >
                        <h2 className="text-lg font-bold text-white mb-2">
                          {playlist.title}
                        </h2>
                        <motion.button 
                          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-white/20 w-fit text-sm"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                        >
                          Listen Now <FaPlay className="text-xs" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            <CarouselIndicator 
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
              classNameButton="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors [&[data-active]]:bg-white"
            />
          </Carousel>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[350px] bg-black/20 backdrop-blur-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-6">Recommended Songs</h2>
        <div className="flex-1 overflow-y-auto space-y-4">
          {recommendedSongs.map((song, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer ${
                currentSong.title === song.title ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentSong(song)}
            >
              <img src={song.image} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="text-white font-medium">{song.title}</h3>
                <p className="text-white/60 text-sm">{song.artist}</p>
              </div>
              <span className="text-white/60 text-sm">{song.duration}</span>
            </motion.div>
          ))}
        </div>

        {/* Player Controls */}
        <motion.div 
          className="mt-6 p-4 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img src={currentSong.image} alt={currentSong.title} className="w-16 h-16 rounded-lg" />
            <div>
              <h3 className="text-white font-medium">{currentSong.title}</h3>
              <p className="text-white/60 text-sm">{currentSong.artist}</p>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-6">
            <motion.button whileHover={{ scale: 1.1 }}>
              <FaStepBackward className="text-white/80" />
            </motion.button>
            <motion.button 
              className="bg-white/20 p-4 rounded-full"
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }}>
              <FaStepForward className="text-white/80" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
