import { BarberShop, BarberShopWithServices } from "@/core";
import { db } from "@/lib";

const getBarberShopById = async (
  id: string
): Promise<BarberShopWithServices> => {
  const barberShop = await db.barberShop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  return JSON.parse(JSON.stringify(barberShop));
};

const getBarberShops = async ({
  orderBy = "asc",
}: {
  orderBy: "asc" | "desc";
}): Promise<BarberShop[]> => {
  return await db.barberShop.findMany({
    orderBy: {
      id: orderBy,
    },
  });
};

const searchBarberShops = async (query: string): Promise<BarberShop[]> => {
  return await db.barberShop.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
};

export { getBarberShopById, getBarberShops, searchBarberShops };
