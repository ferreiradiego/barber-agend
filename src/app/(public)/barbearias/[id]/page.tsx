import { notFound } from "next/navigation";
import BarberShopInfo from "@/components/shared/barbershop-info";
import ServiceItem from "@/components/shared/service-item";
import { getLoggedInUser } from "@/actions/get-logged-in-user";
import { getBarberShopById } from "@/data/db/barbershop";

interface BarberShopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarberShopDetailsPage = async ({
  params,
}: BarberShopDetailsPageProps) => {
  const user = await getLoggedInUser();

  // TODO: redirect to homepage if no id is provided
  if (!params.id) {
    return notFound();
  }

  const barberShop = await getBarberShopById(params.id);

  if (!barberShop) {
    return notFound();
  }

  return (
    <>
      <BarberShopInfo barberShop={barberShop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {barberShop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            user={user}
            barberShop={barberShop}
          />
        ))}
      </div>
    </>
  );
};

export default BarberShopDetailsPage;
