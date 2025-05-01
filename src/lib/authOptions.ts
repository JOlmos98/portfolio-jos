// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "@/db/drizzle";
// import { users } from "@/db/drizzle/schema";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;
      
//         const [user] = await db
//           .select({
//             id: users.id,
//             name: users.name,
//             email: users.email,
//             passwordHash: users.passwordHash,
//             isVerified: users.isVerified,
//           })
//           .from(users)
//           .where(eq(users.email, credentials.email));
      
//         if (!user) return null;
      
//         const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
      
//         if (!isValid || !user.isVerified) return null;
      
//         return {
//           id: String(user.id),
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Redirección si no está autenticado
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//     async session({ session, token }) {
//         if (session.user && token?.id) {
//           session.user.id = token.id as string;
//         }
//         return session;
//       },
      
//   },
// };
