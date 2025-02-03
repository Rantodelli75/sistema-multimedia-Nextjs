import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ["/", "/login", "/register", "/api/auth/verify-email"];

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;

  console.log('URL actual:', nextUrl.pathname);
  console.log('Es ruta pública:', publicRoutes.includes(nextUrl.pathname));
  console.log('Estado de autenticación:', isLoggedIn);

  // proteger /dashboard /admin
  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
