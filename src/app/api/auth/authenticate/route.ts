import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return new Response("Token no proporcionado", { status: 400 });
    }

    // Buscar el token de verificación
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token: token,
      },
    });


    if (!verificationToken) {
      return new Response("Token inválido o expirado", { status: 400 });
    }

    // Actualizar el usuario
    await prisma.user.update({
      where: {
        email: verificationToken.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    // Eliminar el token usado
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationToken.identifier,
          token: token,
        },
      },

    });

    // Redirigir al login con email validado
    const redirectUrl = new URL('/login', request.nextUrl.origin);
    redirectUrl.searchParams.set('verified', 'true');
    return Response.redirect(redirectUrl);

  } catch (error) {
    console.error('Error en la verificación:', error);
    return new Response("Error en la verificación", { status: 500 });
  }
}