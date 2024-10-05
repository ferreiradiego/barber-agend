import { $Enums } from "@prisma/client";

type User = {
  id: string;
  name: string;
  email?: string | null;
  emailVerified: Date | null;
  cellphone: string | null;
  cellphoneVerified: Date | null;
  password: string | null;
  image: string | null;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
};

export type { User };
