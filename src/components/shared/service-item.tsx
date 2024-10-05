"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BarberShop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import BookingInfo from "@/components/shared/booking-info";
import { User } from "next-auth";
import { generateDayTimeList } from "@/utils/hours";
import { getDayBookings } from "@/actions/get-day-bookings";
import { saveBooking } from "@/actions/save-booking";

interface ServiceItemProps {
  barberShop: BarberShop;
  service: Service;
  user: User | undefined;
}

const ServiceItem = ({ service, user, barberShop }: ServiceItemProps) => {
  console.log(user);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [hour, setHour] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const refreshAvailableHours = async () => {
      if (!date) return;

      const _dayBookings = await getDayBookings(date, barberShop.id);
      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date, barberShop.id]);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingClick = () => {
    console.log("entrou aqui");

    if (!user) {
      redirect("/signin");
    }
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);

    console.log({ date, hour, user });
    try {
      console.log("passou");
      if (!date || !hour || !user?.id) {
        return;
      }
      console.log("passow");

      const dateHour = Number(hour.split(":")[0]);

      console.log({ dateHour });

      const dateMinute = Number(hour.split(":")[1]);
      const newDate = setMinutes(setHours(date, dateHour), dateMinute);

      console.log(newDate);

      await saveBooking({
        barberShopId: barberShop.id,
        serviceId: service.id,
        userId: user.id,
        date: newDate,
      });

      setSheetIsOpen(false);
      setDate(undefined);
      setHour(undefined);

      toast("Agendamento realizado com sucesso!", {
        description: `Agendado para ${format(
          newDate,
          "dd 'de' MMMM 'às' HH:mm",
          {
            locale: ptBR,
          }
        )}.`,
        action: {
          label: "Visualizar",
          onClick: () => {
            router.push("/agendamentos");
          },
        },
      });
    } catch (error) {
      console.error(error);

      toast.error("Erro ao realizar agendamento!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) return [];

    return generateDayTimeList(date).filter((time) => {
      const [_hour, _minute] = time.split(":").map(Number);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinute = booking.date.getMinutes();

        return bookingHour === _hour && bookingMinute === _minute;
      });

      if (!booking) return true;

      return false;
    });
  }, [date, dayBookings]);

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill={true}
              className="object-contain rounded-lg"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-primary font-bold text-sm">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Agendar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Agendar serviço</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        head_cell: {
                          width: " 100%",
                          textTransform: "capitalize",
                        },
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        nav_button_next: { width: "32px", height: "32px" },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="py-6 px-5 border-t border-solid border-secondary flex overflow-x-auto [&&::-webkit-scrollbar]:hidden gap-3">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          variant={time === hour ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <BookingInfo
                      booking={{
                        barberShop: barberShop,
                        service: service,
                        date:
                          date && hour
                            ? setMinutes(
                                setHours(date, Number(hour.split(":")[0])),
                                Number(hour.split(":")[1])
                              )
                            : undefined,
                      }}
                    />
                  </div>
                  <SheetFooter className="px-5">
                    <Button
                      onClick={handleBookingSubmit}
                      disabled={!date || !hour || isSubmitting}
                      className={date && hour ? "" : "cursor-not-allowed"}
                    >
                      {isSubmitting ? (
                        <div className="flex flex-row gap-2">
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Agendando...
                        </div>
                      ) : (
                        "Confirmar agendamento"
                      )}
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
