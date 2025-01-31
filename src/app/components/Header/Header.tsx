import Image from "next/image";
import { HeaderProps } from "./Header.types";
import zealthyLogo from "@/app/assets/zealthy-logo.png";

export function Header({}: HeaderProps) {
  return (
    <header className="w-full h-[100px] bg-light-lime flex items-center justify-center">
      <a href="https://www.getzealthy.com/">
        <Image src={zealthyLogo} alt="Zealthy Logo" />
      </a>
    </header>
  );
}
