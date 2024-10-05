"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { Loader2, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import BookingInfo from "./booking-info";
import { Prisma } from "@prisma/client";
import { cancelBooking } from "@/actions/cancel-booking";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barberShop: true;
    };
  }>;
}
const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date);
  const [isCancelingBooking, setIsCancelingBooking] = useState(false);

  const handleCancelBookingClick = async () => {
    try {
      setIsCancelingBooking(true);
      await cancelBooking(booking.id);

      toast.success("Agendamento cancelado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao cancelar o agendamento.");
    } finally {
      setIsCancelingBooking(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="flex flex-row py-0 px-0">
            <div className="flex flex-col gap-3 flex-[3] py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isBookingConfirmed ? "default" : "secondary"}
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={booking.barberShop.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <h3>{booking.barberShop.name}</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid border-secondary px-3 flex-1">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary my-6">
          <SheetTitle>Informações do agendamento</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full">
            <Image
              src="/barbershop-map.png"
              alt={booking.barberShop.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-3">
                  <Avatar>
                    <AvatarImage src={booking.barberShop.imageUrl} />
                    <AvatarFallback>Barber</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h2 className="font-bold">{booking.barberShop.name}</h2>
                    <h3 className="text-xs overflow-x-hidden text-nowrap text-ellipsis">
                      {booking.barberShop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Badge
            className="w-fit my-3"
            variant={isBookingConfirmed ? "default" : "secondary"}
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <BookingInfo booking={booking} />

          <div className="my-6 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Smartphone />
              <span className="text-sm">{booking.barberShop.phone}</span>
            </div>
            <div>
              <Button variant="outline">Copiar</Button>
            </div>
          </div>

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full"
                  variant="destructive"
                  disabled={!isBookingConfirmed}
                >
                  Cancelar agendamento
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar agendamento?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelado, você não poderá reverter essa ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row gap-3">
                  <AlertDialogCancel className="w-full m-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full m-0"
                    onClick={handleCancelBookingClick}
                    disabled={isCancelingBooking}
                  >
                    {isCancelingBooking ? (
                      <div className="flex flex-row gap-2">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Cancelando...
                      </div>
                    ) : (
                      "Confirmar"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
