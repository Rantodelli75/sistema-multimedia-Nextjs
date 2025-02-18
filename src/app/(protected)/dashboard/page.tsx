import Logout from "@/components/common/logout"
import { auth } from "../../../../auth"
import UserDashboardLayout from "@/components/features/dashboard/userDashboard"
import LoadingSpinner from "@/components/features/auth/loading-spinner"
import MusicContent from "@/components/features/dashboard/MusicContent"

export default async function DasboardPage() {
    const session = await auth()
    

  if (session === null) {
    return <LoadingSpinner shouldReturn={true} />
  }
  return (
    <>
      <UserDashboardLayout session={session}>
        <MusicContent />
      </UserDashboardLayout>
    </>
  )
}