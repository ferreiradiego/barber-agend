"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Barbershop } from "@/core/constants/barbershop";
// import { BarberShop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  const router = useRouter();

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <Card className="w-full rounded-2xl max-w-[220px]">
      <CardContent className="p-0 px-1 pt-1">
        <div className="p-1 w-full h-[159px] relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge
              variant="secondary"
              className="space-x-1 rounded-full opacity-80"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs ">5,0</span>
            </Badge>
          </div>

          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill={true}
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="px-3 pb-3">
          <h2 className="font-bold m-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm tex-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="w-full mt-3"
            onClick={handleBookingClick}
          >
            Agendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
