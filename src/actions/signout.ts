"use server";

import { signOut } from "@/auth";

const signout = async () => {
  return await signOut({ redirectTo: "/signin" });
};

export { signout };
