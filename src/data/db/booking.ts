import { db } from "@/lib/prisma";

type BookingStatus = "completed" | "confirmed" | "cancelled";
type GetBookingsByUserProps = {
  userId: string;
  status: BookingStatus;
};

const getBookingsByUser = async ({
  userId,
  status,
}: GetBookingsByUserProps) => {
  const dateFilter =
    status === "confirmed" ? { gte: new Date() } : { lt: new Date() };

  return await db.booking.findMany({
    where: {
      userId: userId,
      date: dateFilter,
    },
    include: {
      service: true,
      barberShop: true,
    },
  });
};

export { getBookingsByUser };
