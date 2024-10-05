import { Decimal } from "@prisma/client/runtime/library";

type Service = {
  name: string;
  id: string;
  barberShopId: string;
  description: string;
  price: Decimal | number;
  imageUrl: string;
};

export type { Service };
