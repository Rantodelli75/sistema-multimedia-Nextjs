import React from 'react'
import Link from 'next/link'
import { Sidebar, SidebarContent, SidebarItem } from './ShadCNSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const menuItems = [
    { label: 'Users', path: '/admin/users' },
    { label: 'Artists', path: '/admin/artists' },
    { label: 'Songs', path: '/admin/songs' },
    { label: 'Playlists', path: '/admin/playlists' },
    // Add more as needed
  ]

  return (
    <div className="flex">
      <Sidebar>
        <SidebarContent>
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <SidebarItem key={item.path} active={false}>
                <Link href={item.path}>{item.label}</Link>
              </SidebarItem>
            ))}
          </nav>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout