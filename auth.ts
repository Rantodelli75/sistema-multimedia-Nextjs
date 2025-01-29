import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "@/lib/prisma"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      console.log("SignIn callback - user:", user);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          select: { rol: true }
        });
        
        token.role = dbUser?.rol as string | undefined;
        console.log("JWT callback - token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | undefined;
        console.log("Session callback - session:", session);
      }
      return session;
    }
  },
})