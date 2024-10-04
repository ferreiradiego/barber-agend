import { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signinSchema } from "./core";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

class InvalidLoginError extends CredentialsSignin {
  code = "Credenciais inválidas";
}

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        cellphone: {},
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.cellphone || !credentials.password) {
          return null;
        }

        const safeData = signinSchema.safeParse(credentials);
        if (!safeData.success) {
          return null;
        }

        const { cellphone, password } = safeData.data;

        const user = await prisma.user.findUnique({
          where: {
            cellphone,
          },
        });

        if (!user) {
          throw new InvalidLoginError();
        }

        const passwordMatch = bcrypt.compareSync(
          password,
          user.password as string
        );

        console.log(passwordMatch);
        if (!passwordMatch) {
          throw new CredentialsSignin();
        }

        return {
          id: user.id,
          name: user.name,
          cellphone: user.cellphone,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
