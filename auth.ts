import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "@/lib/prisma"
import { NextAuthConfig } from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: { 
    async signIn({ user }) {
      console.log("SignIn callback - user:", user);
      return true;
    },
     jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
     session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
})
