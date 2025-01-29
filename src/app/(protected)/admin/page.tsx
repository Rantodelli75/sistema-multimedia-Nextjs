import Logout from "@/components/logout";
import { auth } from "../../../../auth";


const AdminPage = async () => {
  const session = await auth();
  
  // Logging para debug
  console.log("Session completa:", JSON.stringify(session, null, 2));
  console.log("Usuario completo:", session?.user);
  console.log("Rol del usuario:", session?.user?.role);

  if (!session || !session.user) {
    return <div>Por favor, inicia sesión primero</div>;
  }

  // Verificamos role en lugar de rol
  if (!session.user.role) {
    return (
      <div>
        <h2>Error de Rol</h2>
        <p>No se detectó un rol en tu sesión</p>
        <p>Datos de sesión disponibles:</p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem' }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div>
        <p>No tienes permisos para acceder a esta página</p>
        <p>Tu rol actual es: {session.user.role}</p>
      </div>
    );
  }

  return (
    <>
      <h1>Panel de Administración</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Logout />
    </>
  );
};

export default AdminPage;
