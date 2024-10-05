"use server";

import { User } from "next-auth";
import { auth } from "@/auth";

const getLoggedInUser = async (): Promise<User | undefined> => {
  const session = await auth();
  return session?.user;
};

export { getLoggedInUser };
