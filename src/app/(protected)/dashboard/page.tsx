import Logout from "@/components/logout"
import { auth } from "../../../../auth"
import UserDashboard from "@/components/test/userDashboard"



export default async function DasboardPage() {
    const session = await auth()

        console.log(JSON.stringify(session))
        console.log(session?.user?.name)

    if (!session) {
      
        return <div>Not authenticated</div>
    }

  return (
    <>
      <UserDashboard session={session}/>
    </>
  )
}