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
          // Verificar que se proporcionaron credenciales
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Buscar el usuario por email en la base de datos
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email),
          });

          // Si no se encuentra el usuario, retornar null
          if (!user) {
            console.log("Usuario no encontrado");
            return null;
          }

          // Verificar la contraseña usando bcrypt
          // Nota: Usamos passwordHash en lugar de password según tu esquema
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          // Si la contraseña no coincide, retornar null
          if (!passwordMatch) {
            console.log("Contraseña incorrecta");
            return null;
          }

          // Si todo está bien, retornar el usuario (sin la contraseña)
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            // Como no hay campo role explícito, podemos usar isVerified como indicador
            // o definir un rol predeterminado
            role: user.isVerified ? "verified_user" : "user",
            lastName: user.lastName,
            avatarUrl: user.avatarUrl || null,
            // Añade cualquier otro campo que necesites
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
      // Si el usuario acaba de iniciar sesión, añade sus datos al token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.lastName = user.lastName;
        token.avatarUrl = user.avatarUrl;
        // Añade cualquier otro dato que necesites
      }
      return token;
    },
    
    async session({ session, token }) {
      // Añade datos del token a la sesión
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        // Añadir campos personalizados
        session.user.lastName = token.lastName as string;
        session.user.avatarUrl = token.avatarUrl as string | null;
        // Añade cualquier otro dato que necesites
      }
      return session;
    },
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
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