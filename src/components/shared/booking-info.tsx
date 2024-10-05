import { Card, CardContent } from "../ui/card";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { BarberShop, Service } from "@/core";


interface BookingInfoProps {
  booking: {
    barberShop: BarberShop;
    service: Service;
    date: Date | undefined;
  };
}

const BookingInfo = ({ booking }: BookingInfoProps) => {
  return (
    <Card>
      <CardContent className="p-3 space-y-3">
        <div className="flex justify-between text-sm">
          <h2 className="font-bold">{booking.service.name}</h2>
          <h3 className="font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(booking.service.price))}
          </h3>
        </div>

        {booking.date && (
          <>
            <div className="flex justify-between">
              <h3 className="text-gray-400 text-sm">Data</h3>
              <h4 className="text-sm">
                {format(booking.date, "dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </h4>
            </div>

            <div className="flex justify-between">
              <h3 className="text-gray-400 text-sm">Horário</h3>
              <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
            </div>
          </>
        )}

        <div className="flex justify-between">
          <h3 className="text-gray-400 text-sm">Barbearia</h3>
          <h4 className="text-sm">{booking.barberShop.name}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingInfo;
