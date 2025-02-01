import { User, UserAddress } from "@prisma/client";

export type UserWithAddress = User & { address: UserAddress };

export type Column<K extends keyof UserWithAddress> = {
  key: K;
  name: string;
  format: (data: UserWithAddress[K]) => React.ReactNode;
};

export type Columns = Partial<{
  [K in keyof UserWithAddress]: Column<K>;
}>;

export type UserDataTableProps = {
  data: UserWithAddress[];
};
