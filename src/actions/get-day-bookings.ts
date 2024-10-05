"use server";

import { Booking } from "@/core";
import { db } from "@/lib";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBookings = async (
  date: Date,
  barberShopId: string
): Promise<Booking[]> => {
  return await db.booking.findMany({
    where: {
      barberShopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};
