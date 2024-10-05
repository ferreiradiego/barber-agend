import BarberShopItem from "@/components/home/barbershop-item";
import Search from "@/components/home/search";
import Header from "@/components/layout/header";
import { searchBarberShops } from "@/data/db/barbershop";
import { redirect } from "next/navigation";

interface BarberShopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
  console.log(searchParams.search);

  if (!searchParams.search) {
    return redirect("/");
  }

  const barberShops = await searchBarberShops(searchParams.search);

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{ search: searchParams.search }} />

        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 gap-4 mt-3">
          {barberShops.map((barberShop) => (
            <div key={barberShop.id} className="w-full">
              <BarberShopItem barbershop={barberShop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarberShopsPage;
