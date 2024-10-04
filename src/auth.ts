import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  // This is used to use the middleware and protect the routes
  // callbacks: {
  //   authorized: async ({ auth }) => {
  //     return !!auth;
  //   },
  // },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
});
