import React from 'react'
import { AdminSidebar } from "./AdminSidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen bg-background bg-[url('/assets/images/bga.jpg')] bg-center">
      <aside className="w-64 h-full">
        <AdminSidebar />
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout