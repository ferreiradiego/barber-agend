import { BookingDetails } from "@/core";
import { db } from "@/lib";

type BookingStatus = "completed" | "confirmed" | "cancelled";

type GetBookingsByUserProps = {
  userId: string;
  status: BookingStatus;
};

const getBookingsByUser = async ({
  userId,
  status,
}: GetBookingsByUserProps): Promise<BookingDetails[]> => {
  const dateFilter =
    status === "confirmed" ? { gte: new Date() } : { lt: new Date() };

  const bookings = await db.booking.findMany({
    where: {
      userId: userId,
      date: dateFilter,
    },
    include: {
      service: true,
      barberShop: true,
    },
  });

  return JSON.parse(JSON.stringify(bookings));
};

export { getBookingsByUser };
