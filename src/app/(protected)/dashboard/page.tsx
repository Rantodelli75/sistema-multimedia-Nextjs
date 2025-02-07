import Logout from "@/components/logout"
import { auth } from "../../../../auth"
import UserDashboard from "@/components/test/userDashboard"
import LoadingSpinner from "@/components/auth/loading-spinner"



export default async function DasboardPage() {
    const session = await auth()
    

  if (session === null) {
    return <LoadingSpinner shouldReturn={true} />
  }
  return (
    <>
      <UserDashboard session={session}/>
    </>
  )
}