import { redirect } from "next/navigation"
import Link from "next/link"
import AdminLayout from "@/components/admin/AdminLayout"
import { auth } from "auth"
import Logout from "@/components/common/logout"

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/")
  }

  return (
    <AdminLayout>
      <div className="flex-1 ">
        <div className="flex justify-end mb-4">
        </div>
        {children}
      </div>
    </AdminLayout>
  )
}
