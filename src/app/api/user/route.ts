import { signupSchema } from "@/core";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saltAndHashPassword } from "@/utils/password";

export async function POST(request: Request) {
  const data = await request.json();

  const safeData = signupSchema.safeParse(data);
  if (!safeData.success) {
    return NextResponse.json({ error: safeData.error.issues }, { status: 400 });
  }

  const { name, cellphone, password } = safeData.data;
  const hashPassword = saltAndHashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        cellphone: cellphone,
        password: hashPassword,
      },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu algum erro, verifique os dados e tente novamente!" },
      { status: 500 }
    );
  }
}
