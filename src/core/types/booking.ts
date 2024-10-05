import { BarberShop } from "./barbershop";
import { Service } from "./service";

type Booking = {
  id: string;
  date: Date;
  userId: string;
  serviceId: string;
  barberShopId: string;
};

type BookingDetails = Booking & {
  service: Service;
  barberShop: BarberShop;
};

export type { Booking, BookingDetails };
