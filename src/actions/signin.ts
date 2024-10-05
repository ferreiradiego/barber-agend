"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";

const signinWithCredentials = async (data: {
  cellphone: string;
  password: string;
}): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  if (!data.cellphone || !data.password) {
    return { error: "Preencha todos os campos!" };
  }

  const credentials = {
    cellphone: data.cellphone,
    password: data.password,
    redirectTo: "/",
  };

  try {
    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }
};

export { signinWithCredentials };
