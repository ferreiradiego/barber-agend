"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingParams {
  barberShopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
  console.log("Saving booking", params);
  
  await db.booking.create({
    data: {
      date: params.date,
      serviceId: params.serviceId,
      userId: params.userId,
      barberShopId: params.barberShopId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};
