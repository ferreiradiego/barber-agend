"use server";

import { db } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBookings = async (date: Date, barberShopId: string) => {
  const bookings = db.booking.findMany({
    where: {
      barberShopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return bookings;
};
