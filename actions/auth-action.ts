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
    await signIn("credentials", {
      ...values,
      redirect: false
    });

    return { success: true, status: 200 };
  } catch (error: any) {
    console.log("Error en autenticación:", error.cause);
    let message = error.cause.err.toString().replace('Error: ', '')
    return {
      status: message === 'Email de verificacion enviado' ? 418 : 401,
      message: message === 'Email de verificacion enviado' ? 'Email de verificacion enviado' : message,
      redirect: false
    };
  }
}

export async function handleRegister(values: z.infer<typeof registerSchema>) {
  try {
    // Primero verificamos si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email }
    });

    if (existingUser) {
      console.log("Usuario ya existe - Status: 400");
      return {
        success: false,
        message: "El usuario ya existe",
        status: 400
      };
    }

    // Si no existe, continuamos con el registro
    const hashedPassword = await bcrypt.hash(values.password, 10);
    
    //creacion del usuario
    await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: hashedPassword
      }
    })

    return {
      success: true,
      message: "Usuario registrado exitosamente",
      status: 200
    };

  } catch (error) {
    console.error("Error en registro:", error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error durante el registro",
      status: 500
    };
  }
}
