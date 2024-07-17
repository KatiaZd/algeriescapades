// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../lib/prisma";
// import { compare } from "bcryptjs";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         if (!credentials?.email || !credentials.password) {
//           return null;
//         }

//         const user = await prisma.utilisateur.findUnique({
//           where: { email: credentials.email },
//         });

//         if (user && (await compare(credentials.password, user.mot_de_passe))) {
//           return { id: String(user.id), name: user.nom, email: user.email };
//         }

//         return null;
//       },
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     signOut: "/",
//     error: "/login",
//   },
// };

// export default NextAuth(authOptions);

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.utilisateur.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await compare(credentials.password, user.mot_de_passe))) {
          return { id: String(user.id), name: user.nom, email: user.email };
        }

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/payment", 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
