import { signupSchema } from "@/core";
import { NextResponse } from "next/server";
import { saltAndHashPassword } from "@/utils/password";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  const safeData = signupSchema.safeParse(data);
  if (!safeData.success) {
    return NextResponse.json({ error: safeData.error.issues }, { status: 400 });
  }

  const { name, cellphone, password } = safeData.data;
  const hashPassword = saltAndHashPassword(password);

  try {
    const user = await db.user.create({
      data: {
        name: name,
        cellphone: cellphone,
        password: hashPassword,
      },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ocorreu algum erro, verifique os dados e tente novamente!" },
      { status: 500 }
    );
  }
}
