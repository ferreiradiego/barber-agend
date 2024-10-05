"use server";

import { signOut } from "../../auth";


const signout = async ({ redirectTo }: { redirectTo?: string }) => {
  return await signOut({ redirectTo });
};

export { signout };
