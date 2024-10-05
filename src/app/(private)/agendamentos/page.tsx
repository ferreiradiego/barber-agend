import { getLoggedInUser } from "@/actions/get-logged-in-user";
import BookingItem from "@/components/shared/booking-item";
import { getBookingsByUser } from "@/data/db/booking";

import { redirect } from "next/navigation";

const BookingsPage = async () => {
  const user = await getLoggedInUser();

  if (!user || !user.id) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    getBookingsByUser({
      userId: user.id,
      status: "confirmed",
    }),
    getBookingsByUser({
      userId: user.id,
      status: "completed",
    }),
  ]);

  return (
    <>
      <div className="container py-6">
        <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="uppercase text-gray-400 font-bold text-sm mt-6 mb-3">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="uppercase text-gray-400 font-bold text-sm mt-6 mb-3">
              Finalizados
            </h2>

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
