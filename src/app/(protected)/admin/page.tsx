import { auth } from "auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logout from "@/components/logout"
import { DataTable } from "@/components/DataTable"
import { prisma } from "@/lib/prisma"

async function getStats() {
  const [usersCount, artistsCount, songsCount, playlistsCount] = await Promise.all([
    prisma.user.count(),
    prisma.artist.count(),
    prisma.song.count(),
    prisma.playlist.count(),
  ])

  return {
    usersCount,
    artistsCount,
    songsCount,
    playlistsCount
  }
}

export default async function AdminPage() {
  const session = await auth()
  
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/")
  }

  const stats = await getStats()

  return (
    <div className="flex-1 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <Logout />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.usersCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artistas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.artistsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Canciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.songsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.playlistsCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentUsers />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Canciones</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSongs />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Componentes auxiliares para las tablas recientes
function RecentUsers() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'createdAt', label: 'Created At' },
  ]

  return (
    <DataTable
      data={[]} // Aquí deberías cargar los datos reales
      columns={columns}
      itemsPerPage={5}
      showActions={false}
    />
  )
}

function RecentSongs() {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'artist', label: 'Artist' },
    { key: 'createdAt', label: 'Created At' },
  ]

  return (
    <DataTable
      data={[]} // Aquí deberías cargar los datos reales
      columns={columns}
      itemsPerPage={5}
      showActions={false}
    />
  )
}
