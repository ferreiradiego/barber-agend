import { db } from "@/lib/prisma";

const getBarberShopById = async (id: string) => {
  return await db.barberShop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });
};

const getAllBarberShops = async ({
  orderBy = "asc",
}: {
  orderBy: "asc" | "desc";
}) => {
  return await db.barberShop.findMany({
    orderBy: {
      id: orderBy,
    },
  });
};

const searchBarberShops = async (query: string) => {
  return await db.barberShop.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
};

export { getBarberShopById, getAllBarberShops, searchBarberShops };
