import SideMenu from "@/components/layout/side-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BarberShop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BarberShopInfoProps {
  barberShop: BarberShop;
}

const BarberShopInfo = ({ barberShop }: BarberShopInfoProps) => {
  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          size="icon"
          variant="outline"
          className="z-50 left-4 top-4 absolute"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon size={24} />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="z-50 top-4 right-4 absolute"
            >
              <MenuIcon size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barberShop.imageUrl}
          alt={barberShop.name}
          fill={true}
          className="object-cover opacity-75"
        />
      </div>

      <div className="px-5 space-y-2 pt-3 pb-6 border-b border-solid border-muted">
        <h1 className="text-xl font-bold">{barberShop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barberShop.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (899 availiações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarberShopInfo;
