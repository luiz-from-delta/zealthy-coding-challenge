import { AboutMe, Address, BirthDate } from "./fields";

export const componentsMap = {
  "About Me": AboutMe,
  Address: Address,
  "Birth Date": BirthDate,
};

export function StepLayout({ children }: React.PropsWithChildren) {
  return <div className="w-full h-[320px] flex flex-col gap-6">{children}</div>;
}
