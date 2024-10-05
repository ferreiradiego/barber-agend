import { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signinSchema } from "@/core";
import { getUserByCellphone } from "./data/db";

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

        const user = await getUserByCellphone(cellphone);

        if (!user) {
          throw new InvalidLoginError();
        }

        const passwordMatch = bcrypt.compareSync(
          password,
          user.password as string
        );

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
