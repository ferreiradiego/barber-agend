import NextAuth, { CredentialsSignin } from "next-auth";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  // This is used to use the middleware and protect the routes
  callbacks: {
    // authorized: async ({ auth }) => {
    //   return !!auth;
    // },
  },
  ...authConfig,
});
