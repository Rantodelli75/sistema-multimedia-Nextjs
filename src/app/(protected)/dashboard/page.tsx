import Logout from "@/components/logout"
import { auth } from "../../../../auth"


export default async function DasboardPage() {
    const session = await auth()

    if (!session) {
        return <div>Not authenticated</div>
    }

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Logout />
    </>
  )
}