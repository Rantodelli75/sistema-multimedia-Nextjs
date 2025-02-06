import { useState, useRef, useEffect } from 'react'
import { Song } from '../../types/music'

export const useAudioPlayer = (playlist: Song[]) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSong])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (isRepeat) {
      playFromStart()
    } else {
      handleNext()
    }
  }

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const playFromStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleNext = () => {
    if (!currentSong || playlist.length === 0) return
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id)
    const nextIndex = isShuffle 
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex + 1) % playlist.length
    setCurrentSong(playlist[nextIndex])
  }

  const handlePrevious = () => {
    if (!currentSong || playlist.length === 0) return
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id)
    const prevIndex = isShuffle
      ? Math.floor(Math.random() * playlist.length)
      : currentIndex === 0 
        ? playlist.length - 1 
        : currentIndex - 1
    setCurrentSong(playlist[prevIndex])
  }

  const handleVolumeChange = (newVolume: number) => {
    const volumeValue = Math.max(0, Math.min(1, newVolume / 100))
    setVolume(volumeValue)
    if (audioRef.current) {
      audioRef.current.volume = volumeValue
    }
  }

  return {
    audioRef,
    currentSong,
    setCurrentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    togglePlay,
    seek,
    handleNext,
    handlePrevious,
    handleVolumeChange,
  }
}
