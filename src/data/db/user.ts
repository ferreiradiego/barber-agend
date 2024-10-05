import { db } from "@/lib/prisma";

const getUserByCellphone = async (cellphone: string) => {
  return await db.user.findUnique({
    where: {
      cellphone,
    },
  });
};

const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};

export { getUserByCellphone, getUserById };
