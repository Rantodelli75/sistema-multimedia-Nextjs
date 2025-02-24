"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaUser, FaMusic, FaUpload, FaPencilAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface UserProfileProps {
  session: any
  initialProfile?: {
    name: string
    email: string
    bio?: string
    isArtist: boolean
  }
}

interface Song {
  id: string
  title: string
  duration: string
  audioUrl: string
  image?: string
}

export default function UserProfile({ session, initialProfile }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isArtist, setIsArtist] = useState(initialProfile?.isArtist || false)
  const [name, setName] = useState(initialProfile?.name || "")
  const [bio, setBio] = useState(initialProfile?.bio || "")
  const [uploadedSongs, setUploadedSongs] = useState<Song[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleBecomeArtist = async () => {
    try {
      const response = await fetch('/api/users/become-artist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      })

      if (response.ok) {
        setIsArtist(true)
        toast({
          title: "¡Felicidades!",
          description: "Ahora eres un artista en Nightgrovve",
          style: { backgroundColor: 'green', color: 'white' }
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar tu solicitud",
        variant: "destructive"
      })
    }
  }

  const handleUploadSong = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('audio', file)

    try {
      const response = await fetch('/api/songs/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const song = await response.json()
        setUploadedSongs(prev => [...prev, song])
        toast({
          title: "¡Éxito!",
          description: "Canción subida correctamente",
          style: { backgroundColor: 'green', color: 'white' }
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo subir la canción",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex-1 p-4 lg:p-8 bg-[#282828]">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-black/20 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center">
              <FaUser className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 text-white mb-2"
                />
              ) : (
                <h1 className="text-2xl font-bold text-white mb-2">{name}</h1>
              )}
              <p className="text-white/60">{session.user.email}</p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="ghost"
              className="text-white"
            >
              <FaPencilAlt className="mr-2" />
              {isEditing ? "Guardar" : "Editar"}
            </Button>
          </div>

          {isEditing && (
            <div className="mt-4">
              <Label className="text-white">Biografía</Label>
              <Textarea
                value={bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                className="bg-white/10 text-white mt-2"
                placeholder="Cuéntanos sobre ti..."
              />
            </div>
          )}
        </div>

        {/* Artist Section */}
        {!isArtist ? (
          <motion.div
            className="bg-black/20 rounded-lg p-6 mb-8 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <FaMusic className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-4">
              ¿Quieres compartir tu música?
            </h2>
            <p className="text-white/60 mb-6">
              Conviértete en artista y comienza a subir tus canciones
            </p>
            <Button
              onClick={handleBecomeArtist}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Convertirme en Artista
            </Button>
          </motion.div>
        ) : (
          <div className="bg-black/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Mis Canciones</h2>
            <ScrollArea className="h-[300px] rounded-md border border-white/10 p-4">
              {uploadedSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg"
                >
                  <img
                    src={song.image || "/images/default-album-cover.jpg"}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{song.title}</h3>
                    <p className="text-white/60 text-sm">{song.duration}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            
            <Separator className="my-6" />
            
            <div className="flex items-center justify-center">
              <Label
                htmlFor="song-upload"
                className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <FaUpload />
                Subir Nueva Canción
                <Input
                  id="song-upload"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleUploadSong}
                  disabled={isUploading}
                />
              </Label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
