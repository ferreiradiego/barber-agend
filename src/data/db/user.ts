import { User } from "@/core";
import { db } from "@/lib";

const getUserByCellphone = async (cellphone: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: {
      cellphone,
    },
  });
};

const getUserById = async (id: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};

export { getUserByCellphone, getUserById };
