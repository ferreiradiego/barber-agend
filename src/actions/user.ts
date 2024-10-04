"use server";

import { auth } from "@/auth";
import { User } from "next-auth";

const getUser = async (): Promise<User | undefined> => {
  const session = await auth();

  return session?.user;
};


export { getUser };