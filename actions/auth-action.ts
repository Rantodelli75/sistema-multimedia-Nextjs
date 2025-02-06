"use server"

import { z } from "zod"
import { loginSchema, registerSchema } from "@/lib/zod"
import { signIn } from "../auth"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { revalidatePath } from 'next/cache'

export const authenticate = async (values: z.infer<typeof loginSchema>) => {
  try {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    return { 
      success: true,
      redirectUrl: '/dashboard',
      message: 'Autenticación exitosa'
    }
  } catch (error) {
    console.error('Error en authenticate:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error de autenticación'
    }
  }
}

export const handleRegister = async (
    values: z.infer<typeof registerSchema>
) => {
    try {

        const {data, success} = registerSchema.safeParse(values)

        if(!success) {
            throw new Error("Invalid credentials")
        }

        //validacion si el user existe a traves del email
        const user = await prisma.user.findUnique({
            where: {email: data.email}
        })

        if(user) {
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        //creacion del usuario

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })

        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        return {
            success: true,
            message: 'Usuario registrado exitosamente'
        }
       
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error en el registro',
        }
    } finally {
        // Revalidar la ruta si es necesario
        revalidatePath('/login')
    }
}