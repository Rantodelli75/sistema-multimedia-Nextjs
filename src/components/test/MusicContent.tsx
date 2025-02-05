"use client"

import { motion } from "framer-motion"
import { FaPlay, FaHeart, FaEllipsisH, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

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
  const [currentSong, setCurrentSong] = useState(recommendedSongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-1 relative">
      <div className="flex-1 p-4 lg:p-8 pb-[100px] md:pb-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 lg:mb-8">Popular Playlist</h1>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {popularPlaylists.map((playlist, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                <Card className="bg-black/20 border-0">
                  <CardContent className="p-0 aspect-square relative group">
                    <img 
                      src={playlist.image}
                      alt={playlist.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h2 className="text-lg font-bold text-white mb-2">
                        {playlist.title}
                      </h2>
                      <Button variant="secondary" className="w-fit">
                        <FaPlay className="mr-2 h-4 w-4" /> Listen Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex z-50 bg-white/80 hover:bg-white/60" />
          <CarouselNext className="hidden lg:flex z-50 bg-white/80 hover:bg-white/60" />
        </Carousel>
      </div>

      {/* Music Player and Recommended Songs */}
      <div className={`fixed bottom-0 left-0 right-0 md:relative md:w-[280px] lg:w-[350px] 
                      bg-black/20 backdrop-blur-md transform transition-all duration-300 
                      ease-in-out z-20 ${isExpanded ? 'h-[80vh]' : 'h-[100px]'} md:h-auto`}>
        
        {/* Expand/Collapse Handle for Mobile */}
        <button 
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 
                     bg-black/40 rounded-t-lg md:hidden flex justify-center items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-4 h-4 text-white"
          >
            ▲
          </motion.div>
        </button>

        {/* Always Visible Player Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <img src={currentSong.image} alt={currentSong.title} className="w-12 h-12 rounded-lg" />
            <div className="flex-1">
              <h3 className="text-white font-medium truncate">{currentSong.title}</h3>
              <p className="text-white/60 text-sm">{currentSong.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <FaStepBackward className="text-white/80 h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? 
                  <FaPause className="text-white h-4 w-4" /> : 
                  <FaPlay className="text-white h-4 w-4" />
                }
              </Button>
              <Button variant="ghost" size="icon">
                <FaStepForward className="text-white/80 h-4 w-4" />
              </Button>
            </div>
          </div>
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            className="w-full mt-2"
          />
        </div>

        {/* Expandable Recommended Songs Section */}
        <div className={`overflow-hidden transition-all duration-300
                        ${isExpanded ? 'h-[calc(80vh-100px)]' : 'h-0'} md:h-auto`}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recommended Songs</h2>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {recommendedSongs.map((song, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${
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
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
