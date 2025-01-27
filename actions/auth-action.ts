import { z } from "zod"
import { loginSchema } from "@/lib/zod"
import { signIn } from "next-auth/react"
import { AuthError } from "next-auth"

export const handleSignIn = async (values: z.infer<typeof loginSchema>) => {
    try {
        await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return { error: "error 500" }
    }
}
