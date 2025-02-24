import React from 'react'

export const Sidebar = ({ children }: { children: React.ReactNode }) => (
  <aside className="w-64 h-screen bg-gray-900 text-white">
    {children}
  </aside>
)

export const SidebarContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">
    {children}
  </div>
)

interface SidebarItemProps {
  active: boolean
  children: React.ReactNode
}

export const SidebarItem = ({ active, children }: SidebarItemProps) => (
  <div className={`p-2 rounded ${active ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
    {children}
  </div>
)