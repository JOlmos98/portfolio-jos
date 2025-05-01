// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Extiende el objeto User
   */
  interface User {
    id: string
    role: string
    lastName: string
    avatarUrl?: string | null
    // Añade aquí otras propiedades personalizadas
  }

  /**
   * Extiende el objeto Session
   */
  interface Session {
    user: {
      id: string
      role: string
      lastName: string
      avatarUrl?: string | null
      // Incluye las propiedades predeterminadas de user
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Extiende el objeto JWT
   */
  interface JWT {
    id: string
    role: string
    lastName: string
    avatarUrl?: string | null
    // Añade aquí otras propiedades personalizadas
  }
}