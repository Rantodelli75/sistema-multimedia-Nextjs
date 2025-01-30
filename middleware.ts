import { NextResponse, NextRequest } from 'next/server'
import { auth } from "./auth"

export default async function middleware(request: NextRequest) {
  const session = await auth()

  // Proteger rutas del dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirigir usuarios autenticados fuera del login
  if (session && (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
}
