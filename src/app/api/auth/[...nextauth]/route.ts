// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/drizzle/schema";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {          // Verificar que se proporcionaron credenciales
            return null;
          }

          const user = await db.query.users.findFirst({                 // Buscar el usuario por email en la base de datos
            where: eq(users.email, credentials.email),
          });

          // console.warn("User: ", user);

          if (!user) {
            console.log("Usuario no encontrado");
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!passwordMatch) {
            console.warn("Contraseña incorrecta");
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.isVerified ? "verified_user" : "user",
            lastName: user.lastName,
            avatarUrl: user.avatarUrl || null,
          };
        } catch (error) {
          console.error("Error de autenticación:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: `/login`,
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.lastName = user.lastName;
        token.avatarUrl = user.avatarUrl;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.lastName = token.lastName as string;
        session.user.avatarUrl = token.avatarUrl as string | null;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 días
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "test@test.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
//           {
//             method: "POST",
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         const user = await res.json();

//         if (user.error) throw user;

//         return user;
//       },
//     }),
//   ],

//   //👇 Aquí defines tus páginas personalizadas
//   pages: {
//     signIn: `/en/login`, // esta será tu nueva ruta personalizada de login
//   },
// });

// export { handler as GET, handler as POST };

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "email", type: "email", placeholder: "test@test.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
//           {
//             method: "POST",
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         const user = await res.json();

//         if (user.error) throw user;

//         return user;
//       },
//     }),
//   ],
// });

// export { handler as GET, handler as POST };