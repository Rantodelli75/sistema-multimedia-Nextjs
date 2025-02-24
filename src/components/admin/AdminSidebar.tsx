"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Music2,
  Mic2,
  ListMusic,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Songs",
    href: "/admin/songs",
    icon: Music2,
  },
  {
    title: "Artists",
    href: "/admin/artists",
    icon: Mic2,
  },
  {
    title: "Playlists",
    href: "/admin/playlists",
    icon: ListMusic,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-[url('/assets/images/bgb.jpg')] bg-repeat bg-[length:100px_100px] bg-opacity-5 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-coolvetica text-2xl bg-gradient-to-r from-nightgroove-primary to-nightgroove-secondary bg-clip-text text-transparent">
          NightGroove
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-nightgroove-primary hover:bg-opacity-10",
                isActive
                  ? "bg-nightgroove-primary bg-opacity-10 text-nightgroove-primary font-medium"
                  : "text-white hover:text-nightgroove-primary"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-nightgroove-primary" : "text-white"
              )} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-white",
            "hover:bg-red-50 hover:text-red-600",
            "transition-colors duration-200"
          )}
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}