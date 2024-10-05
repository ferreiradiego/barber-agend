import { Service } from "./service";

type BarberShop = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  imageUrl: string;
};

type BarberShopWithServices = BarberShop & {
  services: Service[];
};

export type { BarberShop, BarberShopWithServices };
