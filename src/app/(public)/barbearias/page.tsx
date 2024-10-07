import BarberShopItem from "@/components/home/barbershop-item";
import Search from "@/components/home/search";
import Header from "@/components/layout/header";
import { searchBarberShops } from "@/data/db";
import { redirect } from "next/navigation";

interface BarberShopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }

  const barberShops = await searchBarberShops(searchParams.search);

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6 flex-1 container">
        <Search defaultValues={{ search: searchParams.search }} />

        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="flex flex-wrap flex-row gap-4 items-center justify-center md:justify-start">
          {barberShops.map((barberShop) => (
            <div
              key={barberShop.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4"
            >
              <BarberShopItem barbershop={barberShop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarberShopsPage;
