import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return new Response ('Token no proporcionado', { status: 400 })
  }

  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
    }
  })

  if (!verificationToken) {
    return new Response ('Token no válido', { status: 400 })
  }

  if (verificationToken.expires < new Date()) {
    return new Response ('Token expirado', { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: {
      email: verificationToken.identifier
    }
  })

  if (user?.emailVerified) {
    return new Response ('Usuario ya verificado', { status: 400 })
  }

  await prisma.user.update({
    where: {
      email: verificationToken.identifier
    },
    data: {
      emailVerified: new Date()
    }
  })

  //elimino el token 
  await prisma.verificationToken.delete({
    where: {
      identifier: verificationToken.identifier
    }
  })


  redirect('/login?verified=true')
}