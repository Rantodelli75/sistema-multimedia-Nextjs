export interface Song {
  id: string
  title: string
  artist: string
  duration: string
  image: string
  audioUrl: string
}

export interface Playlist {
  id: string
  title: string
  image: string
  songs: Song[]
}