import Logout from "@/components/logout"
import { auth } from "../../../../auth"
import UserDashboard from "@/components/test/userDashboard"


export default async function DasboardPage() {
    const session = await auth()

    if (!session) {
        return <div>Not authenticated</div>
    }

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <UserDashboard />
    </>
  )
}