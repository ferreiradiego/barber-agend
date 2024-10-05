"use server";

import { SignupFormData, signupSchema } from "@/core";
import { db } from "@/lib";
import { saltAndHashPassword } from "@/utils/password";
import { Prisma } from "@prisma/client";

const signup = async (
  data: SignupFormData
): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  const safeData = signupSchema.safeParse(data);

  if (!safeData.success) {
    return { error: safeData.error.issues[0].message };
  }

  const { name, cellphone, password } = safeData.data;
  const hashPassword = saltAndHashPassword(password);

  try {
    await db.user.create({
      data: {
        name: name,
        cellphone: cellphone,
        password: hashPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Já existe um usuário com esse número de celular!" };
      }
    }
    return {
      error: "Ocorreu algum erro, verifique os dados e tente novamente!",
    };
  }
};

export { signup };
