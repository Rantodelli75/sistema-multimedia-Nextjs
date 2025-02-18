
import UserProfile from "@/components/features/dashboard/profile/user-profile"
import UserDashboardLayout from "@/components/features/dashboard/userDashboard"
import LoadingSpinner from "@/components/features/auth/loading-spinner"
import { auth } from "../../../../auth"

export default async function ProfilePage() {
  const session = await auth()

  if (session === null) {
    return <LoadingSpinner shouldReturn={true} />
  }

  return (
    <UserDashboardLayout session={session}>
      <UserProfile 
        session={session}
        initialProfile={{
          name: session.user?.name || "",
          email: session.user?.email || "",
          bio: "",
          isArtist: false,
        }}
      />
    </UserDashboardLayout>
  )
}
