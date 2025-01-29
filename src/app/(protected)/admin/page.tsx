import Logout from "@/components/logout";
import { auth } from "../../../../auth";


const AdminPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return <div>No tienes permisos para acceder a esta página</div>;
  }

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Logout />
    </>
  );
};

export default AdminPage;
