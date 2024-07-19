import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      prenom: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    prenom: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    prenom: string;
  }
}
