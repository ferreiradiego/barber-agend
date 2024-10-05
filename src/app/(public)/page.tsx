import { getLoggedInUser } from "@/actions/get-logged-in-user";
import BarberShopItem from "@/components/home/barbershop-item";
import Search from "@/components/home/search";
import Header from "@/components/layout/header";
import BookingItem from "@/components/shared/booking-item";
import { getBarberShops } from "@/data/db/barbershop";
import { getBookingsByUser } from "@/data/db/booking";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const HomePage = async () => {
  const user = await getLoggedInUser();

  const [barberShops, recommendedBarberShops, confirmedBookings] =
    await Promise.all([
      getBarberShops({ orderBy: "asc" }),
      getBarberShops({ orderBy: "desc" }),
      user && user.id
        ? getBookingsByUser({ userId: user.id, status: "confirmed" })
        : Promise.resolve([]),
    ]);

  return (
    <>
      <Header />
      <main className="flex-1 items-center justify-center">
        {" "}
        <section className="flex flex-col gap-2 mt-5 container">
          <h2 className="text-xl font-bold">
            {user
              ? `Olá, ${user.name?.split(" ")[0]}!`
              : "Olá, bora agendar um corte?"}
          </h2>
          <p className="capitalize text-sm text-muted-foreground">
            {format(new Date(), "EEEE', ' dd 'de' MMMM", { locale: ptBR })}
          </p>
        </section>
        <section className="mt-5 container">
          <Search />
        </section>
        {confirmedBookings.length > 0 && (
          <section className="mt-6">
            <h2 className="pl-5 text-xs uppercase text-gray-400 mb-3 font-bold">
              Agendamentos
            </h2>

            <div className="px-5 flex gap-4 overflow-x-auto [&&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}
        <section className="mt-5">
          <h2 className="text-xs uppercase text-gray-400 mb-3 font-bold container">
            recomendados
          </h2>

          <div className="flex gap-4 overflow-x-auto [&&::-webkit-scrollbar]:hidden pl-5 lg:container md:flex-wrap items-center">
            {recommendedBarberShops.map((barberShop) => (
              <div key={barberShop.id} className="flex flex-1">
                <BarberShopItem barbershop={barberShop} />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-5">
          <h2 className="text-xs uppercase text-gray-400 mb-3 font-bold container">
            populares
          </h2>

          <div className="flex gap-4 overflow-x-auto [&&::-webkit-scrollbar]:hidden pl-5 lg:container md:flex-wrap items-center">
            {barberShops.map((barberShop) => (
              // <div key={barberShop.id} className="min-w-[167px] max-w-[167px]">
              <div key={barberShop.id} className="flex flex-1">
                <BarberShopItem barbershop={barberShop} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
export default HomePage;
