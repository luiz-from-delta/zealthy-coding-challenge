import { User } from "@prisma/client";

export const tableColumnWidthMap: Record<
  keyof User | "address",
  number | "auto"
> = {
  aboutMe: 250,
  address: 250,
  birthDate: 150,
  cognitoId: 150,
  createdAt: 150,
  email: "auto",
  id: 50,
};
